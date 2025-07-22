module Jekyll
  class FrontMatterGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      site.posts.docs.each do |post|
        # Auto-generate common front matter fields if not already present
        post.data['active_section'] ||= 'blog'
        
        # Auto-extract first image from content if no image is specified
        if post.data['image'].nil? || post.data['image'].empty?
          first_image = extract_first_image(post.content)
          post.data['image'] = first_image if first_image
        end
        
        # Auto-generate sitemap data if not present
        if post.data['sitemap'].nil?
          post.data['sitemap'] = {
            'priority' => 0.7,
            'changefreq' => 'yearly',
            'lastmod' => post.date.strftime('%Y-%m-%d')
          }
        end
        
        # Auto-generate Open Graph data if not present
        if post.data['og'].nil?
          post.data['og'] = {
            'title' => "#{post.data['title']} - Pardis Noorzad",
            'description' => post.data['description'],
            'image' => post.data['image'],
            'type' => 'article'
          }
        end
        
        # Auto-generate Twitter Card data if not present
        if post.data['twitter'].nil?
          post.data['twitter'] = {
            'card' => 'summary_large_image',
            'title' => "#{post.data['title']} - Pardis Noorzad",
            'description' => post.data['description'],
            'image' => post.data['image']
          }
        end
      end
    end

    private

    def extract_first_image(content)
      # Match Markdown image syntax: ![alt text](image_url)
      markdown_image_match = content.match(/!\[.*?\]\(([^)]+)\)/)
      return markdown_image_match[1] if markdown_image_match
      
      # Match HTML img tag: <img src="image_url" ...>
      html_image_match = content.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/)
      return html_image_match[1] if html_image_match
      
      # Match Liquid image tag: {% include image.html file="image_url" ... %}
      liquid_image_match = content.match(/{%\s*include\s+image\.html[^%]*file=["']([^"']+)["'][^%]*%}/)
      return liquid_image_match[1] if liquid_image_match
      
      nil
    end
  end
end 