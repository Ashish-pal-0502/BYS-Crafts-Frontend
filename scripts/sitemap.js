import fs from "fs";
import { create } from "apisauce";
import { promisify } from "util";
import fetch from "node-fetch";

const writeFileAsync = promisify(fs.writeFile);

// API Client for Bundelicraft
const apiClient = create({
  baseURL:
    process.env.NEXT_PUBLIC_SERVER || "https://backend.bundelicrafts.com/api",
});

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT || "https://bundelicrafts.com";

// ---- SETTINGS ----
const PRODUCTS_PER_SITEMAP = 5000;
const BLOGS_PER_SITEMAP = 5000;
const CATEGORIES_PER_SITEMAP = 5000;
const DISTRICTS_PER_SITEMAP = 5000;

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

// ---- PRODUCT SITEMAPS (Main Products Only) ----
async function generateProductSitemaps() {
  console.log("📦 Generating product sitemaps...");

  const response = await apiClient.get("/product/get");

  if (!response.ok || !response.data?.products) {
    console.warn("⚠️ Cannot fetch products");
    return [];
  }

  const products = response.data.products;

  // Track unique products by _id (Main products)
  const uniqueProducts = new Map();

  products.forEach((product) => {
    if (!product._id) return;

    // Store the first occurrence of each product
    if (!uniqueProducts.has(product._id)) {
      uniqueProducts.set(product._id, product);
    }
  });

  const productUrls = [];

  // Add main product URLs
  uniqueProducts.forEach((product) => {
    // Create slug from product name
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    productUrls.push({
      loc: `${BASE_URL}/product/${slug}/${product._id}`,
      lastmod: product.updatedAt || new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    });
  });

  const chunks = chunkArray(productUrls, PRODUCTS_PER_SITEMAP);
  ensureDir("public/product");

  const sitemapFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const items = chunks[i];

    const xmlItems = items
      .map(
        (item) => `
  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    const fileName = `public/product/sitemap-${i + 1}.xml`;
    await writeFileAsync(fileName, xml);

    sitemapFiles.push(`${BASE_URL}/product/sitemap-${i + 1}.xml`);
    console.log(
      `✅ Created product sitemap ${i + 1} with ${items.length} URLs`,
    );
  }

  return sitemapFiles;
}

// ---- BLOG SITEMAPS ----
async function generateBlogSitemaps() {
  console.log("📝 Generating blog sitemaps...");

  let allBlogs = [];
  let currentPage = 1;
  let hasMore = true;

  // Fetch all blogs with pagination
  while (hasMore) {
    const response = await apiClient.get("/blog", { pageNumber: currentPage });

    if (!response.ok || !response.data?.blogs) {
      console.warn(`⚠️ Cannot fetch blogs page ${currentPage}`);
      break;
    }

    const blogs = response.data.blogs;
    allBlogs = [...allBlogs, ...blogs];

    // Check if there are more pages
    const totalPages = response.data.pageCount || 0;
    if (currentPage >= totalPages) {
      hasMore = false;
    } else {
      currentPage++;
    }
  }

  if (allBlogs.length === 0) {
    console.warn("⚠️ No blogs found");
    return [];
  }

  const chunks = chunkArray(allBlogs, BLOGS_PER_SITEMAP);
  ensureDir("public/blog");

  const sitemapFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const items = chunks[i];

    const xmlItems = items
      .map((blog) => {
        return `
  <url>
    <loc>${BASE_URL}/blogs/${blog._id}</loc>
    <lastmod>${blog.updatedAt || blog.createdAt || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
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
    console.log(`✅ Created blog sitemap ${i + 1} with ${items.length} URLs`);
  }

  return sitemapFiles;
}

// ---- CATEGORY SITEMAPS ----
async function generateCategorySitemaps() {
  console.log("🏷️ Generating category sitemaps...");

  const response = await apiClient.get("/variation/category/get");

  if (!response.ok || !response.data) {
    console.warn("⚠️ Cannot fetch categories");
    return [];
  }

  const categories = response.data;
  const chunks = chunkArray(categories, CATEGORIES_PER_SITEMAP);
  ensureDir("public/category");

  const sitemapFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const items = chunks[i];

    const xmlItems = items
      .map((category) => {
        return `
  <url>
    <loc>${BASE_URL}/category/${category._id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    const fileName = `public/category/sitemap-${i + 1}.xml`;
    await writeFileAsync(fileName, xml);

    sitemapFiles.push(`${BASE_URL}/category/sitemap-${i + 1}.xml`);
    console.log(
      `✅ Created category sitemap ${i + 1} with ${items.length} URLs`,
    );
  }

  return sitemapFiles;
}

// ---- DISTRICT SITEMAPS ----
async function generateDistrictSitemaps() {
  console.log("🗺️ Generating district sitemaps...");

  const response = await apiClient.get("/district/get-all-districts");

  if (!response.ok || !response.data?.districts) {
    console.warn("⚠️ Cannot fetch districts");
    return [];
  }

  const districts = response.data.districts;
  const chunks = chunkArray(districts, DISTRICTS_PER_SITEMAP);
  ensureDir("public/district");

  const sitemapFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    const items = chunks[i];

    const xmlItems = items
      .map((district) => {
        return `
  <url>
    <loc>${BASE_URL}/district/${district.name}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
      })
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    const fileName = `public/district/sitemap-${i + 1}.xml`;
    await writeFileAsync(fileName, xml);

    sitemapFiles.push(`${BASE_URL}/district/sitemap-${i + 1}.xml`);
    console.log(
      `✅ Created district sitemap ${i + 1} with ${items.length} URLs`,
    );
  }

  return sitemapFiles;
}

// ---- STATIC SITEMAP ----
async function generateStaticSitemap() {
  console.log("📄 Generating static sitemap...");

  ensureDir("public/static");

  const staticPaths = [
    "/",
    "/all-products",
    "/blogs",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/terms-and-conditions",
    "/return-cancellations",
    "/my-wishlist",
    "/account",
    "/new-arrivals",
  ];

  const xmlItems = staticPaths
    .map((url) => {
      return `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.5"}</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

  await writeFileAsync("public/static/sitemap.xml", xml);
  console.log("✅ Created static sitemap");

  return [`${BASE_URL}/static/sitemap.xml`];
}

// ---- MAIN INDEX SITEMAP ----
async function generateIndexSitemap(allSitemaps) {
  console.log("📑 Generating main index sitemap...");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allSitemaps
  .map(
    (loc) => `
  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
  )
  .join("")}
</sitemapindex>`;

  await writeFileAsync("public/sitemap.xml", xml);
  console.log("✅ Main index sitemap created at public/sitemap.xml");
}

// ---- PING SEARCH ENGINES ----
async function pingSearchEngines() {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;

  try {
    await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    );
    console.log("✅ Pinged Google");
  } catch (error) {
    console.error("❌ Failed to ping Google:", error.message);
  }

  try {
    await fetch(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    );
    console.log("✅ Pinged Bing");
  } catch (error) {
    console.error("❌ Failed to ping Bing:", error.message);
  }

  console.log("🔔 Search engines notified");
}

// ---- RUN ALL ----
(async () => {
  console.log("🚀 Starting sitemap generation for Bundelicrafts...\n");

  try {
    // Generate all sitemaps
    const staticSitemap = await generateStaticSitemap();
    const productSitemaps = await generateProductSitemaps();
    const blogSitemaps = await generateBlogSitemaps();
    const categorySitemaps = await generateCategorySitemaps();
    const districtSitemaps = await generateDistrictSitemaps();

    // Combine all sitemaps
    const allSitemaps = [
      ...staticSitemap,
      ...productSitemaps,
      ...blogSitemaps,
      ...categorySitemaps,
      ...districtSitemaps,
    ];

    console.log(`\n📊 Summary:`);
    console.log(`   - Static: ${staticSitemap.length} file`);
    console.log(`   - Products: ${productSitemaps.length} files`);
    console.log(`   - Blogs: ${blogSitemaps.length} files`);
    console.log(`   - Categories: ${categorySitemaps.length} files`);
    console.log(`   - Districts: ${districtSitemaps.length} files`);
    console.log(`   - Total: ${allSitemaps.length} sitemap files`);

    // Generate main index
    await generateIndexSitemap(allSitemaps);

    // Ping search engines (optional, comment out for local development)
    if (process.env.NODE_ENV === "production") {
      await pingSearchEngines();
    }

    console.log("\n🎉 Sitemap generation completed successfully!");
  } catch (error) {
    console.error("❌ Error generating sitemaps:", error);
    process.exit(1);
  }
})();
