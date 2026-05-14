import { TOP_SELLERS, CATEGORIES } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <span className="hero-eyebrow">HTTP 402 Payment Required Protocol</span>
          <h1 className="hero-title">
            <span className="gold">x402</span> エコシステム
            <br />
            日本語ディレクトリ
          </h1>
          <p className="hero-subtitle">
            AIエージェントがWeb上で自律的に支払いを行う新しいプロトコル。
            人間は無料で閲覧でき、AIエージェントがAPIにアクセスするとBase上のUSDCで自動課金されます。
            このサイト自体がx402のデモです。
          </p>
          <div className="hero-cta">
            <a href="#what-is-x402" className="btn-primary">
              x402を理解する
            </a>
            <a href="/api/directory" className="btn-secondary" target="_blank">
              API を試す (AI向け)
            </a>
          </div>

          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value">$48K+</div>
              <div className="stat-label">30日間収益 (Top 8)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">316K+</div>
              <div className="stat-label">30日間APIコール数</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">8453</div>
              <div className="stat-label">Base Mainnet Chain ID</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">$0.01</div>
              <div className="stat-label">このAPIの価格/call</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is x402 */}
      <section className="section" id="what-is-x402">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">プロトコル解説</div>
            <h2 className="section-title">x402とは何か？</h2>
            <p className="section-desc">
              HTTP 402ステータスコードを活用した、AIエージェント時代のためのマイクロペイメントプロトコル
            </p>
          </div>

          <div className="explainer-grid">
            <div className="explainer-step">
              <div className="step-number">1</div>
              <div className="step-title">AIエージェントがAPIをリクエスト</div>
              <div className="step-desc">
                AIエージェントが保護されたAPIエンドポイントにHTTPリクエストを送信します。
              </div>
            </div>
            <div className="explainer-step">
              <div className="step-number">2</div>
              <div className="step-title">402 Payment Required を受信</div>
              <div className="step-desc">
                サーバーは金額・受取アドレス・ネットワーク情報を含む支払い要求を返します（ERC-20 USDC）。
              </div>
            </div>
            <div className="explainer-step">
              <div className="step-number">3</div>
              <div className="step-title">EIP-3009署名を生成</div>
              <div className="step-desc">
                エージェントはウォレットでtransferWithAuthorization署名を作成し、X-Paymentヘッダーに含めて再送します。
              </div>
            </div>
            <div className="explainer-step">
              <div className="step-number">4</div>
              <div className="step-title">ファシリテーターが検証・決済</div>
              <div className="step-desc">
                CoinbaseのCDPファシリテーターが署名を検証し、Base上でUSDC送金を実行。APIレスポンスが返されます。
              </div>
            </div>
          </div>

          <div style={{ marginTop: "32px" }}>
            <div className="code-block">
              <span className="comment">
                # 1. 通常リクエスト → 402が返る
              </span>
              {"\n"}
              <span className="keyword">GET</span>{" "}
              <span className="string">/api/directory</span>
              {"\n\n"}
              <span className="comment">
                # 2. X-Paymentヘッダーを添付して再リクエスト
              </span>
              {"\n"}
              <span className="keyword">GET</span>{" "}
              <span className="string">/api/directory</span>
              {"\n"}
              <span className="keyword">X-Payment:</span>{" "}
              <span className="value">eyJzY2hlbWUiOiJleGFjdCIsInBheW1...</span>
              {"\n\n"}
              <span className="comment"># 3. 決済成功 → JSON レスポンス</span>
              {"\n"}
              <span className="value">200 OK</span>{" "}
              <span className="string">{"{ \"top_sellers\": [...] }"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="section" id="ecosystem">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">エコシステム</div>
            <h2 className="section-title">x402の全体像</h2>
            <p className="section-desc">
              Base mainnet上で動くx402対応APIカテゴリ一覧
            </p>
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat.id} style={{ marginBottom: "40px" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "16px",
                  color: "var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--gold)",
                    display: "inline-block",
                  }}
                />
                {cat.label}
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 400 }}
                >
                  — {cat.description}
                </span>
              </h3>
              <div className="card-grid">
                {cat.products.map((product) => (
                  <div key={product.name} className="card">
                    <div className="card-header">
                      <div className="card-title">{product.name}</div>
                      <span className="card-badge">{product.region}</span>
                    </div>
                    <p className="card-desc">{product.description}</p>
                    <div className="card-meta">
                      <span>📡 {product.endpoints} endpoints</span>
                      <span>💰 {product.priceRange}</span>
                    </div>
                    <div className="tag-list">
                      {product.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Sellers */}
      <section className="section" id="sellers">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">x402scan データ</div>
            <h2 className="section-title">Top Sellers 分析</h2>
            <p className="section-desc">
              過去30日間の収益・コール数ランキング（x402scanデータ）
            </p>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>プロダクト</th>
                  <th>カテゴリ</th>
                  <th>30日収益</th>
                  <th>30日コール数</th>
                  <th>平均単価</th>
                </tr>
              </thead>
              <tbody>
                {TOP_SELLERS.map((seller) => (
                  <tr key={seller.rank}>
                    <td>
                      <span
                        className={`rank-badge ${seller.rank <= 3 ? "top3" : ""}`}
                      >
                        {seller.rank}
                      </span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{seller.name}</td>
                    <td>
                      <span className="tag">{seller.category}</span>
                    </td>
                    <td className="revenue">{seller.revenue30d}</td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {seller.calls30d.toLocaleString()}
                    </td>
                    <td style={{ color: "var(--text-muted)" }}>
                      {seller.avgPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Japan Products */}
      <section className="section" id="japan">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">日本 / APAC</div>
            <h2 className="section-title">日本製x402プロダクト</h2>
            <p className="section-desc">
              日本・アジア太平洋地域で開発されたx402対応APIサービス
            </p>
          </div>

          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <div className="card-title">Japan Data API</div>
                <span className="card-badge">Japan</span>
              </div>
              <p className="card-desc">
                日本の企業データ・経済統計・市場情報を提供する21エンドポイントのAPI。
                x402プロトコルで1コール$0.001〜$0.005で提供。
              </p>
              <div className="card-meta">
                <span>📡 21 endpoints</span>
                <span>💰 $0.001-$0.005</span>
              </div>
              <div className="tag-list">
                <span className="tag">japan</span>
                <span className="tag">economy</span>
                <span className="tag">market</span>
              </div>
              <div style={{ marginTop: "16px" }}>
                <a
                  href="https://apijapan.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.85rem" }}
                >
                  apijapan.vercel.app →
                </a>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">x402 Oracle</div>
                <span className="card-badge">Japan/APAC</span>
              </div>
              <p className="card-desc">
                日本円・アジア通貨ペアのオンチェーンオラクル。
                Base mainnet上でJPY/USD・JPY/ETH等のフィードを提供。
              </p>
              <div className="card-meta">
                <span>📡 3 endpoints</span>
                <span>💰 $0.01-$0.05</span>
              </div>
              <div className="tag-list">
                <span className="tag">oracle</span>
                <span className="tag">jpy</span>
                <span className="tag">forex</span>
                <span className="tag">base</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Docs */}
      <section className="section" id="api">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">このサイトのAPI</div>
            <h2 className="section-title">AIエージェント向けAPI</h2>
            <p className="section-desc">
              ブラウザからは無料で閲覧できますが、AIエージェントがアクセスするとx402で自動課金されます
            </p>
          </div>

          <div className="api-info">
            <div className="api-info-title">
              <span className="method-badge">GET</span>
              <code>/api/directory</code>
              <span className="price-tag">$0.01 / call</span>
            </div>
            <p className="api-info-desc">
              x402エコシステムの構造化データをJSON形式で返します。Top Sellers、カテゴリ別製品一覧、日本製品リストを含みます。
            </p>
          </div>

          <div className="api-info">
            <div className="api-info-title">
              <span className="method-badge">GET</span>
              <code>/api/search?q=keyword&category=cat</code>
              <span className="price-tag">$0.005 / call</span>
            </div>
            <p className="api-info-desc">
              x402エコシステムをキーワード検索します。クエリパラメータ: <code>q</code>（検索ワード）、
              <code>category</code>（フィルタ: crypto_data / apac_data / defi / security）
            </p>
          </div>

          <div style={{ marginTop: "24px" }}>
            <div className="code-block">
              <span className="comment">
                # Claude / GPT エージェントからのアクセス例
              </span>
              {"\n"}
              <span className="keyword">import</span> anthropic
              {"\n\n"}
              <span className="comment">
                # x402対応クライアントで自動決済
              </span>
              {"\n"}
              client = anthropic.Anthropic()
              {"\n"}
              <span className="comment">
                # → User-Agentに"anthropic"が含まれるため自動的に402フローへ
              </span>
              {"\n"}
              <span className="comment">
                # → Base USDC $0.01が自動決済され、JSONが返される
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
