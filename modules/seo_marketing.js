/**
 * Automated SEO & OpenGraph Marketing Metadata Generator Module
 */

export const SEO_TOOLS = [
  {
    name: "generate_seo_metadata_blueprint",
    description: "Generates production HTML <head> tags, OpenGraph social preview tags, Twitter Cards, JSON-LD structured data schema, and sitemap metadata for web applications.",
    inputSchema: {
      type: "object",
      properties: {
        page_title: {
          type: "string",
          description: "Title of the page or web application",
        },
        page_description: {
          type: "string",
          description: "Meta description text (150-160 characters)",
        },
        canonical_url: {
          type: "string",
          description: "Canonical URL of the page",
        },
        og_image_url: {
          type: "string",
          description: "OpenGraph social preview image URL",
        },
      },
      required: ["page_title", "page_description", "canonical_url"],
    },
  },
];

export const handleSeoTool = (name, args) => {
  if (name === "generate_seo_metadata_blueprint") {
    const title = args.page_title;
    const desc = args.page_description;
    const url = args.canonical_url;
    const ogImg = args.og_image_url || `${url}/og-image.png`;

    let html = `# 🌐 SEO & OpenGraph Production Blueprint\n\n`;
    html += `\`\`\`html
<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${desc}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${ogImg}" />

<!-- Twitter Cards -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${desc}" />
<meta property="twitter:image" content="${ogImg}" />

<!-- JSON-LD Structured Data Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${title}",
  "url": "${url}",
  "description": "${desc}"
}
</script>
\`\`\`\n`;

    return { content: [{ type: "text", text: html }] };
  }

  throw new Error(`Unknown tool in SEO module: ${name}`);
};
