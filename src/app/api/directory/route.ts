import { NextRequest, NextResponse } from "next/server";
import { TOP_SELLERS, CATEGORIES, JAPAN_PRODUCTS } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const payload = {
    x402_version: 1,
    description: "x402 Ecosystem Directory — comprehensive structured data",
    top_sellers: TOP_SELLERS.map((s) => ({
      rank: s.rank,
      name: s.name,
      revenue_30d: s.revenue30d,
      calls_30d: s.calls30d,
      avg_price: s.avgPrice,
      category: s.category,
    })),
    categories: Object.fromEntries(
      CATEGORIES.map((cat) => [
        cat.id,
        cat.products.map((p) => ({
          name: p.name,
          url: p.url,
          description: p.description,
          endpoints: p.endpoints,
          price_range: p.priceRange,
          region: p.region,
          tags: p.tags,
        })),
      ])
    ),
    japan_products: JAPAN_PRODUCTS,
    network: {
      chain: "Base Mainnet",
      chain_id: 8453,
      network_id: "eip155:8453",
      currency: "USDC",
      facilitator: "https://api.developer.coinbase.com/rpc/v1/base/facilitator",
    },
    last_updated: new Date().toISOString(),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
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
