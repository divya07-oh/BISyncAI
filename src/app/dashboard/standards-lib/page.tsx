import { BookOpen, Search, Filter } from "lucide-react";

export default function StandardsLibraryPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Standards Library</h1>
        <p className="text-sm text-slate-500 mt-1">Browse and search the complete database of Indian Standards.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by IS number, product, or keyword..." 
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 text-primary shadow-sm placeholder:text-slate-400"
            />
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Electrical", "Civil Engineering", "Food & Agriculture", "Chemical", "Mechanical", "Textiles", "Electronics", "Metallurgical"].map((category) => (
          <div key={category} className="bg-card border border-border p-5 rounded-xl hover:border-accent/50 transition-all cursor-pointer group">
            <div className="h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors border border-slate-100 group-hover:border-accent/20">
              <BookOpen className="h-5 w-5 text-slate-500 group-hover:text-accent" />
            </div>
            <h3 className="font-bold text-primary text-sm mb-1">{category}</h3>
            <p className="text-xs text-slate-500">Explore standards</p>
          </div>
        ))}
      </div>
    </div>
  );
}
