import React from "react";
import FinancialChart from "../components/FinancialChart";
import companies from "../data/companies";

function MetricItem({ label, value, tone = "default" }) {
  return (
    <div className={`company-metric-item ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function IntelligenceList({ items, type }) {
  return (
    <ul className={`company-intelligence-list ${type}`}>
      {items.map((item, index) => (
        <li key={`${type}-${index}`}>
          <span className="intelligence-list-icon">
            {type === "strength" ? "✓" : "!"}
          </span>

          <div>
            <strong>
              {type === "strength"
                ? `Strength ${index + 1}`
                : `Risk ${index + 1}`}
            </strong>

            <p>{item}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Company() {
  const company = companies[0];

  return (
    <div className="company-page">
      <section className="company-hero">
        <div className="company-hero-main">
          <div className="company-logo-mark">
            {company.ticker?.slice(0, 2) || "JS"}
          </div>

          <div className="company-identity">
            <div className="company-page-label">
              <span />
              Company Intelligence
            </div>

            <div className="company-name-row">
              <h1>{company.name}</h1>

              <span className="company-status-badge">
                <span />
                Active coverage
              </span>
            </div>

            <div className="company-meta-row">
              <span>NASDAQ: {company.ticker}</span>
              <span className="company-meta-divider" />
              <span>{company.overview.industry}</span>
              <span className="company-meta-divider" />
              <span>United States</span>
            </div>
          </div>
        </div>

        <div className="company-hero-actions">
          <button type="button" className="company-secondary-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Add to watchlist
          </button>

          <button type="button" className="company-primary-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 19V9" />
              <path d="M10 19V5" />
              <path d="M16 19v-7" />
              <path d="M22 19V3" />
            </svg>
            Run analysis
          </button>
        </div>
      </section>

      <section className="company-overview-grid">
        <div className="company-score-card">
          <div className="company-score-header">
            <div>
              <span>JadeStar Financial Score</span>
              <h2>{company.overview.financialScore}</h2>
            </div>

            <div className="company-score-ring">
              <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle className="score-ring-background" cx="32" cy="32" r="27" />
                <circle className="score-ring-progress" cx="32" cy="32" r="27" />
              </svg>

              <span>A</span>
            </div>
          </div>

          <div className="company-score-footer">
            <div>
              <span className="score-positive-dot" />
              <span>Strong financial position</span>
            </div>

            <strong>Top 18%</strong>
          </div>
        </div>

        <div className="company-summary-card">
          <span className="company-card-label">Revenue</span>
          <strong>{company.financials.revenue}</strong>
          <p>Annual reported revenue</p>

          <div className="company-card-trend positive">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 15 5-5 4 4 5-6" />
              <path d="M15 8h4v4" />
            </svg>
            Positive annual movement
          </div>
        </div>

        <div className="company-summary-card">
          <span className="company-card-label">Net Income</span>
          <strong>{company.financials.netIncome}</strong>
          <p>Reported net earnings</p>

          <div className="company-card-trend positive">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 15 5-5 4 4 5-6" />
              <path d="M15 8h4v4" />
            </svg>
            Profitable operations
          </div>
        </div>

        <div className="company-summary-card">
          <span className="company-card-label">Profit Margin</span>
          <strong>{company.financials.profitMargin}</strong>
          <p>Net income efficiency</p>

          <div className="company-card-trend neutral">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
            </svg>
            Margin under review
          </div>
        </div>
      </section>

      <section className="company-main-grid">
        <div className="company-chart-panel">
          <div className="company-panel-heading">
            <div>
              <span>Performance Intelligence</span>
              <h2>Revenue Momentum</h2>
            </div>

            <button type="button" className="company-panel-menu">
              <span />
              <span />
              <span />
            </button>
          </div>

          <FinancialChart type="revenue" />
        </div>

        <aside className="company-ai-panel">
          <div className="company-ai-heading">
            <div className="company-ai-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
              </svg>
            </div>

            <div>
              <span>JadeStar AI</span>
              <h2>Company Insight</h2>
            </div>
          </div>

          <div className="company-ai-summary">
            <p>
              {company.name} demonstrates a strong operating profile supported
              by durable revenue generation and positive earnings. Liquidity
              remains an important monitoring area, while profitability and
              interest coverage provide meaningful financial resilience.
            </p>
          </div>

          <div className="company-ai-signals">
            <div>
              <span className="ai-signal-dot positive" />
              <div>
                <strong>Profitability signal</strong>
                <p>Positive earnings and operating income</p>
              </div>
            </div>

            <div>
              <span className="ai-signal-dot warning" />
              <div>
                <strong>Liquidity signal</strong>
                <p>Short-term coverage requires monitoring</p>
              </div>
            </div>

            <div>
              <span className="ai-signal-dot positive" />
              <div>
                <strong>Solvency signal</strong>
                <p>Debt obligations remain serviceable</p>
              </div>
            </div>
          </div>

          <button type="button" className="company-ai-button">
            Ask JadeStar about this company
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m14 7 5 5-5 5" />
            </svg>
          </button>
        </aside>
      </section>

      <section className="company-ratio-section">
        <div className="company-section-heading">
          <div>
            <span>Ratio Intelligence</span>
            <h2>Financial Position</h2>
          </div>

          <p>
            Key liquidity, profitability, and solvency measures derived from
            reported financial statements.
          </p>
        </div>

        <div className="company-ratio-grid">
          <article className="company-ratio-card">
            <div className="ratio-card-top">
              <div className="ratio-category-icon liquidity">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3v18" />
                  <path d="M5 8h14" />
                  <path d="M7 8 4 14h6L7 8Z" />
                  <path d="m17 8-3 6h6l-3-6Z" />
                </svg>
              </div>

              <div>
                <span>Liquidity</span>
                <h3>Short-Term Coverage</h3>
              </div>
            </div>

            <div className="ratio-metric-list">
              <MetricItem
                label="Current Ratio"
                value={company.liquidity.currentRatio}
              />

              <MetricItem
                label="Quick Ratio"
                value={company.liquidity.quickRatio}
              />
            </div>

            <div className="ratio-card-analysis warning">
              <span />
              Liquidity should be compared against industry peers.
            </div>
          </article>

          <article className="company-ratio-card">
            <div className="ratio-card-top">
              <div className="ratio-category-icon profitability">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 19V9" />
                  <path d="M10 19V5" />
                  <path d="M16 19v-7" />
                  <path d="M22 19V3" />
                </svg>
              </div>

              <div>
                <span>Profitability</span>
                <h3>Return Performance</h3>
              </div>
            </div>

            <div className="ratio-metric-list">
              <MetricItem
                label="Return on Assets"
                value={company.profitability.returnOnAssets}
                tone="positive"
              />

              <MetricItem
                label="Return on Equity"
                value={company.profitability.returnOnEquity}
                tone="positive"
              />
            </div>

            <div className="ratio-card-analysis positive">
              <span />
              Earnings indicate efficient asset and equity use.
            </div>
          </article>

          <article className="company-ratio-card">
            <div className="ratio-card-top">
              <div className="ratio-category-icon solvency">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20h16" />
                  <path d="M6 20V9" />
                  <path d="M12 20V4" />
                  <path d="M18 20v-7" />
                </svg>
              </div>

              <div>
                <span>Solvency</span>
                <h3>Long-Term Stability</h3>
              </div>
            </div>

            <div className="ratio-metric-list">
              <MetricItem
                label="Debt to Assets"
                value={company.solvency.debtToAssets}
              />

              <MetricItem
                label="Interest Coverage"
                value={company.solvency.interestCoverage}
                tone="positive"
              />
            </div>

            <div className="ratio-card-analysis positive">
              <span />
              Interest obligations appear adequately covered.
            </div>
          </article>
        </div>
      </section>

      <section className="company-bottom-grid">
        <article className="company-intelligence-panel strengths">
          <div className="company-panel-heading">
            <div>
              <span>Positive Indicators</span>
              <h2>Company Strengths</h2>
            </div>

            <span className="company-count-badge">
              {company.strengths.length}
            </span>
          </div>

          <IntelligenceList
            items={company.strengths}
            type="strength"
          />
        </article>

        <article className="company-intelligence-panel risks">
          <div className="company-panel-heading">
            <div>
              <span>Monitoring Required</span>
              <h2>Risk Assessment</h2>
            </div>

            <span className="company-count-badge warning">
              {company.risks.length}
            </span>
          </div>

          <IntelligenceList
            items={company.risks}
            type="risk"
          />
        </article>
      </section>

      <section className="company-filings-panel">
        <div className="company-panel-heading">
          <div>
            <span>Regulatory Intelligence</span>
            <h2>Recent SEC Filings</h2>
          </div>

          <button type="button" className="company-text-button">
            View all filings
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m14 7 5 5-5 5" />
            </svg>
          </button>
        </div>

        <div className="company-filing-table">
          <div className="company-filing-row table-heading">
            <span>Form</span>
            <span>Document</span>
            <span>Filed</span>
            <span>Status</span>
            <span />
          </div>

          <div className="company-filing-row">
            <span className="filing-form">10-K</span>

            <div>
              <strong>Annual Report</strong>
              <p>Audited financial statements and company disclosures</p>
            </div>

            <span>Latest fiscal year</span>

            <span className="filing-status">
              <span />
              Processed
            </span>

            <button type="button" aria-label="Open annual report">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m14 7 5 5-5 5" />
              </svg>
            </button>
          </div>

          <div className="company-filing-row">
            <span className="filing-form">10-Q</span>

            <div>
              <strong>Quarterly Report</strong>
              <p>Interim financial results and operating updates</p>
            </div>

            <span>Most recent quarter</span>

            <span className="filing-status">
              <span />
              Processed
            </span>

            <button type="button" aria-label="Open quarterly report">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m14 7 5 5-5 5" />
              </svg>
            </button>
          </div>

          <div className="company-filing-row">
            <span className="filing-form">8-K</span>

            <div>
              <strong>Current Report</strong>
              <p>Material company events and recent disclosures</p>
            </div>

            <span>Recent filing</span>

            <span className="filing-status pending">
              <span />
              Monitoring
            </span>

            <button type="button" aria-label="Open current report">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m14 7 5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}