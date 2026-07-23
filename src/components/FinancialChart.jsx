import React, { useId } from "react";

const chartSets = {
  revenue: {
    label: "Revenue",
    value: "$275.2B",
    change: "+8.2%",
    line:
      "M0 184 C35 170 58 176 92 151 C125 126 149 145 182 118 C214 92 245 108 276 82 C308 55 335 77 369 54 C401 31 433 46 466 24 C498 4 531 24 568 12 C606 0 634 13 680 2",
    area:
      "M0 184 C35 170 58 176 92 151 C125 126 149 145 182 118 C214 92 245 108 276 82 C308 55 335 77 369 54 C401 31 433 46 466 24 C498 4 531 24 568 12 C606 0 634 13 680 2 L680 220 L0 220 Z",
  },

  profit: {
    label: "Operating Margin",
    value: "3.77%",
    change: "+0.31%",
    line:
      "M0 160 C29 143 63 154 92 132 C119 112 150 124 180 104 C212 84 244 111 278 91 C310 72 338 82 370 60 C400 41 431 67 462 50 C493 32 529 56 558 36 C592 14 620 31 680 18",
    area:
      "M0 160 C29 143 63 154 92 132 C119 112 150 124 180 104 C212 84 244 111 278 91 C310 72 338 82 370 60 C400 41 431 67 462 50 C493 32 529 56 558 36 C592 14 620 31 680 18 L680 220 L0 220 Z",
  },
};

const waveBars = [
  18, 31, 22, 43, 28, 51, 36, 64, 45, 30, 54, 72, 39, 58, 80, 47, 68,
  42, 77, 52, 84, 60, 39, 73, 49, 88, 65, 46, 75, 55, 92, 69, 48, 81,
  62, 90, 71, 52, 83, 66, 96, 74, 59, 86, 68, 94, 76, 61, 88, 72, 98,
  78, 64, 90, 74, 85, 69,
];

export default function FinancialChart({ type = "revenue" }) {
  const id = useId().replace(/:/g, "");
  const chart = chartSets[type] || chartSets.revenue;

  return (
    <div className="live-financial-chart">
      <div className="chart-toolbar">
        <div>
          <span className="chart-eyebrow">{chart.label}</span>

          <div className="chart-value-row">
            <strong>{chart.value}</strong>
            <span>{chart.change}</span>
          </div>
        </div>

        <div className="chart-timeframes">
          <button type="button">1D</button>
          <button type="button">1W</button>
          <button type="button" className="active">
            1M
          </button>
          <button type="button">1Y</button>
        </div>
      </div>

      <div className="chart-stage">
        <svg
          className="financial-chart-svg"
          viewBox="0 0 680 220"
          preserveAspectRatio="none"
          role="img"
          aria-label={`${chart.label} financial trend`}
        >
          <defs>
            <linearGradient
              id={`area-${id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#f5a623" stopOpacity="0.34" />
              <stop offset="48%" stopColor="#f5a623" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f5a623" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id={`wave-${id}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#ffbd46" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f5a623" stopOpacity="0.03" />
            </linearGradient>

            <filter
              id={`glow-${id}`}
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <clipPath id={`area-clip-${id}`}>
              <path d={chart.area} />
            </clipPath>
          </defs>

          <g className="chart-grid-lines">
            <line x1="0" y1="44" x2="680" y2="44" />
            <line x1="0" y1="88" x2="680" y2="88" />
            <line x1="0" y1="132" x2="680" y2="132" />
            <line x1="0" y1="176" x2="680" y2="176" />

            <line x1="113" y1="0" x2="113" y2="220" />
            <line x1="226" y1="0" x2="226" y2="220" />
            <line x1="339" y1="0" x2="339" y2="220" />
            <line x1="452" y1="0" x2="452" y2="220" />
            <line x1="565" y1="0" x2="565" y2="220" />
          </g>

          <path
            className="chart-area-fill"
            d={chart.area}
            fill={`url(#area-${id})`}
          />

          <g
            className="waveform-bars"
            clipPath={`url(#area-clip-${id})`}
          >
            {waveBars.map((height, index) => {
              const x = index * 12;
              const barHeight = height * 1.35;

              return (
                <rect
                  key={index}
                  x={x}
                  y={220 - barHeight}
                  width="4"
                  height={barHeight}
                  rx="2"
                  fill={`url(#wave-${id})`}
                  style={{
                    "--wave-delay": `${index * -0.045}s`,
                    "--wave-duration": `${1.1 + (index % 7) * 0.11}s`,
                  }}
                />
              );
            })}
          </g>

          <path
            className="chart-line-glow"
            d={chart.line}
            filter={`url(#glow-${id})`}
          />

          <path className="chart-line-main" d={chart.line} />

          <circle className="chart-current-ring" cx="680" cy="2" r="8" />
          <circle className="chart-current-dot" cx="680" cy="2" r="4" />
        </svg>

        <div className="chart-scan-line" />

        <div className="chart-live-badge">
          <span />
          Live signal
        </div>
      </div>

      <div className="chart-axis-labels">
        <span>Jan</span>
        <span>Mar</span>
        <span>May</span>
        <span>Jul</span>
        <span>Sep</span>
        <span>Nov</span>
      </div>
    </div>
  );
}