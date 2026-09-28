import { BarChart3, TrendingUp, FileText, Download } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your compliance performance and AI usage.</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm">
          <Download className="h-4 w-4" /> Export Data
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-accent/10 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-bold text-primary">Compliance Rate</h3>
          </div>
          <div className="text-3xl font-extrabold text-primary mb-2">92%</div>
          <p className="text-xs text-success font-medium">+4% from last month</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-highlight/10 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-highlight" />
            </div>
            <h3 className="font-bold text-primary">Documents Analyzed</h3>
          </div>
          <div className="text-3xl font-extrabold text-primary mb-2">48</div>
          <p className="text-xs text-slate-500 font-medium">Across 12 projects</p>
        </div>

        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-warning/10 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-warning" />
            </div>
            <h3 className="font-bold text-primary">Open Gaps</h3>
          </div>
          <div className="text-3xl font-extrabold text-primary mb-2">7</div>
          <p className="text-xs text-error font-medium">-2 from last week</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[300px] flex items-center justify-center">
        <div className="text-center text-slate-400">
          <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p className="font-medium">Detailed charts and graphs will appear here.</p>
        </div>
      </div>
    </div>
  );
}
