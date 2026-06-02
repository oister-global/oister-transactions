"use client";

// Parses a numeric value out of a financial cell ("1,050" -> 1050, "12%" -> 12).
function num(value) {
  const parsed = parseFloat(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

// Rounds up to a "nice" axis maximum (e.g. 1300 -> 2000, 12 -> 20).
function niceMax(value) {
  if (value <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const n = value / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return nice * pow;
}

// Builds chart rows from the financial table (columns + rows) returned by the API.
function buildChartData(columns, rows) {
  const cols = Array.isArray(columns) ? columns : [];
  const tableRows = Array.isArray(rows) ? rows : [];
  if (cols.length === 0 || tableRows.length === 0) return [];

  const rowByParticular = (needle) =>
    tableRows.find((r) => (r?.particular || "").toLowerCase().includes(needle));

  const revenueRow = rowByParticular("revenue (");
  const ebitdaRow = rowByParticular("ebitda (");
  const growthRow = rowByParticular("growth");
  const marginRow = rowByParticular("margin");

  const at = (row, i) => row?.values?.[i]?.value;

  return cols.map(({ label }, i) => ({
    period: label,
    revenue: num(at(revenueRow, i)),
    ebitda: num(at(ebitdaRow, i)),
    growth: at(growthRow, i) ?? "",
    margin: num(at(marginRow, i)),
  }));
}

// Layout constants
const W = 680, H = 340;
const LX = 64, RX = W - 50, TY = 30, BY = H - 56;
const CW = RX - LX;   // chart width
const CH = BY - TY;   // chart height

const BAR_W = 46;
const EBITDA_W = 22;

export default function FinancialChart({ columns, rows }) {
  const DATA = buildChartData(columns, rows);
  if (DATA.length === 0) return null;

  const MAX_REV = niceMax(Math.max(...DATA.map((d) => Math.max(d.revenue, d.ebitda)), 0));
  const MAX_MGN = niceMax(Math.max(...DATA.map((d) => d.margin), 0));

  const SLOTS = DATA.length;
  const slotW = CW / SLOTS;

  const cx = (i) => LX + slotW * i + slotW / 2;
  const revY = (v) => BY - (v / MAX_REV) * CH;
  const revH = (v) => (v / MAX_REV) * CH;
  const mgnY = (v) => BY - (v / MAX_MGN) * CH;

  const REV_GRID = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(MAX_REV * f));
  const MGN_GRID = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(MAX_MGN * f));

  const linePoints = DATA.map((d, i) => `${cx(i)},${mgnY(d.margin)}`).join(" ");

  return (
    <section className="section-card">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-[#28283B]">FINANCIAL PROJECTIONS — CHART</h2>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 text-xs text-[#696C7A]">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-sm bg-[#555573]" />
            Revenue (Rs. Cr) — left axis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-sm bg-[#a5b4fc]" />
            EBITDA (Rs. Cr)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-5 bg-[#f97316]" />
            <span className="inline-block size-2 rounded-full bg-[#f97316]" />
            EBITDA Margin % — right axis
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full min-w-[420px]"
            aria-label="Financial projections chart"
          >
            {/* Gridlines & left y-axis (Revenue) */}
            {REV_GRID.map((v) => {
              const y = revY(v);
              return (
                <g key={v}>
                  <line x1={LX} y1={y} x2={RX} y2={y} stroke="#e8eaef" strokeWidth="1" />
                  <text x={LX - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#696C7A">
                    {v === 0 ? "0" : `${v}`}
                  </text>
                </g>
              );
            })}

            {/* Right y-axis labels (Margin %) */}
            {MGN_GRID.map((v) => (
              <text key={v} x={RX + 6} y={mgnY(v) + 4} textAnchor="start" fontSize="10" fill="#f97316">
                {v}%
              </text>
            ))}

            {/* Axis lines */}
            <line x1={LX} y1={TY} x2={LX} y2={BY} stroke="#d0d4de" strokeWidth="1.5" />
            <line x1={LX} y1={BY} x2={RX} y2={BY} stroke="#d0d4de" strokeWidth="1.5" />
            <line x1={RX} y1={TY} x2={RX} y2={BY} stroke="#d0d4de" strokeWidth="1" strokeDasharray="3 3" />

            {/* Bars + labels */}
            {DATA.map((d, i) => {
              const x = cx(i);
              const ry = revY(d.revenue);
              const rh = revH(d.revenue);
              const ey = revY(d.ebitda);
              const eh = revH(d.ebitda);

              return (
                <g key={d.period}>
                  {/* Revenue bar */}
                  <rect
                    x={x - BAR_W / 2}
                    y={ry}
                    width={BAR_W}
                    height={rh}
                    rx="3"
                    fill="#555573"
                    opacity="0.9"
                  />
                  {/* Revenue label */}
                  <text x={x} y={ry - 5} textAnchor="middle" fontSize="10" fontWeight="600" fill="#28283B">
                    {d.revenue.toLocaleString()}
                  </text>

                  {/* EBITDA bar (right-aligned within revenue bar footprint) */}
                  <rect
                    x={x + BAR_W / 2 + 3}
                    y={ey}
                    width={EBITDA_W}
                    height={eh}
                    rx="2"
                    fill="#a5b4fc"
                    opacity="0.9"
                  />

                  {/* EBITDA value label */}
                  <text x={x + BAR_W / 2 + 3 + EBITDA_W / 2} y={ey - 4} textAnchor="middle" fontSize="9" fill="#4338ca">
                    {d.ebitda}
                  </text>

                  {/* Revenue growth label */}
                  <text x={x - BAR_W / 2 - 2} y={ry + 2} textAnchor="end" fontSize="9" fill="#696C7A">
                    {d.growth}
                  </text>

                  {/* X-axis label */}
                  <text x={x} y={BY + 16} textAnchor="middle" fontSize="10" fill="#28283B" fontWeight="500">
                    {d.period}
                  </text>
                </g>
              );
            })}

            {/* EBITDA Margin line */}
            <polyline
              points={linePoints}
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {DATA.map((d, i) => {
              const x = cx(i);
              const y = mgnY(d.margin);
              return (
                <g key={`dot-${d.period}`}>
                  <circle cx={x} cy={y} r="4" fill="#f97316" />
                  <text x={x} y={y - 8} textAnchor="middle" fontSize="9" fill="#f97316" fontWeight="600">
                    {d.margin}%
                  </text>
                </g>
              );
            })}

            {/* Y-axis titles */}
            <text
              x={12}
              y={TY + CH / 2}
              textAnchor="middle"
              fontSize="9"
              fill="#555573"
              transform={`rotate(-90, 12, ${TY + CH / 2})`}
            >
              Revenue (Rs. Cr)
            </text>
            <text
              x={W - 8}
              y={TY + CH / 2}
              textAnchor="middle"
              fontSize="9"
              fill="#f97316"
              transform={`rotate(90, ${W - 8}, ${TY + CH / 2})`}
            >
              EBITDA Margin %
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
