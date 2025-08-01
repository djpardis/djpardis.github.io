#!/usr/bin/env node

/**
 * TOC Helper Script
 * Generates anchor IDs from titles and validates TOC consistency
 */

function generateAnchorId(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove punctuation except hyphens
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single
    .replace(/^-|-$/g, '');   // Remove leading/trailing hyphens
}

function generateTocEntry(title, isSubsection = false) {
  const anchorId = generateAnchorId(title);
  const indent = isSubsection ? '  ' : '';
  
  return {
    anchorId,
    tocEntry: `${indent}<li><a href="#${anchorId}">${title}</a></li>`,
    heading: `${isSubsection ? '###' : '##'} [${title}](#table-of-contents) {#${anchorId}}`
  };
}

// CLI usage
if (require.main === module) {
  const title = process.argv[2];
  const isSubsection = process.argv[3] === '--subsection';
  
  if (!title) {
    console.log(`
Usage: node toc-helper.js "Your Title Here" [--subsection]

Examples:
  node toc-helper.js "The 2001 A's lost significant talent."
  node toc-helper.js "Analytics leads to decision-making." --subsection

Output:
  - Anchor ID
  - TOC entry HTML
  - Heading markdown
`);
    process.exit(1);
  }
  
  const result = generateTocEntry(title, isSubsection);
  
  console.log('\n📋 Generated TOC elements:');
  console.log('\n🔗 Anchor ID:');
  console.log(result.anchorId);
  console.log('\n📝 TOC Entry:');
  console.log(result.tocEntry);
  console.log('\n📄 Heading:');
  console.log(result.heading);
  console.log('');
}

module.exports = { generateAnchorId, generateTocEntry };