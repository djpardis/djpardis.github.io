---
layout: null
title: TOC Management System
---

# TOC Management System

## Quick Reference for Updating TOC Entries

### 1. Title Change Process
When you change a heading title, update BOTH:

1. **TOC Link**: `<a href="#old-id">New Title</a>`
2. **Heading ID**: `{#new-id-to-match-title}`

### 2. Anchor ID Convention
Convert titles to IDs using this pattern:
- **Lowercase everything**
- **Replace spaces with hyphens**
- **Remove punctuation (periods, commas, etc.)**
- **Replace apostrophes with nothing**

**Examples:**
- "The 2001 A's lost significant talent." → `#the-2001-as-lost-significant-talent`
- "Analytics leads to more transparent decision-making." → `#analytics-leads-to-more-transparent-decision-making`
- "It's hard not to be romantic about baseball." → `#its-hard-not-to-be-romantic-about-baseball`

### 3. Standard Heading Format
```markdown
### [Title text here.](#table-of-contents) {#anchor-id-here}
```

### 4. Standard TOC Entry Format
```html
<li><a href="#anchor-id-here">Title text here.</a></li>
```

## Adding New TOC Section

### For Main Sections:
```html
<li><a href="#new-section-id">New section title</a></li>
```

### For Subsections:
```html
<li><a href="#main-section">Main Section</a>
  <ul>
    <li><a href="#subsection-id">Subsection title.</a></li>
    <li><a href="#another-subsection-id">Another subsection.</a></li>
  </ul>
</li>
```

## Validation Checklist

When adding/updating TOC entries:

- [ ] TOC link matches heading ID exactly
- [ ] Heading has proper format: `### [Title](#table-of-contents) {#id}`
- [ ] ID follows naming convention (lowercase, hyphens, no punctuation)
- [ ] Period at end of subsection titles
- [ ] Back-link to table of contents works
- [ ] Anchor navigation works when clicked

## Quick Commands

### Generate ID from title:
```bash
# Convert "Your Title Here." to anchor ID
echo "Your Title Here." | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | tr ' ' '-'
```

### Find TOC inconsistencies:
```bash
# Find headings with IDs
grep -n "###.*{#" _posts/*.md

# Find TOC links
grep -n "href=\"#" _posts/*.md
```