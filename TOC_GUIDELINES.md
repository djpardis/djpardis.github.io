# Table of Contents Guidelines

This document defines the standard format and styling for Table of Contents (TOC) across all blog posts on the site.

## Standard TOC Format

### HTML Structure
Use this exact HTML structure for all TOCs:

```html
<div class="toc-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#section-1">Main Section Title</a>
  <ul>
    <li><a href="#subsection-1">Subsection title ending with period.</a></li>
    <li><a href="#subsection-2">Another subsection ending with period.</a></li>
  </ul>
</li>
<li><a href="#section-2">Another Main Section</a></li>
<li><a href="#conclusion">Conclusion</a></li>
</ul>
</div>
```

### Content Rules
1. **Main TOC heading**: "Table of contents" (sentence case, no period)
2. **Main sections**: Sentence case, no period (e.g., "Understanding Moneyball")
3. **Subsections**: Complete sentences ending with a period (e.g., "Analytics leads to more transparent decision-making.")
4. **Position**: Place directly after any cross-posting note, before main content

### CSS Styling
The TOC uses the `.toc-container` class which provides:
- **Light purple background**: `rgba(125, 120, 181, 0.08)`
- **Rounded corners**: 6px border radius
- **Proper spacing**: 1.5rem padding and margins
- **Site-consistent links**: Purple color `#7d78b5` with yellow hover highlight
- **Bullet points**: Disc bullets for main sections, circle bullets for subsections
- **Purple accents**: Bullet points and heading in theme color

## CSS Implementation

```css
.container.content .toc-container {
  background-color: rgba(125, 120, 181, 0.08);
  border-radius: 6px;
  padding: 1.5rem;
  margin: 1.5rem 0 2rem;
}

.container.content .toc-container h2#table-of-contents {
  margin: 0 0 1rem 0;
  padding: 0;
  color: #7d78b5;
  font-size: 1.25rem;
}

.container.content .toc-container ul {
  list-style-type: disc;
  margin: 0;
  padding-left: 1.5rem;
}

.container.content .toc-container li {
  margin: 0.4rem 0;
  position: relative;
}

.container.content .toc-container li::marker {
  color: #7d78b5;
}

.container.content .toc-container a {
  text-decoration: none;
  color: #7d78b5;
  font-size: 0.95rem;
  line-height: 1.4;
}

.container.content .toc-container a:hover,
.container.content .toc-container a:focus {
  background-color: #FFFF99;
  text-decoration: none;
}

.container.content .toc-container ul ul {
  list-style-type: circle;
  margin: 0.25rem 0 0.5rem;
  padding-left: 1.5rem;
}

.container.content .toc-container ul ul li {
  margin: 0.25rem 0;
  font-size: 0.9rem;
}

.container.content .toc-container ul ul li::marker {
  color: #7d78b5;
}
```

## Example Implementation

```html
<div class="toc-container">
<h2 id="table-of-contents">Table of contents</h2>
<ul>
<li><a href="#understanding-topic">Understanding the topic</a>
  <ul>
    <li><a href="#key-concept-1">First key concept explained clearly.</a></li>
    <li><a href="#key-concept-2">Second important concept detailed.</a></li>
  </ul>
</li>
<li><a href="#analysis">Analysis and critique</a>
  <ul>
    <li><a href="#strength-1">Major strength of the approach.</a></li>
    <li><a href="#weakness-1">Significant limitation identified.</a></li>
  </ul>
</li>
<li><a href="#conclusion">Conclusion</a></li>
</ul>
</div>
```

## Implementation Checklist

- [ ] Use `<div class="toc-container">` wrapper
- [ ] Include `<h2 id="table-of-contents">Table of contents</h2>` heading
- [ ] Convert all content to pure HTML (no markdown inside container)
- [ ] Main sections: sentence case, no period
- [ ] Subsections: complete sentences with periods
- [ ] All anchor links use lowercase with hyphens
- [ ] Place after cross-posting note, before main content
- [ ] Test all links work correctly
- [ ] Verify styling appears correctly

## Common Mistakes to Avoid

1. **Don't mix markdown and HTML** inside the container
2. **Don't forget periods** on subsection sentences
3. **Don't use title case** for main sections
4. **Don't place TOC** in the middle or end of posts
5. **Don't forget the container wrapper** - styling won't work without it
6. **Don't use inconsistent anchor formats** - stick to lowercase-with-hyphens

## Visual Features

- **Unified design**: Title and content in same light purple container
- **Clear hierarchy**: Bullet points show section relationships
- **Site consistency**: Links match site-wide styling with purple color and yellow hover
- **Professional appearance**: Subtle background and rounded corners
- **Good accessibility**: Proper focus states and semantic HTML structure 