# frozen_string_literal: true

module Jekyll
  # Two pages per post. {post.url}print and {post.url}print-no-images (figures/embeds hidden).
  # Opt out with front matter print_page: false
  class PrintArticleGenerator < Generator
    safe true
    priority :low

    def generate(site)
      site.posts.docs.each do |post|
        next if post.data["print_page"] == false

        safe_name = post.path.gsub(%r{[/\\]}, "_")
        base_data = {
          "layout" => "print-article",
          "print_source_path" => post.relative_path,
          "sitemap" => false
        }

        page_full = PageWithoutAFile.new(site, site.source, "", "print-article-#{safe_name}.html")
        page_full.data.merge!(base_data.merge("permalink" => "#{post.url}print"))
        page_full.content = ""
        site.pages << page_full

        page_text = PageWithoutAFile.new(site, site.source, "", "print-article-noimg-#{safe_name}.html")
        page_text.data.merge!(base_data.merge(
          "permalink" => "#{post.url}print-no-images",
          "print_hide_images" => true
        ))
        page_text.content = ""
        site.pages << page_text
      end
    end
  end
end
