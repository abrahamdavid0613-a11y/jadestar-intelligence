import React, { useState } from "react";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="top-header">
      <div className="header-search-wrap">
        <div
          className={`global-search ${searchFocused ? "focused" : ""}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="search"
            placeholder="Search companies, industries, or filings..."
            aria-label="Search JadeStar"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />

          <div className="search-shortcut">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="header-actions">
        <div className="market-status">
          <span className="market-status-dot" />

          <div>
            <strong>Market data</strong>
            <small>Systems operational</small>
          </div>
        </div>

        <div className="header-divider-vertical" />

        <button
          type="button"
          className="header-icon-button"
          aria-label="View activity"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 12h4l2-6 4 12 2-6h6" />
          </svg>
        </button>

        <button
          type="button"
          className="header-icon-button notification-button"
          aria-label="View notifications"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <span className="notification-indicator" />
        </button>

        <button type="button" className="header-export-button">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>

          Export
        </button>

        <button
          type="button"
          className="header-profile"
          aria-label="Open account menu"
        >
          <div className="header-profile-avatar">AD</div>

          <div className="header-profile-copy">
            <strong>Abraham</strong>
            <span>Pro workspace</span>
          </div>

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m8 10 4 4 4-4" />
          </svg>
        </button>
      </div>
    </header>
  );
}