module Jekyll
  class FrontMatterGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      # Process blog posts
      site.posts.docs.each do |post|
        process_post(post)
      end
      
      # Process pages
      site.pages.each do |page|
        process_page(page)
      end
    end

    private

    def process_post(post)
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
          'title' => "#{post.data['title']} — Pardis Noorzad",
          'description' => post.data['description'],
          'image' => post.data['image'],
          'type' => 'article'
        }
      end
      
      # Auto-generate Twitter Card data if not present
      if post.data['twitter'].nil?
        post.data['twitter'] = {
          'card' => 'summary_large_image',
          'title' => "#{post.data['title']} — Pardis Noorzad",
          'description' => post.data['description'],
          'image' => post.data['image']
        }
      end
    end

    def process_page(page)
      # Skip if it's a Jekyll system file
      return if page.name.start_with?('_') || page.name == 'Gemfile' || page.name == 'Gemfile.lock'
      
      # Auto-extract first image from content if no image is specified
      if page.data['image'].nil? || page.data['image'].empty?
        first_image = extract_first_image(page.content)
        page.data['image'] = first_image if first_image
      end
      
      # Auto-generate sitemap data if not present
      if page.data['sitemap'].nil?
        page.data['sitemap'] = {
          'priority' => 0.5,
          'changefreq' => 'monthly',
          'lastmod' => Time.now.strftime('%Y-%m-%d')
        }
      end
      
      # Auto-generate Open Graph data if not present
      if page.data['og'].nil?
        page.data['og'] = {
          'title' => "#{page.data['title']} — Pardis Noorzad",
          'description' => page.data['description'],
          'image' => page.data['image'],
          'type' => 'website'
        }
      end
      
      # Auto-generate Twitter Card data if not present
      if page.data['twitter'].nil?
        page.data['twitter'] = {
          'card' => 'summary_large_image',
          'title' => "#{page.data['title']} — Pardis Noorzad",
          'description' => page.data['description'],
          'image' => page.data['image']
        }
      end
    end

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