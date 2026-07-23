import React, { useMemo, useState } from "react";
import industries from "../data/industries";

function getNumericValue(value) {
  if (typeof value === "number") {
    return value;
  }

  const parsedValue = parseFloat(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

function getTrendType(trend, growth) {
  const trendText = String(trend || "").toLowerCase();
  const growthValue = getNumericValue(growth);

  if (
    trendText.includes("down") ||
    trendText.includes("decline") ||
    trendText.includes("negative") ||
    growthValue < 0
  ) {
    return "negative";
  }

  if (
    trendText.includes("stable") ||
    trendText.includes("flat") ||
    trendText.includes("neutral")
  ) {
    return "neutral";
  }

  return "positive";
}

function TrendIcon({ type }) {
  if (type === "negative") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 9 5 5 4-4 5 6" />
        <path d="M15 16h4v-4" />
      </svg>
    );
  }

  if (type === "neutral") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12h14" />
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

export default function Industry() {
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const activeIndustry = industries[activeIndustryIndex] || industries[0];

  const rankedCompanies = useMemo(() => {
    if (!activeIndustry?.companies) {
      return [];
    }

    return [...activeIndustry.companies]
      .filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort(
        (companyA, companyB) =>
          getNumericValue(companyB.growth) -
          getNumericValue(companyA.growth)
      );
  }, [activeIndustry, searchTerm]);

  const industryMetrics = useMemo(() => {
    const companies = activeIndustry?.companies || [];

    if (!companies.length) {
      return {
        averageGrowth: 0,
        averageMargin: 0,
        positiveCompanies: 0,
        leader: null,
      };
    }

    const totalGrowth = companies.reduce(
      (total, company) => total + getNumericValue(company.growth),
      0
    );

    const totalMargin = companies.reduce(
      (total, company) => total + getNumericValue(company.margin),
      0
    );

    const positiveCompanies = companies.filter(
      (company) =>
        getTrendType(company.trend, company.growth) === "positive"
    ).length;

    const leader = [...companies].sort(
      (companyA, companyB) =>
        getNumericValue(companyB.growth) -
        getNumericValue(companyA.growth)
    )[0];

    return {
      averageGrowth: totalGrowth / companies.length,
      averageMargin: totalMargin / companies.length,
      positiveCompanies,
      leader,
    };
  }, [activeIndustry]);

  if (!activeIndustry) {
    return (
      <div className="industry-page">
        <div className="industry-empty-state">
          <h1>No industry data available</h1>
          <p>Add industry information to your industries data file.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="industry-page">
      <section className="industry-hero">
        <div>
          <div className="industry-eyebrow">
            <span />
            Market Intelligence
          </div>

          <h1>Industry Intelligence</h1>

          <p>
            Compare company growth, profitability, momentum, and risk across
            major market sectors.
          </p>
        </div>

        <div className="industry-hero-status">
          <span className="industry-live-dot" />

          <div>
            <strong>Sector data active</strong>
            <p>{industries.length} industries monitored</p>
          </div>
        </div>
      </section>

      <section className="industry-selector-panel">
        <div className="industry-selector-heading">
          <div>
            <span>Market Coverage</span>
            <h2>Select an Industry</h2>
          </div>

          <span className="industry-coverage-count">
            {industries.length} sectors
          </span>
        </div>

        <div className="industry-tabs">
          {industries.map((industry, index) => (
            <button
              type="button"
              key={industry.name}
              className={
                activeIndustryIndex === index
                  ? "industry-tab active"
                  : "industry-tab"
              }
              onClick={() => {
                setActiveIndustryIndex(index);
                setSearchTerm("");
              }}
            >
              <span className="industry-tab-icon">
                {industry.name.slice(0, 2).toUpperCase()}
              </span>

              <span>
                <strong>{industry.name}</strong>
                <small>{industry.companies.length} companies</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="industry-profile-panel">
        <div className="industry-profile-main">
          <div className="industry-profile-icon">
            {activeIndustry.name.slice(0, 2).toUpperCase()}
          </div>

          <div>
            <span className="industry-section-label">
              Active Industry
            </span>

            <h2>{activeIndustry.name}</h2>

            <p>{activeIndustry.description}</p>
          </div>
        </div>

        <button type="button" className="industry-report-button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 20h16" />
            <path d="M6 16V9" />
            <path d="M12 16V4" />
            <path d="M18 16v-5" />
          </svg>

          Generate sector report
        </button>
      </section>

      <section className="industry-metric-grid">
        <article className="industry-metric-card">
          <div className="industry-metric-top">
            <span>Average Growth</span>

            <div className="industry-metric-icon positive">
              <TrendIcon
                type={
                  industryMetrics.averageGrowth >= 0
                    ? "positive"
                    : "negative"
                }
              />
            </div>
          </div>

          <strong>
            {industryMetrics.averageGrowth >= 0 ? "+" : ""}
            {industryMetrics.averageGrowth.toFixed(1)}%
          </strong>

          <p>Average company growth in this sector</p>

          <div
            className={`industry-metric-signal ${
              industryMetrics.averageGrowth >= 0
                ? "positive"
                : "negative"
            }`}
          >
            <span />
            {industryMetrics.averageGrowth >= 0
              ? "Positive sector momentum"
              : "Sector contraction detected"}
          </div>
        </article>

        <article className="industry-metric-card">
          <div className="industry-metric-top">
            <span>Average Margin</span>

            <div className="industry-metric-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 19V9" />
                <path d="M12 19V5" />
                <path d="M19 19v-7" />
              </svg>
            </div>
          </div>

          <strong>{industryMetrics.averageMargin.toFixed(1)}%</strong>

          <p>Average profitability across companies</p>

          <div className="industry-metric-signal neutral">
            <span />
            Profitability benchmark
          </div>
        </article>

        <article className="industry-metric-card">
          <div className="industry-metric-top">
            <span>Positive Companies</span>

            <div className="industry-metric-icon positive">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>
          </div>

          <strong>
            {industryMetrics.positiveCompanies}/
            {activeIndustry.companies.length}
          </strong>

          <p>Companies showing positive momentum</p>

          <div className="industry-metric-signal positive">
            <span />
            Performance participation
          </div>
        </article>

        <article className="industry-metric-card leader">
          <div className="industry-metric-top">
            <span>Industry Leader</span>

            <div className="industry-metric-icon leader">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
                <path d="M12 13v5" />
                <path d="M8 21h8" />
                <path d="M8 6H4v2a4 4 0 0 0 4 4" />
                <path d="M16 6h4v2a4 4 0 0 1-4 4" />
              </svg>
            </div>
          </div>

          <strong className="industry-leader-name">
            {industryMetrics.leader?.name || "Not available"}
          </strong>

          <p>
            {industryMetrics.leader
              ? `${industryMetrics.leader.growth} growth`
              : "No company information"}
          </p>

          <div className="industry-metric-signal leader">
            <span />
            Highest growth performance
          </div>
        </article>
      </section>

      <section className="industry-main-grid">
        <article className="industry-momentum-panel">
          <div className="industry-panel-heading">
            <div>
              <span>Sector Performance</span>
              <h2>Company Momentum</h2>
            </div>

            <div className="industry-chart-legend">
              <span>
                <i className="positive" />
                Growth
              </span>

              <span>
                <i className="margin" />
                Margin
              </span>
            </div>
          </div>

          <div className="industry-bar-chart">
            {activeIndustry.companies.map((company) => {
              const growthValue = getNumericValue(company.growth);
              const marginValue = getNumericValue(company.margin);

              const growthWidth = Math.min(
                Math.max(Math.abs(growthValue) * 5, 8),
                100
              );

              const marginWidth = Math.min(
                Math.max(Math.abs(marginValue) * 4, 8),
                100
              );

              return (
                <div className="industry-chart-row" key={company.name}>
                  <div className="industry-chart-company">
                    <span>
                      {company.name.slice(0, 2).toUpperCase()}
                    </span>

                    <strong>{company.name}</strong>
                  </div>

                  <div className="industry-chart-bars">
                    <div>
                      <span
                        className={`industry-growth-bar ${
                          growthValue < 0 ? "negative" : ""
                        }`}
                        style={{ width: `${growthWidth}%` }}
                      />

                      <strong>{company.growth}</strong>
                    </div>

                    <div>
                      <span
                        className="industry-margin-bar"
                        style={{ width: `${marginWidth}%` }}
                      />

                      <strong>{company.margin}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <aside className="industry-ai-panel">
          <div className="industry-ai-heading">
            <div className="industry-ai-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
              </svg>
            </div>

            <div>
              <span>JadeStar AI</span>
              <h2>Industry Insight</h2>
            </div>
          </div>

          <div className="industry-ai-summary">
            <p>
              The {activeIndustry.name} sector currently shows an average
              growth rate of{" "}
              <strong>
                {industryMetrics.averageGrowth.toFixed(1)}%
              </strong>
              .{" "}
              {industryMetrics.leader?.name || "The leading company"} is
              producing the strongest growth performance among the companies
              currently tracked.
            </p>
          </div>

          <div className="industry-ai-insights">
            <div>
              <span className="industry-insight-number">01</span>

              <div>
                <strong>Growth concentration</strong>
                <p>
                  Compare the sector leader with slower companies to identify
                  the drivers behind performance differences.
                </p>
              </div>
            </div>

            <div>
              <span className="industry-insight-number">02</span>

              <div>
                <strong>Margin quality</strong>
                <p>
                  Growth should be evaluated alongside margins to determine
                  whether expansion is producing stronger earnings.
                </p>
              </div>
            </div>

            <div>
              <span className="industry-insight-number">03</span>

              <div>
                <strong>Risk monitoring</strong>
                <p>
                  Negative growth or shrinking margins may indicate company or
                  industry-specific pressure.
                </p>
              </div>
            </div>
          </div>

          <button type="button" className="industry-ai-button">
            Ask JadeStar about this industry

            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m14 7 5 5-5 5" />
            </svg>
          </button>
        </aside>
      </section>

      <section className="industry-ranking-panel">
        <div className="industry-panel-heading ranking-heading">
          <div>
            <span>Company Comparison</span>
            <h2>{activeIndustry.name} Rankings</h2>
          </div>

          <div className="industry-company-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="search"
              value={searchTerm}
              placeholder="Search companies..."
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="industry-ranking-table">
          <div className="industry-ranking-row heading">
            <span>Rank</span>
            <span>Company</span>
            <span>Growth</span>
            <span>Margin</span>
            <span>Trend</span>
            <span>Performance</span>
            <span />
          </div>

          {rankedCompanies.map((company, index) => {
            const trendType = getTrendType(
              company.trend,
              company.growth
            );

            const performanceValue = Math.min(
              Math.max(
                getNumericValue(company.growth) * 4 +
                  getNumericValue(company.margin) * 2,
                10
              ),
              100
            );

            return (
              <div className="industry-ranking-row" key={company.name}>
                <span className="industry-rank-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="industry-ranked-company">
                  <div>
                    {company.name.slice(0, 2).toUpperCase()}
                  </div>

                  <span>
                    <strong>{company.name}</strong>
                    <small>{activeIndustry.name}</small>
                  </span>
                </div>

                <strong
                  className={
                    getNumericValue(company.growth) >= 0
                      ? "industry-positive-value"
                      : "industry-negative-value"
                  }
                >
                  {company.growth}
                </strong>

                <strong>{company.margin}</strong>

                <span className={`industry-trend-badge ${trendType}`}>
                  <TrendIcon type={trendType} />
                  {company.trend}
                </span>

                <div className="industry-performance-meter">
                  <span>
                    <i style={{ width: `${performanceValue}%` }} />
                  </span>

                  <strong>
                    {performanceValue >= 70
                      ? "Strong"
                      : performanceValue >= 40
                      ? "Moderate"
                      : "Weak"}
                  </strong>
                </div>

                <button
                  type="button"
                  className="industry-row-button"
                  aria-label={`Open ${company.name}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m14 7 5 5-5 5" />
                  </svg>
                </button>
              </div>
            );
          })}

          {!rankedCompanies.length && (
            <div className="industry-no-results">
              No companies match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}