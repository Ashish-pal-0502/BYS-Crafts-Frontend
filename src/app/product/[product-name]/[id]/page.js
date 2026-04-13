import Link from "next/link";
import ProductPage from "./product";

const API_BASE = process.env.NEXT_PUBLIC_SERVER;

async function fetchProduct(id) {
  const url = `${API_BASE}/product/get-by-id?productId=${id}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

async function fetchRelatedProducts(category) {
  const url = `${API_BASE}/product/get?category=${category}`;

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

// ---------- META DATA ----------
export async function generateMetadata({ params }) {
  const { id, "product-name": productName } = params;

  try {
    const product = await fetchProduct(id);

    // Always build an ABSOLUTE image URL
    const rawImg = product?.image?.[0];
    const imageUrl = rawImg?.startsWith("http")
      ? rawImg
      : `${process.env.NEXT_PUBLIC_CLIENT}${rawImg}`;

    // Full product URL
    const pageUrl = `${process.env.NEXT_PUBLIC_CLIENT}/product/${productName}/${id}`;

    return {
      title: `${product.metaTitle} | BundeliCrafts`,
      description: product.metaDescription,

      openGraph: {
        title: `${product.metaTitle} | BundeliCrafts`,
        description: product.metaDescription,
        url: pageUrl,
        siteName: "BundeliCrafts",
        type: "website",

        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
          },
          {
            url: imageUrl,
            width: 800,
            height: 800,
          },
        ],
      },

      other: {
        "fb:app_id": "1950204638891098",
      },

      twitter: {
        card: "summary_large_image",
        title: product.metaTitle,
        description: product.metaDescription,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Product not found",
      description: "Product not found",
      robots: "noindex",
    };
  }
}

export default async function Product({ params }) {
  const { id } = params;

  try {
    const product = await fetchProduct(id);

    const related = await fetchRelatedProducts(product.category._id);

    return <ProductPage product={product} related={related} />;
  } catch {
    return (
      <div className="py-8 px-4 min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-7xl font-extrabold">404</h1>
        <p className="text-3xl font-bold">Product Not Found</p>
        <Link href="/">
          <button>Back to Products</button>
        </Link>
      </div>
    );
  }
}
