// x402scan (https://www.x402scan.com) の Featured Services / Overall Stats を基にした
// x402 エコシステムの実データ。過去30日間（x402scan「Past 30 Days」ベース）。
// 最終取得: 2026-05-30

export type Seller = {
  rank: number;
  name: string;
  domain: string;
  volume30d: string;
  txns30d: string;
  buyers30d: number;
  chains: string[];
  category: string;
};

export type Service = {
  name: string;
  domain: string;
  url: string;
  description: string;
  volume30d: string;
  txns30d: string;
  buyers30d: number;
  chains: string[];
  category: string;
  tags: string[];
};

export type Product = Service;

export type EcosystemCategory = {
  id: string;
  label: string;
  description: string;
  products: Product[];
};

// x402 エコシステム全体の統計（x402scan Overall Stats, Past 30 Days）
export const ECOSYSTEM_STATS = {
  transactions: "3.68M",
  volume: "$1.11M",
  buyers: "190.11K",
  sellers: "43K",
  period: "過去30日",
  source: "x402scan",
};

// x402scan Featured Services（トランザクション数の多い順）
export const SERVICES: Service[] = [
  {
    name: "StableEnrich",
    domain: "stableenrich.dev",
    url: "https://stableenrich.dev",
    description:
      "Apollo・Clado・Exa・Firecrawl・Google Maps・Serper・Whitepages等のAPIへ従量課金でアクセス。認証・サブスク不要。",
    volume30d: "$3.12K",
    txns30d: "108.08K",
    buyers30d: 669,
    chains: ["Base", "Solana"],
    category: "data_web",
    tags: ["enrichment", "web", "apollo", "exa"],
  },
  {
    name: "BlockRun — YOPO: You Only Pay for the Outcome",
    domain: "blockrun.ai",
    url: "https://blockrun.ai",
    description:
      "55以上のLLM・ライブデータAPI・メディア生成・コード実行環境にAIエージェントを接続。USDCで従量課金、APIキー不要。",
    volume30d: "$2.69K",
    txns30d: "84.88K",
    buyers30d: 319,
    chains: ["Base"],
    category: "ai_gateway",
    tags: ["llm", "ai", "gateway", "usdc"],
  },
  {
    name: "HYRE Agent — AI-Enhanced DeFi Data API",
    domain: "mpp.hyreagent.fun",
    url: "https://mpp.hyreagent.fun",
    description:
      "自律エージェント向けDeFiインテリジェンス。Trenches・Traders・LP・deBridge・Nansenスマートマネーを含む28エンドポイント。",
    volume30d: "$1.42K",
    txns30d: "32.32K",
    buyers30d: 543,
    chains: ["Solana", "Base", "SKALE"],
    category: "defi_intel",
    tags: ["defi", "nansen", "smart-money", "multichain"],
  },
  {
    name: "BlockRun — Pay-per-call AI gateway",
    domain: "blockrun.ai",
    url: "https://blockrun.ai",
    description:
      "モデル・データ・実行環境を1つのエンドポイントで提供する従量課金AIゲートウェイ。Base・SolanaのUSDCで決済。",
    volume30d: "$104.33",
    txns30d: "24.12K",
    buyers30d: 170,
    chains: ["Base"],
    category: "ai_gateway",
    tags: ["ai", "gateway", "models"],
  },
  {
    name: "twit.sh — Plug AI agents into X",
    domain: "x402.twit.sh",
    url: "https://x402.twit.sh",
    description:
      "AIエージェント向けのリアルタイムTwitter/Xデータ。サインアップ・APIキー不要、Base USDCで従量課金。",
    volume30d: "$208.10",
    txns30d: "22.16K",
    buyers30d: 154,
    chains: ["Base"],
    category: "data_web",
    tags: ["twitter", "x", "social", "realtime"],
  },
  {
    name: "weather.hugen.tokyo",
    domain: "weather.hugen.tokyo",
    url: "https://weather.hugen.tokyo",
    description: "日本発の気象データAPI。Base・SolanaのUSDCで従量課金。",
    volume30d: "$274.43",
    txns30d: "21.85K",
    buyers30d: 242,
    chains: ["Base", "Solana"],
    category: "apac",
    tags: ["weather", "japan", "tokyo"],
  },
  {
    name: "sol.blockrun.ai",
    domain: "sol.blockrun.ai",
    url: "https://sol.blockrun.ai",
    description: "BlockRunのSolana向け従量課金AIゲートウェイ。",
    volume30d: "$415.94",
    txns30d: "19.01K",
    buyers30d: 37,
    chains: ["Solana"],
    category: "ai_gateway",
    tags: ["ai", "gateway", "solana"],
  },
  {
    name: "StableMerch",
    domain: "stablemerch.dev",
    url: "https://stablemerch.dev",
    description:
      "AIがデザインしエージェントが購入するカスタムシャツ。Claude上でx402決済。",
    volume30d: "$326.98",
    txns30d: "10.18K",
    buyers30d: 113,
    chains: ["Base", "Solana"],
    category: "commerce",
    tags: ["merch", "commerce", "ai-design"],
  },
  {
    name: "molty.cash — USDC payments for agents and humans",
    domain: "api.molty.cash",
    url: "https://api.molty.cash",
    description:
      "エージェントと人間向けのUSDC決済。チップ・業務委託・ギグをx402（Base・Solana・World Chain・SKALE）で精算。",
    volume30d: "$453.49",
    txns30d: "9.88K",
    buyers30d: 38,
    chains: ["Base", "Solana", "World Chain", "SKALE"],
    category: "commerce",
    tags: ["payments", "tips", "gigs", "multichain"],
  },
  {
    name: "Surf Web",
    domain: "web.surf.cascade.fyi",
    url: "https://web.surf.cascade.fyi",
    description: "x402マイクロペイメントによる従量課金のWeb検索・クロールAPI。",
    volume30d: "$22.31",
    txns30d: "7.64K",
    buyers30d: 49,
    chains: ["Base", "Solana"],
    category: "data_web",
    tags: ["search", "crawl", "web"],
  },
  {
    name: "Nansen AI — Agentic Trading with Onchain Intelligence",
    domain: "api.nansen.ai",
    url: "https://api.nansen.ai",
    description:
      "リサーチ・分析・実行を1ループで行うオンチェーンエージェント。5億以上のラベル付きアドレスを活用。",
    volume30d: "$152.86",
    txns30d: "6.95K",
    buyers30d: 80,
    chains: ["Base", "Solana"],
    category: "defi_intel",
    tags: ["onchain", "trading", "intelligence", "nansen"],
  },
  {
    name: "Otto AI x402 — Programmable USDC payments for AI agents",
    domain: "x402.ottoai.services",
    url: "https://x402.ottoai.services",
    description:
      "x402 V2上の37の従量課金AIサービス。マーケット情報・DeFi実行・AIクリエイティブ。$0.001/callから。",
    volume30d: "$34.92",
    txns30d: "6.53K",
    buyers30d: 289,
    chains: ["Base", "Polygon", "Solana"],
    category: "ai_gateway",
    tags: ["ai", "defi", "market-intel", "multichain"],
  },
  {
    name: "StableTravel",
    domain: "stabletravel.dev",
    url: "https://stabletravel.dev",
    description:
      "航空券・ホテル・アクティビティ・送迎に従量課金でアクセス。認証・サブスク不要。",
    volume30d: "$89.47",
    txns30d: "4.72K",
    buyers30d: 82,
    chains: ["Base", "Solana"],
    category: "commerce",
    tags: ["travel", "flights", "hotels"],
  },
  {
    name: "OneSource — Pay-per-call Ethereum RPC for Agents",
    domain: "skills.onesource.io",
    url: "https://skills.onesource.io",
    description:
      "AIエージェント向けの従量課金Ethereumメインネット RPC。ブロック・残高・コントラクト・NFT・取引データをノードから直接配信。",
    volume30d: "$17.05",
    txns30d: "4.22K",
    buyers30d: 488,
    chains: ["Base"],
    category: "defi_intel",
    tags: ["rpc", "ethereum", "infra"],
  },
  {
    name: "Exa — Web Search API & AI Search Engine",
    domain: "api.exa.ai",
    url: "https://api.exa.ai",
    description:
      "強力なWeb検索・クロールAPIを備えたリアルタイムAI検索エンジン。Webから構造化コンテンツを抽出。",
    volume30d: "$25.73",
    txns30d: "3.95K",
    buyers30d: 164,
    chains: ["Base"],
    category: "data_web",
    tags: ["search", "crawl", "ai-search"],
  },
];

const CATEGORY_META: { id: string; label: string; description: string }[] = [
  {
    id: "data_web",
    label: "Webデータ・検索・エンリッチメント",
    description: "リアルタイムWeb検索・クロール・データ補完API",
  },
  {
    id: "ai_gateway",
    label: "AIゲートウェイ・LLM",
    description: "AIモデル・データ・実行環境への従量課金アクセス",
  },
  {
    id: "defi_intel",
    label: "DeFi・オンチェーン分析",
    description: "オンチェーンインテリジェンス・RPC・スマートマネー分析",
  },
  {
    id: "commerce",
    label: "コマース・決済",
    description: "エージェントによる商取引・送金・決済",
  },
  {
    id: "apac",
    label: "APAC・日本",
    description: "日本・アジア太平洋地域発のx402サービス",
  },
];

// Featured Services をトランザクション数の多い順にランク付けした Top Sellers
export const TOP_SELLERS: Seller[] = SERVICES.map((s, i) => ({
  rank: i + 1,
  name: s.name,
  domain: s.domain,
  volume30d: s.volume30d,
  txns30d: s.txns30d,
  buyers30d: s.buyers30d,
  chains: s.chains,
  category: s.category,
}));

// カテゴリごとにグループ化したエコシステム一覧
export const CATEGORIES: EcosystemCategory[] = CATEGORY_META.map((meta) => ({
  ...meta,
  products: SERVICES.filter((s) => s.category === meta.id),
}));

// 日本発のx402プロダクト
export const JAPAN_PRODUCTS = [
  {
    name: "weather.hugen.tokyo",
    url: "https://weather.hugen.tokyo",
    endpoints: 20,
    price_range: "従量課金",
    description: "日本発の気象データAPI（x402scan Featured Services掲載）",
    network: "base/solana",
  },
  {
    name: "Japan Data API",
    url: "https://apijapan.vercel.app",
    endpoints: 21,
    price_range: "$0.001-$0.005",
    description: "日本の企業・経済・市場データAPI",
    network: "base",
  },
  {
    name: "x402 Oracle",
    url: "https://x402oracle.vercel.app",
    endpoints: 3,
    price_range: "$0.01-$0.05",
    description: "日本円・アジア通貨ペアのオンチェーンオラクル",
    network: "base",
  },
];
