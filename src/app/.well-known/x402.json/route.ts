import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  const walletAddress = process.env.WALLET_ADDRESS ?? "";
  const networkId = process.env.NETWORK_ID ?? "eip155:8453";

  const discovery = {
    "$schema": "https://x402.org/schema/discovery/v1",
    "version": 1,
    "name": "x402 Directory",
    "description": "x402エコシステムの日本語ディレクトリサイト。AIエージェント向けのエコシステムデータAPIを提供します。",
    "url": baseUrl,
    "network": networkId,
    "facilitator": "https://api.developer.coinbase.com/rpc/v1/base/facilitator",
    "payTo": walletAddress,
    "currency": "USDC",
    "currencyAddress": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "endpoints": [
      {
        "path": "/api/directory",
        "method": "GET",
        "price": "$0.01",
        "priceInUnits": "10000",
        "description": "x402エコシステム全体の構造化データ (JSON)",
        "mimeType": "application/json",
        "tags": ["directory", "ecosystem", "japan", "defi", "crypto"],
      },
      {
        "path": "/api/search",
        "method": "GET",
        "price": "$0.005",
        "priceInUnits": "5000",
        "description": "x402エコシステムのキーワード検索 (?q=keyword&category=cat)",
        "mimeType": "application/json",
        "tags": ["search", "directory", "ecosystem"],
      },
    ],
    "agenticMarket": {
      "bazaar": true,
      "autoRegister": true,
      "category": "directory",
      "region": "Japan/APAC",
    },
    "generatedAt": new Date().toISOString(),
  };

  return NextResponse.json(discovery, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
