# frozen_string_literal: true

require "nokogiri"

module Jekyll
  module PrintContentFilters
    # Remove TOC and hero blocks from post HTML for print layout only. Matches
    # docs/print-friendly-blog-posts.md ("strips" rather than only hiding with CSS).
    def strip_print_boilerplate(html)
      return "" if html.nil? || html.to_s.empty?

      fragment = Nokogiri::HTML::DocumentFragment.parse(html.to_s)
      fragment.css(".toc-container, .post-hero-image").remove
      fragment.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::PrintContentFilters)
