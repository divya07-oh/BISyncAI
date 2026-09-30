import { User, Bell, Lock, Building2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account and platform preferences.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-border">
          <button className="px-6 py-4 text-sm font-bold text-accent border-b-2 border-accent bg-slate-50/50 flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </button>
          <button className="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-primary hover:bg-slate-50 flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Organization
          </button>
          <button className="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-primary hover:bg-slate-50 flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button className="px-6 py-4 text-sm font-semibold text-slate-500 hover:text-primary hover:bg-slate-50 flex items-center gap-2">
            <Lock className="h-4 w-4" /> Security
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-border">
            <div className="h-20 w-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent font-bold text-xl">
              AK
            </div>
            <div>
              <button className="bg-background border border-border px-4 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-slate-50 transition-colors shadow-sm mb-2">
                Change Avatar
              </button>
              <p className="text-xs text-slate-500">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Full Name</label>
              <input type="text" defaultValue="Dr. Arun Kumar" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-2 focus:ring-accent/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Role</label>
              <input type="text" defaultValue="Compliance Manager" className="w-full bg-slate-50 border border-border rounded-lg px-4 py-2.5 text-sm text-slate-500 outline-none" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Email Address</label>
              <input type="email" defaultValue="arun.k@company.com" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-2 focus:ring-accent/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Phone Number</label>
              <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:ring-2 focus:ring-accent/50 outline-none" />
            </div>
          </div>

          <div className="pt-6 flex justify-end gap-3">
            <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors border border-transparent hover:border-border">
              Cancel
            </button>
            <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
