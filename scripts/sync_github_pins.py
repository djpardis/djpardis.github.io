#!/usr/bin/env python3
"""Sync GitHub profile pins into Jekyll data in profile order."""

from __future__ import annotations

import argparse
import json
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = REPO_ROOT / "_data" / "github_pinned_repos.json"
IMAGE_DIR = REPO_ROOT / "files" / "pics" / "pages" / "github"
QUERY = """
query($login: String!) {
  user(login: $login) {
    pinnedItems(first: 12, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          url
          openGraphImageUrl
          primaryLanguage {
            name
          }
        }
      }
    }
  }
}
"""


def fetch_pins(login: str) -> list[dict[str, str]]:
    result = subprocess.run(
        [
            "gh",
            "api",
            "graphql",
            "-F",
            f"login={login}",
            "-f",
            f"query={QUERY}",
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    payload = json.loads(result.stdout)
    nodes = payload["data"]["user"]["pinnedItems"]["nodes"]
    return [
        {
            "name": node["name"],
            "url": node["url"],
            "image": node["openGraphImageUrl"],
            "language": (node.get("primaryLanguage") or {}).get("name", ""),
        }
        for node in nodes
    ]


def fetch_bytes(url: str) -> bytes | None:
    request = urllib.request.Request(url, headers={"User-Agent": "curl/8"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                return response.read()
        except urllib.error.HTTPError as error:
            if error.code != 429:
                raise
            time.sleep(2 ** (attempt + 1))
    return None


def download_image(pin: dict[str, str], previous_url: str | None) -> None:
    """Store the Open Graph card locally because GitHub renders it on demand.

    GitHub rate-limits rendering of uncached cards with HTTP 429, so a failed
    download falls back to the previously synced card URL, then to the
    existing local file.
    """
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    path = IMAGE_DIR / f"{pin['name']}.png"
    for url in dict.fromkeys(u for u in (pin["image"], previous_url) if u):
        data = fetch_bytes(url)
        if data is not None:
            path.write_bytes(data)
            pin["source_image"] = url
            break
    else:
        if not path.exists():
            raise RuntimeError(f"Could not download a card for {pin['name']}")
        print(f"Kept existing card for {pin['name']} (GitHub returned 429)")
        pin["source_image"] = previous_url or pin["image"]
    pin["image"] = "/" + path.relative_to(REPO_ROOT).as_posix()


def load_previous_urls() -> dict[str, str]:
    if not OUTPUT_PATH.exists():
        return {}
    previous = json.loads(OUTPUT_PATH.read_text(encoding="utf-8"))
    return {
        pin["name"]: pin.get("source_image") or pin["image"]
        for pin in previous
        if (pin.get("source_image") or pin["image"]).startswith("http")
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--login", default="djpardis")
    args = parser.parse_args()

    previous_urls = load_previous_urls()
    pins = fetch_pins(args.login)
    for pin in pins:
        download_image(pin, previous_urls.get(pin["name"]))
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(pins, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(pins)} pinned repositories to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
