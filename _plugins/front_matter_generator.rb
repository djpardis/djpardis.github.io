module Jekyll
  class FrontMatterGenerator < Generator
    safe true
    priority :normal

    def generate(site)
      site.posts.docs.each do |post|
        # Auto-generate common front matter fields if not already present
        post.data['active_section'] ||= 'blog'
        
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
  end
end 