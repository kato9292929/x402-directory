# x402 Directory

x402プロトコルのエコシステムを日本語で解説するディレクトリサイト。
**人間はブラウザで無料閲覧でき、AIエージェントがAPIにアクセスするとBase上のUSDCで自動課金される**、x402の仕組みそのものをデモするサイトです。

## 概要

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 16 (App Router) + TypeScript |
| デプロイ | Vercel |
| ネットワーク | Base Mainnet (eip155:8453) |
| 決済通貨 | USDC (ERC-20) |
| ファシリテーター | Coinbase CDP |

## エンドポイント

### `/`（トップページ）
- **対象:** 人間（ブラウザ）
- **価格:** 無料
- x402とは何か・エコシステム全体像・Top Sellers・日本製品の日本語解説ページ

### `GET /api/directory`
- **対象:** AIエージェント
- **価格:** $0.01 / call（Base USDC）
- x402エコシステムの構造化データをJSON形式で返す

```json
{
  "top_sellers": [...],
  "categories": {
    "crypto_data": [...],
    "apac_data": [...],
    "defi": [...],
    "security": [...]
  },
  "japan_products": [
    { "name": "Japan Data API", "url": "https://apijapan.vercel.app", "endpoints": 21, "price_range": "$0.001-$0.005" },
    { "name": "x402 Oracle", "endpoints": 3, "price_range": "$0.01-$0.05" }
  ],
  "last_updated": "2026-05-14T00:00:00Z"
}
```

### `GET /api/search?q=keyword&category=cat`
- **対象:** AIエージェント
- **価格:** $0.005 / call（Base USDC）
- クエリパラメータ: `q`（検索ワード）、`category`（フィルタ: `crypto_data` / `apac_data` / `defi` / `security`）

### `GET /.well-known/x402.json`
- **対象:** 全員（無料）
- x402 Discovery ドキュメント。Agentic.market Bazaar への自動登録に対応

## AIエージェント検出の仕組み

`User-Agent` ヘッダーを検査してAIエージェントかどうかを判定します。

**AIエージェントと判定されるUA（`src/lib/agentDetection.ts`）:**
- `anthropic`, `claude`, `openai`, `gpt`, `chatgpt`, `agent`
- `python-httpx`, `python-requests`, `aiohttp`, `axios`, `curl` など

**ブラウザ（Chrome / Firefox / Safari）は無料通過。**

## x402 支払いフロー

```
1. AIエージェントが GET /api/directory を送信
2. middleware.ts がUA検出 → 402 Payment Required を返す
   X-Payment-Requirements: <base64 encoded payment requirements>
3. エージェントがEIP-3009署名を生成し X-Payment ヘッダーに添付して再送
4. proxy.ts 経由でCDPファシリテーターが署名検証・Base上でUSDC決済
5. 200 OK + JSON レスポンスが返される
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example` を `.env.local` にコピーして編集:

```bash
cp .env.example .env.local
```

```env
# USDC受取ウォレットアドレス（Base mainnet EVMアドレス）
WALLET_ADDRESS=0xYourWalletAddressHere

# ネットワーク識別子（Base mainnet固定）
NETWORK_ID=eip155:8453

# デプロイURL（Vercel等）
NEXT_PUBLIC_BASE_URL=https://your-deployment.vercel.app
```

> `FACILITATOR_URL` はデフォルトで `https://api.developer.coinbase.com/rpc/v1/base/facilitator` が使用されます（変更不要）。

### 3. 開発サーバー起動

```bash
npm run dev
```

## Vercel デプロイ

1. このリポジトリをVercelにインポート
2. Environment Variables に以下を設定:
   - `WALLET_ADDRESS`
   - `NETWORK_ID` = `eip155:8453`
   - `NEXT_PUBLIC_BASE_URL` = デプロイURL
3. デプロイ

## ファイル構成

```
x402-directory/
├── proxy.ts                          # CDPファシリテーター通信ユーティリティ（Next.js 16必須）
├── next.config.ts                    # Next.js設定（CORS headers等）
├── vercel.json                       # Vercelデプロイ設定
└── src/
    ├── middleware.ts                 # x402 User-Agent検知・支払いゲート
    ├── lib/
    │   ├── agentDetection.ts         # AIエージェントUA判定ロジック
    │   ├── x402.ts                   # x402プロトコルヘルパー
    │   └── data.ts                   # エコシステムデータ（Top Sellers・製品一覧）
    └── app/
        ├── layout.tsx                # Outfitフォント・黒背景・ゴールドアクセント
        ├── page.tsx                  # トップページ（人間向け無料解説）
        ├── globals.css               # グローバルスタイル
        ├── api/
        │   ├── directory/route.ts    # $0.01/call — エコシステムJSON
        │   └── search/route.ts       # $0.005/call — キーワード検索
        └── .well-known/
            └── x402.json/route.ts   # Discovery document
```

## 技術スタック詳細

- **[x402 Protocol](https://x402.org)** — HTTP 402ベースのマイクロペイメントプロトコル
- **[Coinbase CDP Facilitator](https://www.coinbase.com/developer-platform)** — EIP-3009署名の検証・オンチェーン決済
- **Base Mainnet** — Ethereum L2（低ガス・高速）
- **USDC** — USD Coin (ERC-20) on Base: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
