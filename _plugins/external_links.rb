require 'nokogiri'

Jekyll::Hooks.register [:pages, :posts], :post_render do |doc|
  # Skip XML files like sitemap.xml and atom feeds
  unless doc.url.end_with?('.xml') || doc.path.end_with?('.xml')
    doc.output = process_external_links(doc.output)
  end
end

def process_external_links(content)
  # Parse the HTML content
  doc = Nokogiri::HTML(content)
  
  # Find all <a> tags
  doc.css('a').each do |link|
    href = link['href']
    next if href.nil? || href.empty? || href.start_with?('#', '/')
    
    # Add target="_blank" and rel="noopener" to external links
    link['target'] = '_blank'
    link['rel'] = 'noopener'
  end
  
  doc.to_html
end 