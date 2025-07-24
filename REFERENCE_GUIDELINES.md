# Reference Guidelines

This document defines the standard reference system for djpardis.github.io to ensure consistent citation formatting and bidirectional navigation across all blog posts.

## Standard Reference Format

### In-Text Citations
Use double brackets around reference numbers in the text:
```html
This is a statement that needs citation [[1]](#ref1)[[2]](#ref2).
```

### Reference List Format
In the References section at the end of posts:
```html
## References

<a id="ref1" href="#ref1-back">[1]</a> Author Name. "Article Title." *Publication Name*, Year.

<a id="ref2" href="#ref2-back">[2]</a> Another Author. "Another Article." *Journal*, Year.
```

### Complete Example

#### In the post body:
```html
Analytics revolutionized baseball decision-making [[1]](#ref1)[[2]](#ref2), though some argue it reduced the sport's romantic appeal [[3]](#ref3).
```

#### In the References section:
```html
## References

<a id="ref1" href="#ref1-back">[1]</a> Lewis, Michael. *Moneyball: The Art of Winning an Unfair Game.* W. W. Norton & Company, 2003.

<a id="ref2" href="#ref2-back">[2]</a> James, Bill. *The Bill James Baseball Abstract.* Ballantine Books, 1984.

<a id="ref3" href="#ref3-back">[3]</a> Smith, John. "The Soul of Baseball in the Analytics Era." *Sports Illustrated*, 2015.
```

## JavaScript Automation

The site uses `ref-backlinks.js` to automatically handle bidirectional navigation:

### Features
- **Precise navigation**: Clicking `[[1]]` jumps exactly to reference 1
- **Return navigation**: Clicking `[1]` in references jumps back to the exact citation
- **Multiple citations**: Handles multiple citations to same reference
- **Visual feedback**: Yellow highlighting when jumping to targets
- **Legacy format support**: Automatically converts older formats
- **Development validation**: Checks for orphaned citations/references on localhost

### Supported Formats
The system handles these citation formats:
1. **Standard (recommended)**: `[[1]](#ref1)` → `<a id="ref1" href="#ref1-back">[1]</a>`
2. **Simple format**: `[1](#ref1)` (automatically enhanced)
3. **Legacy format**: `[[1]](#references)` (automatically converted)

## CSS Styling

References use the same styling as all other links on the site:

```css
/* References inherit standard link styling */
a {
  color: #7d78b5;
  text-decoration: none;
}

a:hover,
a:focus {
  background-color: #FFFF99;
  text-decoration: none;
}

/* Target highlighting for smooth navigation */
:target {
  background-color: yellow;
  padding: 2px 4px;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

/* Enhanced highlighting for reference numbers */
:target sup {
  background-color: transparent;
}
```

## Implementation Checklist

When adding references to a post:

- [ ] Use `[[N]]` format for in-text citations
- [ ] Use `[N]` format in reference list
- [ ] Ensure sequential numbering (1, 2, 3...)
- [ ] Create proper anchor IDs: `ref1`, `ref2`, etc.
- [ ] Include back-link references: `#ref1-back`, `#ref2-back`
- [ ] Test bidirectional navigation works
- [ ] Verify no orphaned citations or references
- [ ] Check all citations have corresponding references

## JavaScript System Details

### Core Functions
- `initializeReferenceSystem()`: Main entry point
- `setupReferenceNavigation()`: Handles bidirectional linking
- `validateReferenceIntegrity()`: Development-only validation
- `addTargetHighlighting()`: Visual feedback system

### Automatic Conversions
The system automatically:
1. Converts `[[N]](#references)` to proper format
2. Handles legacy inline back-links
3. Creates missing back-navigation links
4. Validates reference integrity in development

## Common Mistakes to Avoid

1. **Inconsistent numbering**: Skipping numbers or using non-sequential order
2. **Missing back-links**: Forgetting `href="#refN-back"` in reference list
3. **Wrong anchor format**: Using `#references` instead of `#refN`
4. **Orphaned citations**: Citations without corresponding references
5. **Orphaned references**: References without corresponding citations
6. **Mixed formats**: Inconsistent citation styles within same post

## Development Validation

On localhost, the system automatically validates:
- ✅ All citations have corresponding references
- ✅ All references have corresponding citations  
- ✅ Sequential numbering without gaps
- ✅ Proper anchor link formatting

Validation results appear in browser console for debugging.

## Files Involved

- **`public/js/ref-backlinks.js`**: Core reference navigation system
- **`public/css/custom-styles.css`**: Target highlighting styles
- **Individual post files**: Contain actual references using standard format
- **`REFERENCE_GUIDELINES.md`**: This documentation (centralized reference)

## Visual Behavior

- **Citations**: Purple links with yellow hover highlight (site standard)
- **Reference navigation**: Smooth scrolling to targets
- **Target highlighting**: Yellow background briefly highlights destination
- **Accessibility**: Proper focus states and semantic markup
- **Consistent styling**: All reference links match site-wide link appearance

This centralized system ensures all references are consistently formatted, properly linked, and visually integrated with the site's design language. 