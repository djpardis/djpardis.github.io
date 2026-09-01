# frozen_string_literal: true

require "nokogiri"

module Jekyll
  module PrintContentFilters
    # Remove hero blocks from post HTML for print layout only. The table of
    # contents remains visible near the beginning of print articles.
    def strip_print_boilerplate(html)
      return "" if html.nil? || html.to_s.empty?

      fragment = Nokogiri::HTML::DocumentFragment.parse(html.to_s)
      fragment.css(".post-hero-image").remove
      fragment.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::PrintContentFilters)
