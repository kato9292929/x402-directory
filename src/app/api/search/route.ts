import { NextRequest, NextResponse } from "next/server";
import { TOP_SELLERS, CATEGORIES, JAPAN_PRODUCTS } from "@/lib/data";

export const dynamic = "force-dynamic";

function normalize(s: string) {
  return s.toLowerCase();
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = normalize(searchParams.get("q") ?? "");
  const categoryFilter = searchParams.get("category") ?? "";

  if (!query) {
    return NextResponse.json(
      { error: "Missing query parameter: ?q=keyword" },
      { status: 400 }
    );
  }

  // Search sellers
  const matchedSellers = TOP_SELLERS.filter(
    (s) =>
      normalize(s.name).includes(query) ||
      normalize(s.category).includes(query)
  ).filter((s) => (categoryFilter ? s.category === categoryFilter : true));

  // Search products across categories
  const matchedProducts: Array<{
    category: string;
    name: string;
    url: string;
    description: string;
    endpoints: number;
    price_range: string;
    tags: string[];
  }> = [];

  for (const cat of CATEGORIES) {
    if (categoryFilter && cat.id !== categoryFilter) continue;
    for (const product of cat.products) {
      const searchTarget =
        normalize(product.name) +
        " " +
        normalize(product.description) +
        " " +
        product.tags.join(" ");
      if (searchTarget.includes(query)) {
        matchedProducts.push({
          category: cat.id,
          name: product.name,
          url: product.url,
          description: product.description,
          endpoints: product.endpoints,
          price_range: product.priceRange,
          tags: product.tags,
        });
      }
    }
  }

  // Search Japan products
  const matchedJapan = JAPAN_PRODUCTS.filter(
    (p) =>
      normalize(p.name).includes(query) ||
      normalize(p.description).includes(query)
  );

  return NextResponse.json(
    {
      query,
      category_filter: categoryFilter || null,
      results: {
        sellers: matchedSellers,
        products: matchedProducts,
        japan_products: matchedJapan,
      },
      total:
        matchedSellers.length + matchedProducts.length + matchedJapan.length,
      searched_at: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-Payment",
    },
  });
}
