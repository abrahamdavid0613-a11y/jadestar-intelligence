import React, { useMemo, useState } from "react";

const companies = [
  {
    id: "costco",
    name: "Costco",
    ticker: "COST",
    industry: "Retail",
    score: 87,
  },
  {
    id: "walmart",
    name: "Walmart",
    ticker: "WMT",
    industry: "Retail",
    score: 82,
  },
  {
    id: "target",
    name: "Target",
    ticker: "TGT",
    industry: "Retail",
    score: 74,
  },
];

const suggestedQuestions = [
  {
    category: "Profitability",
    question: "What is driving the change in profit margin?",
  },
  {
    category: "Liquidity",
    question: "Does the company have enough short-term liquidity?",
  },
  {
    category: "Risk",
    question: "What are the most important financial risks?",
  },
  {
    category: "Comparison",
    question: "How does this company compare with its competitors?",
  },
];

const analysisHistory = [
  {
    id: 1,
    title: "Costco liquidity analysis",
    company: "COST",
    time: "12 minutes ago",
    type: "Liquidity",
  },
  {
    id: 2,
    title: "Retail margin comparison",
    company: "Sector",
    time: "Yesterday",
    type: "Comparison",
  },
  {
    id: 3,
    title: "Costco solvency review",
    company: "COST",
    time: "Jul 21",
    type: "Risk",
  },
];

const companyResponses = {
  costco: {
    summary:
      "Costco remains financially strong, supported by revenue growth, improving liquidity, high interest coverage, and stable profitability. The company’s low-margin operating model continues to depend on high inventory turnover, membership income, and consistent sales volume.",
    strengths: [
      "Revenue increased to approximately $275.2 billion.",
      "Net income increased to approximately $8.1 billion.",
      "The current ratio improved from 0.97 to 1.01.",
      "Interest coverage increased to approximately 70.2 times.",
    ],
    risks: [
      "Profit margins remain thin compared with many other industries.",
      "Current liabilities remain close to total current assets.",
      "The business depends heavily on continued sales volume.",
    ],
    anomalies: [
      "Cash increased significantly while inventory declined.",
      "Debt remained relatively stable as total assets increased.",
    ],
    confidence: 94,
  },

  walmart: {
    summary:
      "Walmart maintains significant scale and stable profitability, but its liquidity position remains below 1.00. Its large revenue base supports financial resilience, while operating efficiency and debt management remain important areas to monitor.",
    strengths: [
      "Largest revenue base among the selected companies.",
      "Stable positive revenue growth.",
      "Profit margin is competitive within mass-market retail.",
      "Strong market scale and supplier leverage.",
    ],
    risks: [
      "Current ratio remains below 1.00.",
      "Interest coverage is considerably lower than Costco’s.",
      "Large operating structure creates cost sensitivity.",
    ],
    anomalies: [
      "Profitability remains stable despite a lower liquidity ratio.",
      "Revenue scale does not produce the strongest JadeStar score.",
    ],
    confidence: 91,
  },

  target: {
    summary:
      "Target currently shows weaker financial momentum than its selected competitors. Revenue contraction, lower profitability, and a higher debt-to-assets position create a more cautious financial outlook.",
    strengths: [
      "Current ratio remains close to 1.00.",
      "The company remains profitable.",
      "Existing scale provides opportunities for recovery.",
    ],
    risks: [
      "Revenue growth is currently negative.",
      "Profit margin trails the selected competitors.",
      "Debt represents a larger percentage of total assets.",
      "Interest coverage provides less protection against financing costs.",
    ],
    anomalies: [
      "Liquidity remains relatively stable despite weaker growth.",
      "Overall score is being pressured by multiple financial categories.",
    ],
    confidence: 89,
  },
};

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function AIAnalyst() {
  const [selectedCompanyId, setSelectedCompanyId] = useState("costco");
  const [question, setQuestion] = useState("");
  const [submittedQuestion, setSubmittedQuestion] = useState(
    "Evaluate the company’s overall financial position."
  );
  const [activeTab, setActiveTab] = useState("analysis");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedCompany = useMemo(
    () =>
      companies.find((company) => company.id === selectedCompanyId) ||
      companies[0],
    [selectedCompanyId]
  );

  const analysis =
    companyResponses[selectedCompanyId] || companyResponses.costco;

  const submitQuestion = (customQuestion) => {
    const finalQuestion = customQuestion || question.trim();

    if (!finalQuestion || isAnalyzing) {
      return;
    }

    setSubmittedQuestion(finalQuestion);
    setQuestion("");
    setActiveTab("analysis");
    setIsAnalyzing(true);

    window.setTimeout(() => {
      setIsAnalyzing(false);
    }, 1100);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitQuestion();
  };

  return (
    <div className="ai-analyst-page">
      <section className="ai-analyst-hero">
        <div>
          <div className="ai-analyst-eyebrow">
            <span />
            Artificial Intelligence Workspace
          </div>

          <h1>JadeStar AI Analyst</h1>

          <p>
            Ask financial questions, investigate performance changes, identify
            risks, and generate research insights from company information.
          </p>
        </div>

        <div className="ai-analyst-status-card">
          <span className="ai-analyst-live-dot" />

          <div>
            <strong>Analyst online</strong>
            <p>Financial reasoning engine ready</p>
          </div>
        </div>
      </section>

      <section className="ai-context-panel">
        <div className="ai-context-heading">
          <div>
            <span>Research Context</span>
            <h2>Select Analysis Target</h2>
          </div>

          <div className="ai-context-badge">
            <SparkIcon />
            SEC financial intelligence
          </div>
        </div>

        <div className="ai-company-options">
          {companies.map((company) => (
            <button
              type="button"
              key={company.id}
              className={
                selectedCompanyId === company.id
                  ? "ai-company-option active"
                  : "ai-company-option"
              }
              onClick={() => {
                setSelectedCompanyId(company.id);
                setSubmittedQuestion(
                  `Evaluate ${company.name}’s overall financial position.`
                );
              }}
            >
              <span className="ai-company-logo">
                {company.ticker.slice(0, 2)}
              </span>

              <span className="ai-company-details">
                <strong>{company.name}</strong>
                <small>
                  {company.ticker} · {company.industry}
                </small>
              </span>

              <span className="ai-company-score">
                <small>Score</small>
                <strong>{company.score}</strong>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="ai-question-panel">
        <div className="ai-question-header">
          <div className="ai-question-icon">
            <SparkIcon />
          </div>

          <div>
            <span>Ask JadeStar</span>
            <h2>What would you like to analyze?</h2>
          </div>
        </div>

        <form className="ai-question-form" onSubmit={handleSubmit}>
          <textarea
            value={question}
            placeholder={`Ask a financial question about ${selectedCompany.name}...`}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                submitQuestion();
              }
            }}
          />

          <div className="ai-question-footer">
            <div className="ai-question-tools">
              <button type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
                Add filing
              </button>

              <button type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 19h16" />
                  <path d="M7 15V9" />
                  <path d="M12 15V5" />
                  <path d="M17 15v-3" />
                </svg>
                Add comparison
              </button>
            </div>

            <button
              type="submit"
              className="ai-submit-button"
              disabled={!question.trim() || isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Run analysis"}
              <ArrowIcon />
            </button>
          </div>
        </form>

        <div className="ai-suggested-questions">
          <span>Suggested questions</span>

          <div>
            {suggestedQuestions.map((item) => (
              <button
                type="button"
                key={item.question}
                onClick={() => submitQuestion(item.question)}
              >
                <small>{item.category}</small>
                <strong>{item.question}</strong>
                <ArrowIcon />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="ai-analyst-workspace">
        <aside className="ai-history-panel">
          <div className="ai-history-heading">
            <div>
              <span>Workspace</span>
              <h2>Analysis History</h2>
            </div>

            <button type="button" aria-label="Create new analysis">
              +
            </button>
          </div>

          <div className="ai-history-list">
            {analysisHistory.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={index === 0 ? "active" : ""}
              >
                <span className="ai-history-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 4h14v16H5z" />
                    <path d="M8 8h8" />
                    <path d="M8 12h8" />
                    <path d="M8 16h5" />
                  </svg>
                </span>

                <span className="ai-history-content">
                  <strong>{item.title}</strong>
                  <small>
                    {item.company} · {item.time}
                  </small>
                </span>

                <span className="ai-history-type">{item.type}</span>
              </button>
            ))}
          </div>

          <div className="ai-history-usage">
            <div>
              <span>Monthly analyst usage</span>
              <strong>64%</strong>
            </div>

            <div className="ai-usage-track">
              <span />
            </div>

            <p>128 of 200 analyses used</p>
          </div>
        </aside>

        <main className="ai-response-panel">
          <div className="ai-response-topbar">
            <div>
              <span className="ai-response-company">
                {selectedCompany.ticker.slice(0, 2)}
              </span>

              <div>
                <span>Current Research Session</span>
                <h2>{selectedCompany.name} Financial Analysis</h2>
              </div>
            </div>

            <div className="ai-response-actions">
              <button type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
              </button>

              <button type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="5" cy="12" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>

          <div className="ai-response-tabs">
            {["analysis", "signals", "sources"].map((tab) => (
              <button
                type="button"
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {isAnalyzing ? (
            <div className="ai-loading-state">
              <div className="ai-loading-orb">
                <SparkIcon />
                <span />
              </div>

              <strong>Analyzing financial information</strong>
              <p>
                Reviewing trends, ratios, risk indicators, and company
                performance...
              </p>

              <div className="ai-loading-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : (
            <>
              {activeTab === "analysis" && (
                <div className="ai-analysis-content">
                  <div className="ai-user-question">
                    <span>You asked</span>
                    <p>{submittedQuestion}</p>
                  </div>

                  <div className="ai-generated-response">
                    <div className="ai-response-label">
                      <div>
                        <SparkIcon />
                      </div>

                      <span>JadeStar Analysis</span>

                      <small>{analysis.confidence}% confidence</small>
                    </div>

                    <h3>Executive Summary</h3>
                    <p>{analysis.summary}</p>

                    <div className="ai-response-highlights">
                      <article className="positive">
                        <span>Financial Position</span>
                        <strong>
                          {selectedCompany.score >= 85
                            ? "Strong"
                            : selectedCompany.score >= 75
                            ? "Moderate"
                            : "Watch"}
                        </strong>
                        <p>
                          JadeStar score of {selectedCompany.score}/100 based
                          on the current model.
                        </p>
                      </article>

                      <article>
                        <span>Primary Advantage</span>
                        <strong>{analysis.strengths[0]}</strong>
                        <p>
                          This is one of the strongest financial signals in the
                          available company data.
                        </p>
                      </article>

                      <article className="warning">
                        <span>Primary Risk</span>
                        <strong>{analysis.risks[0]}</strong>
                        <p>
                          This item should be monitored in future reporting
                          periods.
                        </p>
                      </article>
                    </div>

                    <h3>Analyst Interpretation</h3>

                    <p>
                      The company’s results should be evaluated as a complete
                      financial system rather than through one ratio alone.
                      Growth indicates whether the business is expanding,
                      profitability measures how efficiently revenue becomes
                      earnings, liquidity evaluates short-term coverage, and
                      solvency measures longer-term financial risk.
                    </p>

                    <div className="ai-analysis-callout">
                      <span>JadeStar conclusion</span>

                      <p>
                        {selectedCompany.name} currently presents a{" "}
                        <strong>
                          {selectedCompany.score >= 85
                            ? "strong"
                            : selectedCompany.score >= 75
                            ? "moderate"
                            : "cautious"}
                        </strong>{" "}
                        financial profile. Future analysis should focus on
                        whether its strongest trends continue and whether
                        identified risks improve or weaken.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "signals" && (
                <div className="ai-signals-content">
                  <SignalSection
                    title="Financial Strengths"
                    subtitle="Positive factors identified by JadeStar"
                    type="positive"
                    items={analysis.strengths}
                  />

                  <SignalSection
                    title="Risk Indicators"
                    subtitle="Areas that require continued monitoring"
                    type="warning"
                    items={analysis.risks}
                  />

                  <SignalSection
                    title="Detected Anomalies"
                    subtitle="Notable relationships within the financial data"
                    type="neutral"
                    items={analysis.anomalies}
                  />
                </div>
              )}

              {activeTab === "sources" && (
                <div className="ai-sources-content">
                  <div className="ai-sources-intro">
                    <span>Research Foundation</span>
                    <h3>Sources used for this analysis</h3>
                    <p>
                      JadeStar connects conclusions to financial statements and
                      regulatory filings so analysts can verify the underlying
                      information.
                    </p>
                  </div>

                  <SourceCard
                    form="10-K"
                    title={`${selectedCompany.name} Annual Report`}
                    description="Consolidated financial statements, business risks, management discussion, and annual operating results."
                    date="Latest fiscal year"
                    pages="Financial statements"
                  />

                  <SourceCard
                    form="10-Q"
                    title={`${selectedCompany.name} Quarterly Report`}
                    description="Interim revenue, profitability, liquidity, and cash-flow information."
                    date="Latest quarter"
                    pages="Quarterly results"
                  />

                  <SourceCard
                    form="DATA"
                    title="JadeStar Ratio Engine"
                    description="Calculated profitability, liquidity, solvency, growth, and coverage measurements."
                    date="Current model"
                    pages="Derived analysis"
                  />
                </div>
              )}
            </>
          )}

          {!isAnalyzing && (
            <form className="ai-follow-up-form" onSubmit={handleSubmit}>
              <input
                value={question}
                placeholder={`Ask a follow-up about ${selectedCompany.name}...`}
                onChange={(event) => setQuestion(event.target.value)}
              />

              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Submit follow-up question"
              >
                <ArrowIcon />
              </button>
            </form>
          )}
        </main>
      </section>
    </div>
  );
}

function SignalSection({ title, subtitle, type, items }) {
  return (
    <section className={`ai-signal-section ${type}`}>
      <div className="ai-signal-section-heading">
        <span className="ai-signal-section-icon">
          {type === "positive" ? "✓" : type === "warning" ? "!" : "◆"}
        </span>

        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="ai-signal-list">
        {items.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceCard({ form, title, description, date, pages }) {
  return (
    <article className="ai-source-card">
      <span className="ai-source-form">{form}</span>

      <div className="ai-source-details">
        <strong>{title}</strong>
        <p>{description}</p>

        <div>
          <span>{date}</span>
          <span>{pages}</span>
        </div>
      </div>

      <button type="button">
        Review source
        <ArrowIcon />
      </button>
    </article>
  );
}