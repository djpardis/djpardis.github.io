#!/usr/bin/env python3
"""Sync GitHub profile pins into Jekyll data in profile order."""

from __future__ import annotations

import argparse
import json
import subprocess
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = REPO_ROOT / "_data" / "github_pinned_repos.json"
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


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--login", default="djpardis")
    args = parser.parse_args()

    pins = fetch_pins(args.login)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(pins, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(pins)} pinned repositories to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
