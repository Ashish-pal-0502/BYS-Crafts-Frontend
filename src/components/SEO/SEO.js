import Head from "next/head";

export default function SEO({ title, description, image, url, keywords }) {
  const defaultTitle = "BundeliCrafts - Handcrafted Treasures";
  const defaultDescription =
    "Explore unique handcrafted products from BundeliCrafts. Shop traditional and artistic creations from skilled artisans.";
  const defaultImage = "/logo.png"; // Place in /public/
  const defaultURL = "https://bundelicrafts.com";
  const defaultKeywords =
    "handicrafts, handmade products, Bundeli crafts, artisanal products, home decor, traditional art";

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultURL} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />
    </Head>
  );
}
