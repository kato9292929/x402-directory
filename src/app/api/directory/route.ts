import { NextRequest, NextResponse } from "next/server";
import {
  TOP_SELLERS,
  CATEGORIES,
  JAPAN_PRODUCTS,
  ECOSYSTEM_STATS,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const payload = {
    x402_version: 1,
    description: "x402 Ecosystem Directory — comprehensive structured data",
    source: "x402scan",
    period: "past_30_days",
    ecosystem_stats: ECOSYSTEM_STATS,
    top_sellers: TOP_SELLERS.map((s) => ({
      rank: s.rank,
      name: s.name,
      domain: s.domain,
      volume_30d: s.volume30d,
      txns_30d: s.txns30d,
      buyers_30d: s.buyers30d,
      chains: s.chains,
      category: s.category,
    })),
    categories: Object.fromEntries(
      CATEGORIES.map((cat) => [
        cat.id,
        cat.products.map((p) => ({
          name: p.name,
          domain: p.domain,
          url: p.url,
          description: p.description,
          volume_30d: p.volume30d,
          txns_30d: p.txns30d,
          buyers_30d: p.buyers30d,
          chains: p.chains,
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
