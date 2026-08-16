export type Seller = {
  rank: number;
  name: string;
  address: string;
  revenue30d: string;
  calls30d: number;
  avgPrice: string;
  category: string;
};

export type Product = {
  name: string;
  url: string;
  description: string;
  endpoints: number;
  priceRange: string;
  region: string;
  tags: string[];
};

export type EcosystemCategory = {
  id: string;
  label: string;
  description: string;
  products: Product[];
};

export const TOP_SELLERS: Seller[] = [
  {
    rank: 1,
    name: "CryptoPrice Feed",
    address: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12",
    revenue30d: "$14,820",
    calls30d: 148200,
    avgPrice: "$0.001",
    category: "crypto_data",
  },
  {
    rank: 2,
    name: "Japan Data API",
    address: "0xapijapan000000000000000000000000000000",
    revenue30d: "$9,450",
    calls30d: 18900,
    avgPrice: "$0.005",
    category: "apac_data",
  },
  {
    rank: 3,
    name: "DeFi Yield Oracle",
    address: "0xdefi000000000000000000000000000000000001",
    revenue30d: "$7,320",
    calls30d: 73200,
    avgPrice: "$0.001",
    category: "defi",
  },
  {
    rank: 4,
    name: "Wallet Screening API",
    address: "0xsecure00000000000000000000000000000000",
    revenue30d: "$6,100",
    calls30d: 6100,
    avgPrice: "$0.01",
    category: "security",
  },
  {
    rank: 5,
    name: "x402 Oracle",
    address: "0xoracle000000000000000000000000000000000",
    revenue30d: "$4,980",
    calls30d: 9960,
    avgPrice: "$0.005",
    category: "apac_data",
  },
  {
    rank: 6,
    name: "NFT Metadata API",
    address: "0xnftmeta0000000000000000000000000000000",
    revenue30d: "$3,750",
    calls30d: 37500,
    avgPrice: "$0.0001",
    category: "crypto_data",
  },
  {
    rank: 7,
    name: "KYC Verification",
    address: "0xkyc00000000000000000000000000000000000",
    revenue30d: "$3,200",
    calls30d: 1280,
    avgPrice: "$0.025",
    category: "security",
  },
  {
    rank: 8,
    name: "APAC News Feed",
    address: "0xnews0000000000000000000000000000000000",
    revenue30d: "$2,100",
    calls30d: 21000,
    avgPrice: "$0.001",
    category: "apac_data",
  },
];

export const CATEGORIES: EcosystemCategory[] = [
  {
    id: "crypto_data",
    label: "暗号資産データ",
    description: "リアルタイム価格フィード・オンチェーン分析・トークン情報",
    products: [
      {
        name: "CryptoPrice Feed",
        url: "https://cryptoprice.x402.io",
        description: "300+通貨ペアのリアルタイム価格データ",
        endpoints: 12,
        priceRange: "$0.0001-$0.001",
        region: "Global",
        tags: ["price", "realtime", "defi"],
      },
      {
        name: "NFT Metadata API",
        url: "https://nftmeta.x402.io",
        description: "EVM互換チェーン全NFTのメタデータ取得",
        endpoints: 8,
        priceRange: "$0.0001-$0.0005",
        region: "Global",
        tags: ["nft", "metadata", "base"],
      },
    ],
  },
  {
    id: "apac_data",
    label: "APAC・日本データ",
    description: "日本・アジア太平洋地域特化のデータAPI",
    products: [
      {
        name: "Japan Data API",
        url: "https://apijapan.vercel.app",
        description: "日本の経済・企業・市場データ21エンドポイント",
        endpoints: 21,
        priceRange: "$0.001-$0.005",
        region: "Japan",
        tags: ["japan", "economy", "market"],
      },
      {
        name: "x402 Oracle",
        url: "https://x402oracle.vercel.app",
        description: "日本円・アジア通貨ペアのオンチェーンオラクル",
        endpoints: 3,
        priceRange: "$0.01-$0.05",
        region: "Japan/APAC",
        tags: ["oracle", "jpy", "forex"],
      },
      {
        name: "APAC News Feed",
        url: "https://apacnews.x402.io",
        description: "日本・韓国・東南アジアの金融ニュース配信",
        endpoints: 5,
        priceRange: "$0.001-$0.002",
        region: "APAC",
        tags: ["news", "apac", "finance"],
      },
    ],
  },
  {
    id: "latam_data",
    label: "LATAM・中南米データ",
    description: "ラテンアメリカ特化の公式データAPI",
    products: [
      {
        name: "Colombia TRM",
        url: "https://x402.lagaceta.net/trm",
        description: "Official Colombian USD/COP TRM from Superintendencia Financiera via datos.gov.co.",
        endpoints: 1,
        priceRange: "$0.005",
        region: "Colombia/LATAM",
        tags: ["colombia", "trm", "fx", "cop", "usd"],
      },
    ],
  },
  {
    id: "defi",
    label: "DeFi・プロトコル",
    description: "DeFiプロトコルデータ・イールド情報・流動性分析",
    products: [
      {
        name: "DeFi Yield Oracle",
        url: "https://yield.x402.io",
        description: "主要DeFiプロトコルのAPY・流動性リアルタイム取得",
        endpoints: 15,
        priceRange: "$0.001-$0.003",
        region: "Global",
        tags: ["defi", "yield", "apy", "liquidity"],
      },
    ],
  },
  {
    id: "security",
    label: "セキュリティ・コンプライアンス",
    description: "ウォレットスクリーニング・KYC・不正検知",
    products: [
      {
        name: "Wallet Screening API",
        url: "https://screening.x402.io",
        description: "AML/CFTウォレットリスクスコアリング",
        endpoints: 4,
        priceRange: "$0.01-$0.05",
        region: "Global",
        tags: ["aml", "kyc", "screening", "compliance"],
      },
      {
        name: "KYC Verification",
        url: "https://kyc.x402.io",
        description: "オンチェーンKYC証明書の発行・検証",
        endpoints: 6,
        priceRange: "$0.025-$0.10",
        region: "Global",
        tags: ["kyc", "identity", "compliance"],
      },
    ],
  },
];

export const JAPAN_PRODUCTS = [
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
