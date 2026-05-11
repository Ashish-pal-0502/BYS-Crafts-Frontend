export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: [
      "https://byscrafts.com/sitemap.xml",
      "https://byscrafts.com/static/sitemap.xml",
      "https://byscrafts.com/product/sitemap-1.xml",
      "https://byscrafts.com/blog/sitemap-1.xml",
      "https://byscrafts.com/category/sitemap-1.xml",
    ],
  };
}
