import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "x402 Directory — エコシステムまとめ",
  description:
    "x402プロトコルのエコシステムを日本語で解説するディレクトリサイト。AIエージェントへのx402課金デモを含みます。",
  openGraph: {
    title: "x402 Directory",
    description: "x402エコシステムの日本語まとめサイト",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <div className="logo">
              <span>x402</span>
              <span className="logo-badge">Directory</span>
            </div>
            <nav className="header-nav">
              <a href="#what-is-x402">x402とは</a>
              <a href="#ecosystem">エコシステム</a>
              <a href="#sellers">Top Sellers</a>
              <a href="#japan">日本製品</a>
              <span className="header-tag">Base Mainnet</span>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container">
            <p>
              x402 Directory &mdash; Built on{" "}
              <a
                href="https://x402.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                x402 Protocol
              </a>{" "}
              &middot; Powered by{" "}
              <a
                href="https://www.coinbase.com/developer-platform"
                target="_blank"
                rel="noopener noreferrer"
              >
                Coinbase CDP
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
