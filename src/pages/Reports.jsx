import React, { useMemo, useState } from "react";

const reportTemplates = [
  {
    id: "executive",
    title: "Executive Summary",
    category: "Company",
    description:
      "A concise overview of financial performance, major trends, risks, and overall company health.",
    sections: 6,
    estimatedPages: "4–6",
    icon: "ES",
  },
  {
    id: "risk",
    title: "Risk Assessment",
    category: "Risk",
    description:
      "Detailed evaluation of liquidity, leverage, profitability pressure, and operational warning signals.",
    sections: 8,
    estimatedPages: "6–8",
    icon: "RA",
  },
  {
    id: "industry",
    title: "Industry Comparison",
    category: "Industry",
    description:
      "Side-by-side analysis of company performance against selected competitors and industry benchmarks.",
    sections: 7,
    estimatedPages: "5–7",
    icon: "IC",
  },
  {
    id: "recommendation",
    title: "Analyst Recommendation",
    category: "Strategy",
    description:
      "Research-style conclusions and recommendations based on financial trends and company positioning.",
    sections: 9,
    estimatedPages: "7–10",
    icon: "AR",
  },
];

const companies = [
  {
    id: "costco",
    name: "Costco",
    ticker: "COST",
    score: 87,
    industry: "Retail",
  },
  {
    id: "walmart",
    name: "Walmart",
    ticker: "WMT",
    score: 82,
    industry: "Retail",
  },
  {
    id: "target",
    name: "Target",
    ticker: "TGT",
    score: 74,
    industry: "Retail",
  },
];

const recentReports = [
  {
    id: 1,
    title: "Costco Annual Financial Review",
    company: "Costco",
    ticker: "COST",
    type: "Executive Summary",
    date: "Jul 22, 2026",
    status: "Ready",
    format: "PDF",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Retail Industry Performance Comparison",
    company: "Retail Sector",
    ticker: "SECTOR",
    type: "Industry Comparison",
    date: "Jul 21, 2026",
    status: "Ready",
    format: "PDF",
    size: "3.1 MB",
  },
  {
    id: 3,
    title: "Target Financial Risk Assessment",
    company: "Target",
    ticker: "TGT",
    type: "Risk Assessment",
    date: "Jul 19, 2026",
    status: "Review",
    format: "PDF",
    size: "1.8 MB",
  },
  {
    id: 4,
    title: "Walmart Quarterly Analyst Brief",
    company: "Walmart",
    ticker: "WMT",
    type: "Analyst Recommendation",
    date: "Jul 17, 2026",
    status: "Draft",
    format: "DOCX",
    size: "940 KB",
  },
];

const reportSections = [
  {
    id: "overview",
    title: "Company Overview",
    description: "Business profile, market position, and reporting period.",
  },
  {
    id: "performance",
    title: "Financial Performance",
    description: "Revenue, profitability, and operating trend analysis.",
  },
  {
    id: "liquidity",
    title: "Liquidity Analysis",
    description: "Current ratio, quick ratio, and short-term coverage.",
  },
  {
    id: "solvency",
    title: "Solvency Analysis",
    description: "Debt levels, coverage, and long-term financial risk.",
  },
  {
    id: "comparison",
    title: "Peer Comparison",
    description: "Performance against selected competitors.",
  },
  {
    id: "ai",
    title: "JadeStar AI Commentary",
    description: "AI-generated findings, risks, and analyst conclusion.",
  },
];

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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function Reports() {
  const [selectedTemplateId, setSelectedTemplateId] = useState("executive");
  const [selectedCompanyId, setSelectedCompanyId] = useState("costco");
  const [selectedFormat, setSelectedFormat] = useState("PDF");
  const [selectedSections, setSelectedSections] = useState(
    reportSections.map((section) => section.id)
  );
  const [includeBranding, setIncludeBranding] = useState(true);
  const [includeSources, setIncludeSources] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  const selectedTemplate = useMemo(
    () =>
      reportTemplates.find(
        (template) => template.id === selectedTemplateId
      ) || reportTemplates[0],
    [selectedTemplateId]
  );

  const selectedCompany = useMemo(
    () =>
      companies.find((company) => company.id === selectedCompanyId) ||
      companies[0],
    [selectedCompanyId]
  );

  const toggleSection = (sectionId) => {
    setSelectedSections((currentSections) => {
      if (currentSections.includes(sectionId)) {
        if (currentSections.length === 1) {
          return currentSections;
        }

        return currentSections.filter((id) => id !== sectionId);
      }

      return [...currentSections, sectionId];
    });
  };

  const generateReport = () => {
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    setGeneratedReport(null);

    window.setTimeout(() => {
      setGeneratedReport({
        title: `${selectedCompany.name} ${selectedTemplate.title}`,
        format: selectedFormat,
        pages: selectedTemplate.estimatedPages,
        generatedAt: "Generated just now",
      });

      setIsGenerating(false);
    }, 1400);
  };

  return (
    <div className="reports-page">
      <section className="reports-hero">
        <div>
          <div className="reports-eyebrow">
            <span />
            Research Production
          </div>

          <h1>JadeStar Financial Reports</h1>

          <p>
            Build professional company, risk, industry, and analyst reports
            from JadeStar financial intelligence.
          </p>
        </div>

        <div className="reports-hero-actions">
          <button type="button" className="reports-secondary-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            New template
          </button>

          <button
            type="button"
            className="reports-primary-button"
            onClick={generateReport}
          >
            <FileIcon />
            Generate report
          </button>
        </div>
      </section>

      <section className="reports-overview-grid">
        <article>
          <div className="reports-overview-icon">
            <FileIcon />
          </div>

          <div>
            <span>Generated Reports</span>
            <strong>24</strong>
            <p>Across all company workspaces</p>
          </div>

          <small>+6 this month</small>
        </article>

        <article>
          <div className="reports-overview-icon positive">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 12 4 4L19 6" />
            </svg>
          </div>

          <div>
            <span>Ready for Review</span>
            <strong>17</strong>
            <p>Completed and available</p>
          </div>

          <small className="positive">71% complete</small>
        </article>

        <article>
          <div className="reports-overview-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v5l3 2" />
            </svg>
          </div>

          <div>
            <span>Scheduled Reports</span>
            <strong>4</strong>
            <p>Upcoming automated delivery</p>
          </div>

          <small>Next: Monday</small>
        </article>

        <article>
          <div className="reports-overview-icon warning">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3 2 21h20Z" />
              <path d="M12 9v5" />
              <path d="M12 18h.01" />
            </svg>
          </div>

          <div>
            <span>Needs Review</span>
            <strong>3</strong>
            <p>Reports with unresolved signals</p>
          </div>

          <small className="warning">Attention required</small>
        </article>
      </section>

      <section className="reports-template-panel">
        <div className="reports-panel-heading">
          <div>
            <span>Report Library</span>
            <h2>Select a Report Template</h2>
          </div>

          <span className="reports-template-count">
            {reportTemplates.length} templates
          </span>
        </div>

        <div className="reports-template-grid">
          {reportTemplates.map((template) => (
            <button
              type="button"
              key={template.id}
              className={
                selectedTemplateId === template.id
                  ? "reports-template-card active"
                  : "reports-template-card"
              }
              onClick={() => setSelectedTemplateId(template.id)}
            >
              <div className="reports-template-top">
                <span className="reports-template-icon">
                  {template.icon}
                </span>

                <span className="reports-template-category">
                  {template.category}
                </span>
              </div>

              <h3>{template.title}</h3>
              <p>{template.description}</p>

              <div className="reports-template-meta">
                <span>{template.sections} sections</span>
                <span>{template.estimatedPages} pages</span>
              </div>

              <div className="reports-template-select">
                <span>
                  {selectedTemplateId === template.id
                    ? "Selected"
                    : "Select template"}
                </span>

                <ArrowIcon />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="reports-builder-grid">
        <main className="reports-builder-panel">
          <div className="reports-panel-heading">
            <div>
              <span>Report Builder</span>
              <h2>Configure Your Report</h2>
            </div>

            <span className="reports-builder-status">
              Draft configuration
            </span>
          </div>

          <div className="reports-builder-section">
            <div className="reports-builder-section-heading">
              <span>01</span>

              <div>
                <h3>Select Company</h3>
                <p>Choose the company used as the primary report subject.</p>
              </div>
            </div>

            <div className="reports-company-options">
              {companies.map((company) => (
                <button
                  type="button"
                  key={company.id}
                  className={
                    selectedCompanyId === company.id
                      ? "reports-company-option active"
                      : "reports-company-option"
                  }
                  onClick={() => setSelectedCompanyId(company.id)}
                >
                  <span className="reports-company-logo">
                    {company.ticker.slice(0, 2)}
                  </span>

                  <span>
                    <strong>{company.name}</strong>
                    <small>
                      {company.ticker} · {company.industry}
                    </small>
                  </span>

                  <span className="reports-company-score">
                    {company.score}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="reports-builder-section">
            <div className="reports-builder-section-heading">
              <span>02</span>

              <div>
                <h3>Report Sections</h3>
                <p>Select the analysis sections included in the report.</p>
              </div>
            </div>

            <div className="reports-section-list">
              {reportSections.map((section) => {
                const isSelected = selectedSections.includes(section.id);

                return (
                  <button
                    type="button"
                    key={section.id}
                    className={
                      isSelected
                        ? "reports-section-option active"
                        : "reports-section-option"
                    }
                    onClick={() => toggleSection(section.id)}
                  >
                    <span className="reports-section-check">
                      {isSelected ? "✓" : ""}
                    </span>

                    <span>
                      <strong>{section.title}</strong>
                      <small>{section.description}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="reports-builder-section">
            <div className="reports-builder-section-heading">
              <span>03</span>

              <div>
                <h3>Export Format</h3>
                <p>Choose the primary output format for this report.</p>
              </div>
            </div>

            <div className="reports-format-options">
              {["PDF", "DOCX", "XLSX", "CSV"].map((format) => (
                <button
                  type="button"
                  key={format}
                  className={
                    selectedFormat === format
                      ? "reports-format-option active"
                      : "reports-format-option"
                  }
                  onClick={() => setSelectedFormat(format)}
                >
                  <span>{format}</span>

                  <small>
                    {format === "PDF" && "Client-ready document"}
                    {format === "DOCX" && "Editable report"}
                    {format === "XLSX" && "Financial workbook"}
                    {format === "CSV" && "Raw report data"}
                  </small>
                </button>
              ))}
            </div>
          </div>

          <div className="reports-builder-section">
            <div className="reports-builder-section-heading">
              <span>04</span>

              <div>
                <h3>Report Options</h3>
                <p>Customize branding and supporting references.</p>
              </div>
            </div>

            <div className="reports-option-list">
              <label>
                <span>
                  <strong>JadeStar branding</strong>
                  <small>
                    Include company colors, report cover, and page styling.
                  </small>
                </span>

                <input
                  type="checkbox"
                  checked={includeBranding}
                  onChange={(event) =>
                    setIncludeBranding(event.target.checked)
                  }
                />

                <i />
              </label>

              <label>
                <span>
                  <strong>SEC filing references</strong>
                  <small>
                    Include supporting filing and statement references.
                  </small>
                </span>

                <input
                  type="checkbox"
                  checked={includeSources}
                  onChange={(event) =>
                    setIncludeSources(event.target.checked)
                  }
                />

                <i />
              </label>
            </div>
          </div>
        </main>

        <aside className="reports-preview-panel">
          <div className="reports-preview-heading">
            <div>
              <span>Live Preview</span>
              <h2>Report Summary</h2>
            </div>

            <span className="reports-preview-format">
              {selectedFormat}
            </span>
          </div>

          <div className="reports-document-preview">
            <div className="reports-document-header">
              <div className="reports-document-brand">
                <span>J</span>

                <div>
                  <strong>JadeStar Intelligence</strong>
                  <small>Financial Research Report</small>
                </div>
              </div>

              <span>{selectedFormat}</span>
            </div>

            <div className="reports-document-hero">
              <span>{selectedTemplate.category} Intelligence</span>
              <h3>
                {selectedCompany.name}
                <br />
                {selectedTemplate.title}
              </h3>

              <p>
                Financial performance, risk, and market intelligence report
                prepared by JadeStar.
              </p>
            </div>

            <div className="reports-document-company">
              <span>{selectedCompany.ticker.slice(0, 2)}</span>

              <div>
                <strong>{selectedCompany.name}</strong>
                <small>
                  {selectedCompany.ticker} · {selectedCompany.industry}
                </small>
              </div>

              <div>
                <small>JadeStar Score</small>
                <strong>{selectedCompany.score}/100</strong>
              </div>
            </div>

            <div className="reports-document-lines">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="reports-document-footer">
              <span>Confidential financial intelligence</span>
              <span>01</span>
            </div>
          </div>

          <div className="reports-preview-summary">
            <div>
              <span>Template</span>
              <strong>{selectedTemplate.title}</strong>
            </div>

            <div>
              <span>Sections</span>
              <strong>
                {selectedSections.length}/{reportSections.length}
              </strong>
            </div>

            <div>
              <span>Estimated Length</span>
              <strong>{selectedTemplate.estimatedPages} pages</strong>
            </div>

            <div>
              <span>Output</span>
              <strong>{selectedFormat}</strong>
            </div>
          </div>

          <div className="reports-ai-summary">
            <div>
              <span className="reports-ai-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
                </svg>
              </span>

              <div>
                <span>JadeStar AI</span>
                <strong>Executive Summary Preview</strong>
              </div>
            </div>

            <p>
              {selectedCompany.name} currently holds a JadeStar score of{" "}
              <strong>{selectedCompany.score}/100</strong>. The report will
              evaluate performance, financial health, major risks, and the
              company’s position within the {selectedCompany.industry} sector.
            </p>
          </div>

          <button
            type="button"
            className="reports-generate-button"
            onClick={generateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="reports-button-loader" />
                Generating report...
              </>
            ) : (
              <>
                <FileIcon />
                Generate {selectedFormat} report
              </>
            )}
          </button>

          {generatedReport && (
            <div className="reports-generated-confirmation">
              <span>✓</span>

              <div>
                <strong>{generatedReport.title}</strong>
                <p>
                  {generatedReport.format} · {generatedReport.pages} pages ·{" "}
                  {generatedReport.generatedAt}
                </p>
              </div>

              <button type="button">Open</button>
            </div>
          )}
        </aside>
      </section>

      <section className="reports-recent-panel">
        <div className="reports-panel-heading">
          <div>
            <span>Report Activity</span>
            <h2>Recent Reports</h2>
          </div>

          <button type="button" className="reports-view-all-button">
            View all reports
            <ArrowIcon />
          </button>
        </div>

        <div className="reports-table">
          <div className="reports-table-row heading">
            <span>Report</span>
            <span>Type</span>
            <span>Generated</span>
            <span>Status</span>
            <span>Format</span>
            <span />
          </div>

          {recentReports.map((report) => (
            <div className="reports-table-row" key={report.id}>
              <div className="reports-table-report">
                <span>
                  <FileIcon />
                </span>

                <div>
                  <strong>{report.title}</strong>
                  <small>
                    {report.ticker} · {report.company}
                  </small>
                </div>
              </div>

              <span>{report.type}</span>
              <span>{report.date}</span>

              <span
                className={`reports-status-badge ${report.status.toLowerCase()}`}
              >
                <i />
                {report.status}
              </span>

              <div className="reports-format-cell">
                <strong>{report.format}</strong>
                <small>{report.size}</small>
              </div>

              <button
                type="button"
                className="reports-row-action"
                aria-label={`Open ${report.title}`}
              >
                <ArrowIcon />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}