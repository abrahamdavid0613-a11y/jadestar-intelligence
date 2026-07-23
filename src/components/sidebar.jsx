import React from "react";

const navigationItems = [
  {
    id: "dashboard",
    label: "Overview",
    description: "Market command center",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    ),
  },
  {
    id: "company",
    label: "Companies",
    description: "Financial intelligence",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M9 21v-4h6v4" />
        <path d="M8 9h1M12 9h1M16 9h1M8 13h1M12 13h1M16 13h1" />
      </svg>
    ),
  },
  {
    id: "industry",
    label: "Industries",
    description: "Sector performance",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 20V10l6 3V8l6 3V4h6v16" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    id: "comparison",
    label: "Comparison",
    description: "Peer benchmarking",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 20V10" />
        <path d="M12 20V4" />
        <path d="M17 20v-7" />
        <path d="M4 20h16" />
      </svg>
    ),
  },
  {
    id: "ai",
    label: "AI Analyst",
    description: "Research copilot",
    badge: "AI",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 14 8l5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" />
        <path d="m18 15 .8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
      </svg>
    ),
  },
  {
    id: "reports",
    label: "Reports",
    description: "Exportable insights",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 3h9l4 4v14H6V3Z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    ),
  },
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <span className="brand-star brand-star-one" />
          <span className="brand-star brand-star-two" />
          <span className="brand-star brand-star-three" />
        </div>

        <div className="brand-copy">
          <div className="brand-name">
            Jade<span>Star</span>
          </div>
          <div className="brand-subtitle">Intelligence</div>
        </div>
      </div>

      <div className="sidebar-workspace">
        <div className="workspace-logo">JD</div>

        <div className="workspace-copy">
          <span>Workspace</span>
          <strong>JadeStar Research</strong>
        </div>

        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m8 10 4 4 4-4" />
        </svg>
      </div>

      <div className="sidebar-section-label">Intelligence Suite</div>

      <nav className="sidebar-navigation" aria-label="Main navigation">
        {navigationItems.map((item) => {
          const isActive = page === item.id;

          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              onClick={() => setPage(item.id)}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="nav-icon">{item.icon}</span>

              <span className="nav-copy">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>

              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}

              {isActive && <span className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-divider" />

      <div className="sidebar-section-label">Platform</div>

      <button type="button" className="sidebar-nav-item sidebar-secondary-item">
        <span className="nav-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1V21h-4v-.09a1.7 1.7 0 0 0-.4-1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1-.4H3v-4h.09a1.7 1.7 0 0 0 1-.4 1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1V3h4v.09a1.7 1.7 0 0 0 .4 1 1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.13.38.34.72.6 1 .28.27.63.47 1 .59h.09v4H21a1.7 1.7 0 0 0-1 .41 1.7 1.7 0 0 0-.6 1Z" />
          </svg>
        </span>

        <span className="nav-copy">
          <strong>Settings</strong>
          <small>Workspace controls</small>
        </span>
      </button>

      <div className="sidebar-account">
        <div className="account-avatar">AD</div>

        <div className="account-details">
          <strong>Abraham David</strong>
          <span>Administrator</span>
        </div>

        <button type="button" className="account-menu" aria-label="Account menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </aside>
  );
}