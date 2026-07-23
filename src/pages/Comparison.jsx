import React, { useMemo, useState } from "react";

const companyData = [
  {
    id: "costco",
    name: "Costco",
    ticker: "COST",
    growth: 8.2,
    margin: 2.94,
    liquidity: 1.01,
    debtToAssets: 63.8,
    interestCoverage: 70.2,
    score: 87,
    revenue: "$275.2B",
    netIncome: "$8.1B",
    trend: "Strong",
  },
  {
    id: "walmart",
    name: "Walmart",
    ticker: "WMT",
    growth: 5.1,
    margin: 3.2,
    liquidity: 0.82,
    debtToAssets: 66.1,
    interestCoverage: 12.4,
    score: 82,
    revenue: "$681.0B",
    netIncome: "$21.3B",
    trend: "Stable",
  },
  {
    id: "target",
    name: "Target",
    ticker: "TGT",
    growth: -2.4,
    margin: 2.1,
    liquidity: 0.99,
    debtToAssets: 72.4,
    interestCoverage: 6.8,
    score: 74,
    revenue: "$106.6B",
    netIncome: "$2.3B",
    trend: "Weakening",
  },
];

const comparisonMetrics = [
  {
    key: "growth",
    label: "Revenue Growth",
    format: (value) => `${value > 0 ? "+" : ""}${value.toFixed(1)}%`,
    higherIsBetter: true,
  },
  {
    key: "margin",
    label: "Profit Margin",
    format: (value) => `${value.toFixed(2)}%`,
    higherIsBetter: true,
  },
  {
    key: "liquidity",
    label: "Current Ratio",
    format: (value) => value.toFixed(2),
    higherIsBetter: true,
  },
  {
    key: "debtToAssets",
    label: "Debt to Assets",
    format: (value) => `${value.toFixed(1)}%`,
    higherIsBetter: false,
  },
  {
    key: "interestCoverage",
    label: "Interest Coverage",
    format: (value) => `${value.toFixed(1)}x`,
    higherIsBetter: true,
  },
  {
    key: "score",
    label: "JadeStar Score",
    format: (value) => `${value}/100`,
    higherIsBetter: true,
  },
];

function getMetricWinner(companies, metric) {
  if (!companies.length) {
    return null;
  }

  return [...companies].sort((companyA, companyB) => {
    if (metric.higherIsBetter) {
      return companyB[metric.key] - companyA[metric.key];
    }

    return companyA[metric.key] - companyB[metric.key];
  })[0];
}

function TrendIcon({ direction = "positive" }) {
  if (direction === "negative") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 9 5 5 4-4 5 6" />
        <path d="M15 16h4v-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 15 5-5 4 4 5-6" />
      <path d="M15 8h4v4" />
    </svg>
  );
}

export default function Comparison() {
  const [selectedIds, setSelectedIds] = useState([
    "costco",
    "walmart",
    "target",
  ]);

  const [activeMetric, setActiveMetric] = useState("score");

  const selectedCompanies = useMemo(
    () =>
      selectedIds
        .map((id) => companyData.find((company) => company.id === id))
        .filter(Boolean),
    [selectedIds]
  );

  const rankedCompanies = useMemo(
    () => [...selectedCompanies].sort((a, b) => b.score - a.score),
    [selectedCompanies]
  );

  const selectedMetric =
    comparisonMetrics.find((metric) => metric.key === activeMetric) ||
    comparisonMetrics[0];

  const metricWinner = getMetricWinner(selectedCompanies, selectedMetric);

  const toggleCompany = (companyId) => {
    setSelectedIds((currentIds) => {
      if (currentIds.includes(companyId)) {
        if (currentIds.length === 1) {
          return currentIds;
        }

        return currentIds.filter((id) => id !== companyId);
      }

      return [...currentIds, companyId];
    });
  };

  return (
    <div className="comparison-page">
      <section className="comparison-hero">
        <div>
          <div className="comparison-eyebrow">
            <span />
            Competitive Intelligence
          </div>

          <h1>JadeStar Comparison Engine</h1>

          <p>
            Compare growth, profitability, liquidity, solvency, and overall
            financial strength across selected companies.
          </p>
        </div>

        <div className="comparison-hero-actions">
          <button type="button" className="comparison-secondary-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Save comparison
          </button>

          <button type="button" className="comparison-primary-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h16" />
              <path d="M7 16V9" />
              <path d="M12 16V4" />
              <path d="M17 16v-5" />
            </svg>
            Generate report
          </button>
        </div>
      </section>

      <section className="comparison-selector-panel">
        <div className="comparison-panel-heading">
          <div>
            <span>Company Selection</span>
            <h2>Choose Companies to Compare</h2>
          </div>

          <span className="comparison-selection-count">
            {selectedCompanies.length} selected
          </span>
        </div>

        <div className="comparison-company-selector">
          {companyData.map((company) => {
            const isSelected = selectedIds.includes(company.id);

            return (
              <button
                type="button"
                key={company.id}
                className={
                  isSelected
                    ? "comparison-company-option active"
                    : "comparison-company-option"
                }
                onClick={() => toggleCompany(company.id)}
              >
                <span className="comparison-company-logo">
                  {company.ticker.slice(0, 2)}
                </span>

                <span className="comparison-company-option-info">
                  <strong>{company.name}</strong>
                  <small>{company.ticker}</small>
                </span>

                <span className="comparison-company-check">
                  {isSelected ? "✓" : "+"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="comparison-summary-grid">
        {selectedCompanies.map((company, index) => (
          <article className="comparison-company-card" key={company.id}>
            <div className="comparison-card-header">
              <div className="comparison-card-company">
                <span>{company.ticker.slice(0, 2)}</span>

                <div>
                  <strong>{company.name}</strong>
                  <small>{company.ticker} · Retail</small>
                </div>
              </div>

              <span className="comparison-card-rank">
                #{rankedCompanies.findIndex((item) => item.id === company.id) + 1}
              </span>
            </div>

            <div className="comparison-score-block">
              <div>
                <span>JadeStar Score</span>
                <strong>{company.score}</strong>
              </div>

              <div className="comparison-score-ring">
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  <circle cx="32" cy="32" r="27" />
                  <circle
                    className="comparison-score-progress"
                    cx="32"
                    cy="32"
                    r="27"
                    style={{
                      strokeDashoffset:
                        169.65 - 169.65 * (company.score / 100),
                    }}
                  />
                </svg>

                <span>{company.score >= 85 ? "A" : company.score >= 75 ? "B" : "C"}</span>
              </div>
            </div>

            <div className="comparison-card-metrics">
              <div>
                <span>Revenue</span>
                <strong>{company.revenue}</strong>
              </div>

              <div>
                <span>Net Income</span>
                <strong>{company.netIncome}</strong>
              </div>

              <div>
                <span>Growth</span>
                <strong
                  className={
                    company.growth >= 0
                      ? "comparison-positive-value"
                      : "comparison-negative-value"
                  }
                >
                  {company.growth > 0 ? "+" : ""}
                  {company.growth.toFixed(1)}%
                </strong>
              </div>

              <div>
                <span>Margin</span>
                <strong>{company.margin.toFixed(2)}%</strong>
              </div>
            </div>

            <div
              className={`comparison-card-signal ${
                company.growth >= 0 ? "positive" : "negative"
              }`}
            >
              <TrendIcon
                direction={company.growth >= 0 ? "positive" : "negative"}
              />

              <span>{company.trend} financial momentum</span>
            </div>
          </article>
        ))}
      </section>

      <section className="comparison-main-grid">
        <article className="comparison-performance-panel">
          <div className="comparison-panel-heading">
            <div>
              <span>Metric Analysis</span>
              <h2>Performance Comparison</h2>
            </div>

            <div className="comparison-metric-tabs">
              {comparisonMetrics.map((metric) => (
                <button
                  type="button"
                  key={metric.key}
                  className={
                    activeMetric === metric.key
                      ? "comparison-metric-tab active"
                      : "comparison-metric-tab"
                  }
                  onClick={() => setActiveMetric(metric.key)}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>

          <div className="comparison-chart-summary">
            <div>
              <span>Current Leader</span>
              <strong>{metricWinner?.name}</strong>
            </div>

            <div>
              <span>Leading Value</span>
              <strong>
                {metricWinner
                  ? selectedMetric.format(metricWinner[selectedMetric.key])
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Metric</span>
              <strong>{selectedMetric.label}</strong>
            </div>
          </div>

          <div className="comparison-performance-chart">
            {selectedCompanies.map((company) => {
              const metricValues = selectedCompanies.map(
                (item) => item[selectedMetric.key]
              );

              const highestValue = Math.max(...metricValues);
              const lowestValue = Math.min(...metricValues);
              const range = highestValue - lowestValue || 1;

              const rawWidth = selectedMetric.higherIsBetter
                ? ((company[selectedMetric.key] - lowestValue) / range) * 70 + 30
                : ((highestValue - company[selectedMetric.key]) / range) * 70 +
                  30;

              const isWinner = metricWinner?.id === company.id;

              return (
                <div className="comparison-performance-row" key={company.id}>
                  <div className="comparison-performance-company">
                    <span>{company.ticker.slice(0, 2)}</span>

                    <div>
                      <strong>{company.name}</strong>
                      <small>{company.ticker}</small>
                    </div>
                  </div>

                  <div className="comparison-performance-track">
                    <span
                      className={isWinner ? "winner" : ""}
                      style={{ width: `${rawWidth}%` }}
                    />

                    <i />
                  </div>

                  <strong
                    className={
                      isWinner ? "comparison-winning-value" : ""
                    }
                  >
                    {selectedMetric.format(company[selectedMetric.key])}
                  </strong>

                  <span
                    className={
                      isWinner
                        ? "comparison-winner-badge visible"
                        : "comparison-winner-badge"
                    }
                  >
                    Best
                  </span>
                </div>
              );
            })}
          </div>
        </article>

        <aside className="comparison-ai-panel">
          <div className="comparison-ai-heading">
            <div className="comparison-ai-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
              </svg>
            </div>

            <div>
              <span>JadeStar AI</span>
              <h2>Comparison Insight</h2>
            </div>
          </div>

          <div className="comparison-ai-summary">
            <p>
              <strong>{rankedCompanies[0]?.name}</strong> currently holds the
              strongest overall JadeStar score. Its advantage is supported by
              stronger growth and financial coverage, while{" "}
              <strong>{rankedCompanies[rankedCompanies.length - 1]?.name}</strong>{" "}
              shows the greatest need for monitoring.
            </p>
          </div>

          <div className="comparison-ai-findings">
            <div>
              <span className="comparison-finding-icon positive">✓</span>

              <div>
                <strong>Overall leader</strong>
                <p>
                  {rankedCompanies[0]?.name} ranks first with a score of{" "}
                  {rankedCompanies[0]?.score}/100.
                </p>
              </div>
            </div>

            <div>
              <span className="comparison-finding-icon warning">!</span>

              <div>
                <strong>Liquidity signal</strong>
                <p>
                  Current ratios near or below 1.00 indicate limited short-term
                  coverage.
                </p>
              </div>
            </div>

            <div>
              <span className="comparison-finding-icon positive">✓</span>

              <div>
                <strong>Growth advantage</strong>
                <p>
                  Positive revenue expansion separates the strongest performers
                  from weakening companies.
                </p>
              </div>
            </div>
          </div>

          <button type="button" className="comparison-ai-button">
            Ask JadeStar to explain the ranking

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m14 7 5 5-5 5" />
            </svg>
          </button>
        </aside>
      </section>

      <section className="comparison-matrix-panel">
        <div className="comparison-panel-heading">
          <div>
            <span>Side-by-Side Analysis</span>
            <h2>Financial Comparison Matrix</h2>
          </div>

          <button type="button" className="comparison-export-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Export data
          </button>
        </div>

        <div className="comparison-matrix-table">
          <div
            className="comparison-matrix-row heading"
            style={{
              gridTemplateColumns: `190px repeat(${selectedCompanies.length}, minmax(145px, 1fr))`,
            }}
          >
            <span>Metric</span>

            {selectedCompanies.map((company) => (
              <span key={company.id}>{company.name}</span>
            ))}
          </div>

          {comparisonMetrics.map((metric) => {
            const winner = getMetricWinner(selectedCompanies, metric);

            return (
              <div
                className="comparison-matrix-row"
                key={metric.key}
                style={{
                  gridTemplateColumns: `190px repeat(${selectedCompanies.length}, minmax(145px, 1fr))`,
                }}
              >
                <div className="comparison-matrix-label">
                  <strong>{metric.label}</strong>
                  <small>
                    {metric.higherIsBetter
                      ? "Higher is stronger"
                      : "Lower is stronger"}
                  </small>
                </div>

                {selectedCompanies.map((company) => (
                  <div
                    className={
                      winner?.id === company.id
                        ? "comparison-matrix-value winner"
                        : "comparison-matrix-value"
                    }
                    key={company.id}
                  >
                    <strong>{metric.format(company[metric.key])}</strong>

                    {winner?.id === company.id && <span>Leader</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <section className="comparison-ranking-panel">
        <div className="comparison-panel-heading">
          <div>
            <span>Overall Evaluation</span>
            <h2>JadeStar Ranking</h2>
          </div>

          <span className="comparison-ranking-status">
            Updated from selected companies
          </span>
        </div>

        <div className="comparison-ranking-list">
          {rankedCompanies.map((company, index) => (
            <div className="comparison-ranking-row" key={company.id}>
              <div className={`comparison-rank-medal rank-${index + 1}`}>
                {index + 1}
              </div>

              <div className="comparison-ranked-company">
                <span>{company.ticker.slice(0, 2)}</span>

                <div>
                  <strong>{company.name}</strong>
                  <small>{company.ticker} · Retail sector</small>
                </div>
              </div>

              <div className="comparison-ranking-metrics">
                <div>
                  <span>Growth</span>
                  <strong
                    className={
                      company.growth >= 0
                        ? "comparison-positive-value"
                        : "comparison-negative-value"
                    }
                  >
                    {company.growth > 0 ? "+" : ""}
                    {company.growth.toFixed(1)}%
                  </strong>
                </div>

                <div>
                  <span>Margin</span>
                  <strong>{company.margin.toFixed(2)}%</strong>
                </div>

                <div>
                  <span>Liquidity</span>
                  <strong>{company.liquidity.toFixed(2)}</strong>
                </div>
              </div>

              <div className="comparison-ranking-score">
                <div>
                  <span
                    style={{ width: `${company.score}%` }}
                  />
                </div>

                <strong>{company.score}/100</strong>
              </div>

              <span
                className={`comparison-ranking-grade ${
                  company.score >= 85
                    ? "strong"
                    : company.score >= 75
                    ? "moderate"
                    : "watch"
                }`}
              >
                {company.score >= 85
                  ? "Strong"
                  : company.score >= 75
                  ? "Moderate"
                  : "Watch"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}