import React, { useMemo, useState } from "react";
import FinancialChart from "../components/FinancialChart";
import Engine from "../engine";

const industrySignals = [
  {
    name: "Retail",
    companies: 18,
    change: 4.8,
    direction: "positive",
  },
  {
    name: "Manufacturing",
    companies: 24,
    change: 2.9,
    direction: "positive",
  },
  {
    name: "Food",
    companies: 15,
    change: 1.4,
    direction: "positive",
  },
  {
    name: "Services",
    companies: 21,
    change: -0.8,
    direction: "negative",
  },
];

const filingActivity = [
  {
    id: 1,
    company: "Costco",
    ticker: "COST",
    form: "10-K",
    title: "Annual financial report",
    date: "2 hours ago",
    status: "Analyzed",
  },
  {
    id: 2,
    company: "Walmart",
    ticker: "WMT",
    form: "10-Q",
    title: "Quarterly financial report",
    date: "Yesterday",
    status: "New",
  },
  {
    id: 3,
    company: "Target",
    ticker: "TGT",
    form: "8-K",
    title: "Material company event",
    date: "Jul 21",
    status: "Review",
  },
  {
    id: 4,
    company: "Kroger",
    ticker: "KR",
    form: "10-Q",
    title: "Quarterly financial report",
    date: "Jul 20",
    status: "Analyzed",
  },
];

const watchlistSignals = [
  {
    name: "Costco",
    ticker: "COST",
    score: 87,
    growth: 8.2,
    signal: "Strengthening",
  },
  {
    name: "Walmart",
    ticker: "WMT",
    score: 82,
    growth: 5.7,
    signal: "Stable",
  },
  {
    name: "Target",
    ticker: "TGT",
    score: 74,
    growth: -1.6,
    signal: "Weakening",
  },
  {
    name: "Kroger",
    ticker: "KR",
    score: 77,
    growth: 3.4,
    signal: "Stable",
  },
];

const comparisons = [
  {
    id: 1,
    title: "Big Box Retail",
    companies: "COST · WMT · TGT",
    updated: "12 minutes ago",
  },
  {
    id: 2,
    title: "Retail Margin Leaders",
    companies: "COST · WMT · KR",
    updated: "Yesterday",
  },
  {
    id: 3,
    title: "Liquidity Watch",
    companies: "TGT · KR · WMT",
    updated: "Jul 20",
  },
];

function getValue(company, keys, fallback) {
  for (const key of keys) {
    if (
      company &&
      company[key] !== undefined &&
      company[key] !== null &&
      company[key] !== ""
    ) {
      return company[key];
    }
  }

  return fallback;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </svg>
  );
}

export default function Dashboard() {
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0);
  const [briefingQuestion, setBriefingQuestion] = useState("");
  const [briefingSubmitted, setBriefingSubmitted] = useState(false);

  const companyList = Engine.getCompanies();
  const costcoTest = Engine.getCompany("COST");

  console.log("JadeStar company:", costcoTest);
  console.log("Calculated ratios:", costcoTest?.calculatedRatios);

  const company = useMemo(
    () => companyList[selectedCompanyIndex] || companyList[0],
    [companyList, selectedCompanyIndex]
  );

  const companyName = getValue(company, ["name", "companyName"], "Costco");
  const ticker = getValue(company, ["ticker", "symbol"], "COST");
  const industry = getValue(company, ["industry", "sector"], "Retail");

  const healthScore = getValue(
    company,
    ["healthScore", "score", "financialScore"],
    87
  );

  const revenue = getValue(
    company,
    ["revenue", "totalRevenue"],
    "$275.2B"
  );

  const netIncome = getValue(
    company,
    ["netIncome", "income"],
    "$8.1B"
  );

  const profitMargin = getValue(
    company,
    ["profitMargin", "margin"],
    "2.94%"
  );

  const currentRatio = getValue(
    company,
    ["currentRatio"],
    "1.01"
  );

  const quickRatio = getValue(
    company,
    ["quickRatio"],
    "0.48"
  );

  const debtToAssets = getValue(
    company,
    ["debtToAssets", "debtRatio"],
    "63.8%"
  );

  const interestCoverage = getValue(
    company,
    ["interestCoverage", "timesInterestEarned"],
    "70.2x"
  );

  const handleBriefingSubmit = (event) => {
    event.preventDefault();

    if (!briefingQuestion.trim()) {
      return;
    }

    setBriefingSubmitted(true);

    window.setTimeout(() => {
      setBriefingSubmitted(false);
      setBriefingQuestion("");
    }, 1200);
  };

  return (
    <div className="dashboard-command-center">
      <section className="dashboard-command-hero">
        <div className="dashboard-command-copy">
          <div className="dashboard-command-eyebrow">
            <span />
            Financial Intelligence Command Center
          </div>

          <h1>JadeStar Intelligence</h1>

          <p>
            Monitor company performance, industry movement, financial risk,
            and SEC filing activity from one research workspace.
          </p>

          <div className="dashboard-company-selector">
            {companyList.slice(0, 4).map((item, index) => {
              const itemName = getValue(
                item,
                ["name", "companyName"],
                `Company ${index + 1}`
              );

              const itemTicker = getValue(
                item,
                ["ticker", "symbol"],
                itemName.slice(0, 4).toUpperCase()
              );

              return (
                <button
                  type="button"
                  key={`${itemTicker}-${index}`}
                  className={
                    selectedCompanyIndex === index
                      ? "dashboard-company-chip active"
                      : "dashboard-company-chip"
                  }
                  onClick={() => setSelectedCompanyIndex(index)}
                >
                  <span>{itemTicker.slice(0, 2)}</span>

                  <div>
                    <strong>{itemName}</strong>
                    <small>{itemTicker}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="dashboard-health-score-card">
          <div className="dashboard-score-header">
            <div>
              <span>Financial Health</span>
              <strong>{companyName}</strong>
            </div>

            <span className="dashboard-live-badge">
              <i />
              Active
            </span>
          </div>

          <div className="dashboard-score-ring">
            <svg viewBox="0 0 140 140" aria-hidden="true">
              <circle
                cx="70"
                cy="70"
                r="56"
                className="dashboard-score-track"
              />

              <circle
                cx="70"
                cy="70"
                r="56"
                className="dashboard-score-progress"
                style={{
                  strokeDashoffset:
                    351.86 - (351.86 * Number(healthScore)) / 100,
                }}
              />
            </svg>

            <div>
              <strong>{healthScore}</strong>
              <span>/100</span>
            </div>
          </div>

          <div className="dashboard-score-footer">
            <div>
              <span>Classification</span>
              <strong>
                {healthScore >= 85
                  ? "Strong"
                  : healthScore >= 75
                  ? "Moderate"
                  : "Watch"}
              </strong>
            </div>

            <div>
              <span>Industry</span>
              <strong>{industry}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-metric-grid">
        <DashboardMetricCard
          label="Revenue"
          value={revenue}
          detail="Annual company revenue"
          change="+8.2%"
          type="positive"
        />

        <DashboardMetricCard
          label="Net Income"
          value={netIncome}
          detail="Annual profit generation"
          change="+9.9%"
          type="positive"
        />

        <DashboardMetricCard
          label="Profit Margin"
          value={profitMargin}
          detail="Net income efficiency"
          change="+0.04%"
          type="positive"
        />

        <DashboardMetricCard
          label="Risk Level"
          value="LOW"
          detail="Combined financial risk"
          change="Stable"
          type="positive"
        />
      </section>

      <section className="dashboard-primary-grid">
        <article className="dashboard-command-panel dashboard-revenue-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Financial Performance</span>
              <h2>Revenue Trend</h2>
            </div>

            <div className="dashboard-panel-periods">
              <button type="button">1Y</button>
              <button type="button">3Y</button>
              <button type="button" className="active">
                5Y
              </button>
            </div>
          </div>

          <div className="dashboard-chart-summary">
            <div>
              <span>Current Revenue</span>
              <strong>{revenue}</strong>
            </div>

            <div>
              <span>Five-Year Direction</span>
              <strong className="positive">Strengthening</strong>
            </div>

            <div>
              <span>Peer Position</span>
              <strong>Top Quartile</strong>
            </div>
          </div>

          <FinancialChart type="revenue" />
        </article>

        <article className="dashboard-command-panel dashboard-profit-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Earnings Intelligence</span>
              <h2>Profitability Analysis</h2>
            </div>

            <span className="dashboard-analysis-badge">
              AI monitored
            </span>
          </div>

          <div className="dashboard-profit-summary">
            <div>
              <span>Margin</span>
              <strong>{profitMargin}</strong>
            </div>

            <div>
              <span>Net Income</span>
              <strong>{netIncome}</strong>
            </div>
          </div>

          <FinancialChart type="profit" />
        </article>
      </section>

      <section className="dashboard-intelligence-grid">
        <article className="dashboard-command-panel dashboard-ratios-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Ratio Intelligence</span>
              <h2>Financial Health Indicators</h2>
            </div>

            <button type="button" className="dashboard-text-button">
              View complete analysis
              <ArrowIcon />
            </button>
          </div>

          <div className="dashboard-ratio-grid">
            <RatioCard
              name="Current Ratio"
              value={currentRatio}
              benchmark="1.00 benchmark"
              status="Stable"
              percentage={72}
            />

            <RatioCard
              name="Quick Ratio"
              value={quickRatio}
              benchmark="Liquidity coverage"
              status="Watch"
              percentage={48}
            />

            <RatioCard
              name="Debt to Assets"
              value={debtToAssets}
              benchmark="Total asset leverage"
              status="Moderate"
              percentage={64}
            />

            <RatioCard
              name="Interest Coverage"
              value={interestCoverage}
              benchmark="Financing protection"
              status="Strong"
              percentage={92}
            />
          </div>
        </article>

        <article className="dashboard-command-panel dashboard-ai-briefing">
          <div className="dashboard-ai-heading">
            <div className="dashboard-ai-mark">
              <SparkIcon />
            </div>

            <div>
              <span>JadeStar AI Analyst</span>
              <h2>Morning Financial Briefing</h2>
            </div>

            <span className="dashboard-ai-status">
              <i />
              Online
            </span>
          </div>

          <div className="dashboard-ai-summary">
            <span>Current intelligence</span>

            <p>
              {companyName} shows a strong financial profile supported by
              positive revenue growth, improving profitability, and substantial
              interest coverage.
            </p>
          </div>

          <div className="dashboard-ai-signal-list">
            <div>
              <span className="positive">01</span>
              <p>Revenue and net income are moving in the same direction.</p>
            </div>

            <div>
              <span>02</span>
              <p>
                Liquidity remains near the minimum short-term coverage level.
              </p>
            </div>

            <div>
              <span className="positive">03</span>
              <p>
                Interest coverage provides strong protection against financing
                costs.
              </p>
            </div>
          </div>

          <form
            className="dashboard-ai-question"
            onSubmit={handleBriefingSubmit}
          >
            <input
              value={briefingQuestion}
              onChange={(event) =>
                setBriefingQuestion(event.target.value)
              }
              placeholder={`Ask why ${companyName}'s performance changed...`}
            />

            <button
              type="submit"
              disabled={!briefingQuestion.trim() || briefingSubmitted}
            >
              {briefingSubmitted ? (
                <span className="dashboard-question-loader" />
              ) : (
                <ArrowIcon />
              )}
            </button>
          </form>
        </article>
      </section>

      <section className="dashboard-market-grid">
        <article className="dashboard-command-panel dashboard-watchlist-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Company Watchlist</span>
              <h2>Performance Signals</h2>
            </div>

            <span className="dashboard-panel-count">
              {watchlistSignals.length} companies
            </span>
          </div>

          <div className="dashboard-watchlist-table">
            <div className="dashboard-watchlist-row heading">
              <span>Company</span>
              <span>Score</span>
              <span>Growth</span>
              <span>Signal</span>
            </div>

            {watchlistSignals.map((item) => (
              <div
                className="dashboard-watchlist-row"
                key={item.ticker}
              >
                <div className="dashboard-watchlist-company">
                  <span>{item.ticker.slice(0, 2)}</span>

                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.ticker}</small>
                  </div>
                </div>

                <strong>{item.score}</strong>

                <span
                  className={
                    item.growth >= 0 ? "positive" : "negative"
                  }
                >
                  {item.growth >= 0 ? "+" : ""}
                  {item.growth}%
                </span>

                <span
                  className={`dashboard-signal-badge ${item.signal.toLowerCase()}`}
                >
                  <i />
                  {item.signal}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-command-panel dashboard-industry-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Market Intelligence</span>
              <h2>Industry Movement</h2>
            </div>

            <button type="button" className="dashboard-text-button">
              Explore industries
              <ArrowIcon />
            </button>
          </div>

          <div className="dashboard-industry-list">
            {industrySignals.map((item) => (
              <div key={item.name}>
                <div className="dashboard-industry-top">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.companies} companies tracked</span>
                  </div>

                  <strong
                    className={
                      item.direction === "positive"
                        ? "positive"
                        : "negative"
                    }
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change}%
                  </strong>
                </div>

                <div className="dashboard-industry-track">
                  <span
                    style={{
                      width: `${Math.max(
                        16,
                        Math.min(100, Math.abs(item.change) * 13)
                      )}%`,
                    }}
                    className={
                      item.direction === "positive"
                        ? "positive"
                        : "negative"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-bottom-grid">
        <article className="dashboard-command-panel dashboard-filings-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Regulatory Intelligence</span>
              <h2>Recent SEC Filing Activity</h2>
            </div>

            <button type="button" className="dashboard-text-button">
              View filing center
              <ArrowIcon />
            </button>
          </div>

          <div className="dashboard-filings-list">
            {filingActivity.map((filing) => (
              <div key={filing.id}>
                <span className="dashboard-filing-form">
                  {filing.form}
                </span>

                <div className="dashboard-filing-details">
                  <strong>{filing.company}</strong>
                  <p>{filing.title}</p>
                  <small>
                    {filing.ticker} · {filing.date}
                  </small>
                </div>

                <span
                  className={`dashboard-filing-status ${filing.status.toLowerCase()}`}
                >
                  {filing.status}
                </span>

                <button type="button" aria-label={`Open ${filing.form}`}>
                  <ArrowIcon />
                </button>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-command-panel dashboard-comparisons-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Saved Research</span>
              <h2>Comparison Workspaces</h2>
            </div>

            <button type="button" className="dashboard-add-button">
              +
            </button>
          </div>

          <div className="dashboard-comparison-list">
            {comparisons.map((comparison) => (
              <button type="button" key={comparison.id}>
                <span className="dashboard-comparison-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 19V9" />
                    <path d="M12 19V5" />
                    <path d="M19 19v-7" />
                  </svg>
                </span>

                <span>
                  <strong>{comparison.title}</strong>
                  <small>{comparison.companies}</small>
                  <small>Updated {comparison.updated}</small>
                </span>

                <ArrowIcon />
              </button>
            ))}
          </div>

          <button type="button" className="dashboard-new-comparison">
            Start new comparison
            <ArrowIcon />
          </button>
        </article>

        <article className="dashboard-command-panel dashboard-actions-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span>Research Tools</span>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="dashboard-action-list">
            <QuickAction
              icon={<SparkIcon />}
              title="Ask AI Analyst"
              description="Investigate a company or financial trend."
            />

            <QuickAction
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 19V9" />
                  <path d="M12 19V5" />
                  <path d="M19 19v-7" />
                </svg>
              }
              title="Compare Companies"
              description="Build a side-by-side financial comparison."
            />

            <QuickAction
              icon={<FileIcon />}
              title="Generate Report"
              description="Create a professional financial report."
            />
          </div>
        </article>
      </section>
    </div>
  );
}

function DashboardMetricCard({
  label,
  value,
  detail,
  change,
  type,
}) {
  return (
    <article className="dashboard-metric-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <p>{detail}</p>
      </div>

      <span className={`dashboard-metric-change ${type}`}>
        {change}
      </span>

      <div className="dashboard-metric-sparkline">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

function RatioCard({
  name,
  value,
  benchmark,
  status,
  percentage,
}) {
  return (
    <article className="dashboard-ratio-card">
      <div className="dashboard-ratio-heading">
        <span>{name}</span>

        <span
          className={`dashboard-ratio-status ${status.toLowerCase()}`}
        >
          {status}
        </span>
      </div>

      <strong>{value}</strong>
      <p>{benchmark}</p>

      <div className="dashboard-ratio-track">
        <span style={{ width: `${percentage}%` }} />
      </div>
    </article>
  );
}

function QuickAction({ icon, title, description }) {
  return (
    <button type="button" className="dashboard-quick-action">
      <span>{icon}</span>

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <ArrowIcon />
    </button>
  );
}