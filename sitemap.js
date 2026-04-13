import fs from "fs";
import { create } from "apisauce";
import { promisify } from "util";
import fetch from "node-fetch";

const writeFileAsync = promisify(fs.writeFile);

const apiClient = create({
  baseURL: "https://backend.bundelicrafts.com/api",
});

const BASE_URL = "https://bundelicrafts.com";

// ---- SETTINGS ----
const PRODUCTS_PER_SITEMAP = 5000;
const BLOGS_PER_SITEMAP = 5000;

// ---- SLUGIFY ----
function slugify(text) {
  return text
    ?.toLowerCase()
    ?.replace(/\s+/g, "-")
    ?.replace(/[^\w-]+/g, "");
}

// ---- CREATE DIRECTORY ----
function ensureDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

// ---- PAGINATION FUNCTION ----
function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// ---- PRODUCT PAGINATED SITEMAPS ----
async function generateProductSitemaps() {
  console.log("📦 Generating product sitemaps...");

  const response = await apiClient.get("/product/get-all-products");
  if (!response.ok || !response.data?.products) {
    console.warn("⚠️ Cannot fetch products");
    return [];
  }

  const products = response.data.products;

  // Split into chunks
  const chunks = chunkArray(products, PRODUCTS_PER_SITEMAP);

  ensureDir("public/product");

  const sitemapFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const items = chunks[i];

    const xmlItems = items
      .map((p) => {
        const slug = slugify(p.name);
        return `
  <url>
    <loc>${BASE_URL}/product/${slug}/${p._id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    const fileName = `public/product/sitemap-${i + 1}.xml`;
    await writeFileAsync(fileName, xml);

    sitemapFiles.push(`${BASE_URL}/product/sitemap-${i + 1}.xml`);
    console.log(`✅ Created product sitemap ${i + 1}`);
  }

  return sitemapFiles;
}

// ---- BLOG PAGINATED SITEMAPS ----
async function generateBlogSitemaps() {
  console.log("📝 Generating blog sitemaps...");

  const response = await apiClient.get("/blog/get-all-blogs");
  if (!response.ok || !response.data?.blogs) {
    console.warn("⚠️ Cannot fetch blogs");
    return [];
  }

  const blogs = response.data.blogs;
  const chunks = chunkArray(blogs, BLOGS_PER_SITEMAP);

  ensureDir("public/blog");

  const sitemapFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const items = chunks[i];

    const xmlItems = items
      .map((b) => {
        return `
  <url>
    <loc>${BASE_URL}/blog/${b._id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    const fileName = `public/blog/sitemap-${i + 1}.xml`;
    await writeFileAsync(fileName, xml);

    sitemapFiles.push(`${BASE_URL}/blog/sitemap-${i + 1}.xml`);
    console.log(`✅ Created blog sitemap ${i + 1}`);
  }

  return sitemapFiles;
}

// ---- STATIC SITEMAP ----
async function generateStaticSitemap() {
  ensureDir("public/static");

  const staticPaths = ["/", "/product", "/blog"];

  const xmlItems = staticPaths
    .map((url) => {
      return `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

  await writeFileAsync("public/static/sitemap.xml", xml);

  return [`${BASE_URL}/static/sitemap.xml`];
}

// ---- MAIN INDEX ----
async function generateIndexSitemap(allSitemaps) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSitemaps
  .map(
    (loc) => `
  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
  )
  .join("")}
</sitemapindex>`;

  await writeFileAsync("public/sitemap.xml", xml);
  console.log("🏁 Main index sitemap created");
}

// ---- PING ----
async function pingSearchEngines() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;

  await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`);
  await fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`);

  console.log("🔔 Search engines pinged");
}

// ---- RUN ALL ----
(async () => {
  const staticSitemap = await generateStaticSitemap();
  const productSitemaps = await generateProductSitemaps();
  const blogSitemaps = await generateBlogSitemaps();

  const allSitemaps = [...staticSitemap, ...productSitemaps, ...blogSitemaps];

  await generateIndexSitemap(allSitemaps);
  await pingSearchEngines();
})();
