"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Studies", "Electrical", "Protection", "Automation", "Design", "Consultancy"] as const;
type Filter = (typeof FILTERS)[number];

const ROWS: { ref: string; title: string; group: Exclude<Filter, "All">; standard: string; review: string }[] = [
  { ref: "PS-01", title: "Load Flow & Voltage Profile Report", group: "Studies", standard: "IEEE 399 / IEC 60909", review: "Chartered Engineer" },
  { ref: "PS-02", title: "Short-Circuit & Fault Level Study", group: "Studies", standard: "IEC 60909 / ANSI C37", review: "Chartered Engineer" },
  { ref: "PS-03", title: "Harmonic & Power Quality Assessment", group: "Studies", standard: "IEEE 519 / IEC 61000", review: "Principal Engineer" },
  { ref: "EE-01", title: "Load Schedule & Demand Calculations", group: "Electrical", standard: "IEC 60364", review: "Senior Engineer" },
  { ref: "EE-02", title: "Earthing & Grounding Design Report", group: "Electrical", standard: "IEEE 80 / IEC 62305", review: "Principal Engineer" },
  { ref: "PC-01", title: "Protection Settings & Coordination Package", group: "Protection", standard: "IEEE C37 / IEC 60255", review: "Principal Engineer" },
  { ref: "PC-02", title: "Arc-Flash Incident Energy Study", group: "Protection", standard: "IEEE 1584 / NFPA 70E", review: "Chartered Engineer" },
  { ref: "AS-01", title: "Control Philosophy & Logic Specification", group: "Automation", standard: "IEC 61131 / IEC 61850", review: "Senior Engineer" },
  { ref: "AS-02", title: "SCADA & Monitoring Integration Package", group: "Automation", standard: "IEC 60870 / IEC 61850", review: "Principal Engineer" },
  { ref: "ED-01", title: "Single-Line Diagram & Drawing Set", group: "Design", standard: "IEC 61082 / IEC 60617", review: "Senior Engineer" },
  { ref: "ED-02", title: "Equipment Specifications & Bill of Quantities", group: "Design", standard: "IEC 62271 / IEC 61439", review: "Senior Engineer" },
  { ref: "TC-01", title: "Independent Design Review Report", group: "Consultancy", standard: "Project design basis", review: "Chartered Engineer" },
  { ref: "TC-02", title: "Grid Code Compliance Statement", group: "Consultancy", standard: "Local grid code", review: "Principal Engineer" },
];

/** Filterable deliverables register. The table scrolls horizontally on narrow screens. */
export function DeliverablesTable() {
  const [filter, setFilter] = useState<Filter>("All");
  const rows = filter === "All" ? ROWS : ROWS.filter((r) => r.group === filter);

  return (
    <div>
      <div role="group" aria-label="Filter deliverables by discipline" className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={f === filter}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors",
              f === filter ? "border-brand bg-brand text-white" : "border-hairline bg-white text-graphite-600 hover:border-graphite-950/30"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-md border border-hairline bg-white">
        <table className="w-full min-w-[40rem] border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-hairline bg-canvas text-[9px] font-semibold uppercase tracking-[0.14em] text-steel">
              <th scope="col" className="px-4 py-3">Doc ref</th>
              <th scope="col" className="px-4 py-3">Deliverable</th>
              <th scope="col" className="px-4 py-3">Discipline</th>
              <th scope="col" className="px-4 py-3">Primary standard</th>
              <th scope="col" className="px-4 py-3">Review level</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.ref} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3 font-bold tabular-nums text-brand">{r.ref}</td>
                <td className="px-4 py-3 font-semibold">{r.title}</td>
                <td className="px-4 py-3 text-graphite-600">{r.group}</td>
                <td className="px-4 py-3 text-graphite-600">{r.standard}</td>
                <td className="px-4 py-3 text-graphite-600">{r.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
