"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, Users, CreditCard, Activity, 
  ArrowUp, ArrowDown, Search, Bell, 
  Settings, LayoutDashboard, Database, 
  ShieldCheck, Zap, Mail, CodeXml, ExternalLink,
  ChevronRight, MoreVertical, SearchIcon,
  Trash2, UserPlus, DownloadCloud
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

// Mock Data for "Stripe" style Enterprise SaaS
const statsData = {
  overview: [
    { label: "Gross Volume", value: "$124,592.00", trend: "+12.5%", positive: true, icon: <BarChart3 className="text-indigo-500" /> },
    { label: "Active Subscriptions", value: "8,429", trend: "+5.2%", positive: true, icon: <Users className="text-emerald-500" /> },
    { label: "Net Revenue", value: "$98,203.45", trend: "+8.1%", positive: true, icon: <CreditCard className="text-pink-500" /> },
    { label: "Churn Rate", value: "1.2%", trend: "-0.4%", positive: true, icon: <Activity className="text-orange-500" /> }
  ],
  users: [
    { label: "New Users", value: "1,204", trend: "+15%", positive: true, icon: <UserPlus className="text-indigo-500" /> },
    { label: "Active Sessions", value: "45,291", trend: "+2%", positive: true, icon: <Activity className="text-emerald-500" /> },
    { label: "Support Tickets", value: "12", trend: "-4", positive: true, icon: <Mail className="text-pink-500" /> },
    { label: "Verified Orgs", value: "892", trend: "+8", positive: true, icon: <ShieldCheck className="text-orange-500" /> }
  ]
};

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@techflow.io", plan: "Enterprise", status: "Active", spent: "$12,400", health: 98 },
  { id: 2, name: "Bob Smith", email: "bob@nexus.co", plan: "Pro", status: "Active", spent: "$2,100", health: 85 },
  { id: 3, name: "Charlie Davis", email: "charlie@startup.ai", plan: "Basic", status: "Inactive", spent: "$450", health: 12 },
  { id: 4, name: "Diana Prince", email: "diana@amazon.com", plan: "Enterprise", status: "Active", spent: "$45,000", health: 100 },
  { id: 5, name: "Edward Norton", email: "ed@fightclub.com", plan: "Pro", status: "Active", spent: "$1,800", health: 76 },
];

const mockTransactions = [
  { id: "TX-9021", user: "Alice Johnson", date: "May 1, 2026", amount: "$1,999.00", status: "Succeeded" },
  { id: "TX-9022", user: "Bob Smith", date: "May 1, 2026", amount: "$49.00", status: "Succeeded" },
  { id: "TX-9023", user: "Diana Prince", date: "Apr 30, 2026", amount: "$12,000.00", status: "Succeeded" },
  { id: "TX-9024", user: "Edward Norton", date: "Apr 29, 2026", amount: "$299.00", status: "Pending" },
  { id: "TX-9025", user: "Charlie Davis", date: "Apr 28, 2026", amount: "$15.00", status: "Failed" },
];

const mockOpsTasks = [
  { id: 1, task: "Review Enterprise API Limits", assignee: "M. Hamza", deadline: "2h 45m", priority: "High", status: "In Progress" },
  { id: 2, task: "Investigate AWS Churn Spike", assignee: "Dev Team", deadline: "Tomorrow", priority: "Critical", status: "Pending" },
  { id: 3, task: "Update SSL Certificates", assignee: "System Bot", deadline: "Expired", priority: "Urgent", status: "Alert" },
  { id: 4, task: "Onboard TechFlow.io Team", assignee: "M. Hamza", deadline: "3 Days", priority: "Normal", status: "Queued" },
];

export default function SaasDashboardDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Executive Report (PDF) generated and sent to your email.");
    }, 2000);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'database':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-black uppercase tracking-tight">System Operations <span className="text-indigo-500">Command</span></h3>
               <div className="flex gap-2">
                  <div className="px-4 py-2 bg-indigo-600/10 text-indigo-600 rounded-xl text-[10px] font-black uppercase border border-indigo-600/20 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" /> Server: Optimal
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {mockOpsTasks.map((task) => (
                 <div key={task.id} className="p-8 glass rounded-[2.5rem] border border-border group hover:border-indigo-500/50 transition-all">
                    <div className="flex justify-between items-start mb-6">
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${task.priority === 'Critical' ? 'bg-red-500 text-white' : 'bg-slate-500/10 text-slate-500'}`}>
                          {task.priority}
                       </span>
                       <span className="text-[10px] font-black text-slate-400">{task.deadline}</span>
                    </div>
                    <h5 className="font-black text-sm uppercase mb-4 leading-tight group-hover:text-indigo-500 transition-colors">{task.task}</h5>
                    <div className="flex justify-between items-center mt-auto pt-6 border-t border-border/50">
                       <p className="text-[10px] font-bold text-slate-500 uppercase">{task.assignee}</p>
                       <p className={`text-[10px] font-black uppercase ${task.status === 'Alert' ? 'text-red-500' : 'text-indigo-500'}`}>{task.status}</p>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-10 glass rounded-[3rem] border-2 border-dashed border-border flex flex-col items-center justify-center text-center opacity-50">
               <Database className="text-slate-300 mb-4" size={40} />
               <p className="font-black uppercase text-xs tracking-widest text-slate-400">Add Custom Operational Trigger</p>
            </div>
          </motion.div>
        );
      case 'users':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="flex justify-between items-center">
               <div className="relative max-w-sm w-full">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search users by name or email..." 
                    className="w-full pl-12 pr-4 py-3 rounded-xl glass border-border outline-none focus:ring-2 focus:ring-indigo-500"
                  />
               </div>
               <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <UserPlus size={16} /> Add User
               </button>
            </div>
            <div className="glass rounded-[2.5rem] overflow-hidden border border-border">
               <table className="w-full text-left">
                  <thead className="bg-slate-500/5 border-b border-border">
                     <tr>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">User</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">User Health</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Total Spent</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {mockUsers.map((user) => (
                       <tr key={user.id} className="border-b border-border/50 hover:bg-slate-500/5 transition-colors group">
                          <td className="px-8 py-6">
                             <p className="font-black text-sm uppercase">{user.name}</p>
                             <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                          </td>
                          <td className="px-8 py-6">
                             <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                {user.status === 'Inactive' ? 'At Risk' : user.status}
                             </span>
                          </td>
                          <td className="px-8 py-6 w-48">
                             <div className="flex items-center gap-3">
                                <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                   <motion.div 
                                     initial={{ width: 0 }}
                                     animate={{ width: `${user.health}%` }}
                                     className={`h-full rounded-full ${user.health > 80 ? 'bg-emerald-500' : user.health > 40 ? 'bg-indigo-500' : 'bg-red-500'}`}
                                   />
                                </div>
                                <span className="text-[10px] font-black">{user.health}%</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 font-black text-sm">{user.spent}</td>
                          <td className="px-8 py-6">
                             <div className="flex gap-2">
                                <button className="p-2 hover:text-indigo-500 transition-colors"><Settings size={16} /></button>
                                <button className="p-2 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                             </div>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </motion.div>
        );
      case 'billing':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-10 glass rounded-[2.5rem] border border-border relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><CreditCard size={120} /></div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Payment Methods</h4>
                  <div className="flex items-center gap-6 p-6 rounded-2xl border-2 border-indigo-500/20 bg-indigo-500/5">
                     <div className="w-12 h-8 bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-black">VISA</div>
                     <div>
                        <p className="font-black text-sm">•••• •••• •••• 4242</p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase">Expires 12/28</p>
                     </div>
                  </div>
                  <button className="mt-8 text-xs font-black text-indigo-500 uppercase tracking-widest hover:underline">+ Add New Method</button>
               </div>
               <div className="p-10 glass rounded-[2.5rem] border border-border">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Auto-Billing Engine</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">Billing Cycle</span>
                        <span className="text-sm font-black">Monthly</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">Next Invoice</span>
                        <span className="text-sm font-black">June 1, 2026</span>
                     </div>
                     <div className="pt-4 border-t border-border flex justify-between items-center">
                        <span className="text-sm font-black uppercase text-indigo-500">Total Amount</span>
                        <span className="text-xl font-black">$2,450.00</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="glass rounded-[2.5rem] p-10 border border-border">
               <div className="flex justify-between items-center mb-10">
                  <h4 className="text-xl font-black uppercase tracking-tight">Recent Invoices</h4>
                  <button className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-slate-500 hover:text-indigo-500"><DownloadCloud size={16} /> Export CSV</button>
               </div>
               <div className="space-y-6">
                  {mockTransactions.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center group">
                       <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.status === 'Succeeded' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                             <ChevronRight size={18} />
                          </div>
                          <div>
                             <p className="text-sm font-black uppercase">{tx.user}</p>
                             <p className="text-[10px] text-slate-500 font-medium">{tx.id} • {tx.date}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="font-black text-sm">{tx.amount}</p>
                          <p className={`text-[8px] font-black uppercase tracking-widest ${tx.status === 'Succeeded' ? 'text-emerald-500' : 'text-slate-500'}`}>{tx.status}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        );
      default: // Overview
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
              <div className="lg:col-span-4 glass rounded-[2.5rem] p-10 border border-border flex flex-col justify-between min-h-[450px]">
                <div className="flex justify-between items-center mb-12">
                   <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">Revenue Metrics</h3>
                      <button 
                        onClick={handleExport}
                        disabled={isExporting}
                        className="mt-2 flex items-center gap-2 text-[10px] font-black uppercase text-indigo-500 hover:underline disabled:opacity-50"
                      >
                         {isExporting ? <Loader2 size={12} className="animate-spin" /> : <DownloadCloud size={12} />}
                         {isExporting ? "Compiling PDF..." : "Generate Executive Report"}
                      </button>
                   </div>
                   <div className="flex gap-2 self-start">
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Subscription</div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase"><div className="w-2 h-2 rounded-full bg-indigo-500" /> One-time</div>
                   </div>
                </div>
                <div className="flex-1 flex items-end gap-3 px-4 relative mt-4">
                   {/* Background Grid Lines */}
                   <div className="absolute inset-0 flex flex-col justify-between opacity-5 pointer-events-none px-4 py-1">
                      {[1,2,3,4,5].map(i => <div key={i} className="w-full h-px bg-slate-500" />)}
                   </div>

                   {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85, 55, 100].map((h, i) => (
                     <div key={i} className="flex-1 group relative z-10">
                        {/* Sub Bar */}
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 0.7}%` }}
                          className="w-full bg-emerald-500/40 dark:bg-emerald-500/20 rounded-t-sm group-hover:bg-emerald-500 transition-all duration-300 mb-0.5"
                        />
                        {/* Primary Bar */}
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 0.3}%` }}
                          className="w-full bg-indigo-600/60 dark:bg-indigo-600/30 rounded-t-sm group-hover:bg-indigo-600 transition-all duration-300"
                        />
                        
                        {/* Rich Tooltip */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl z-50 min-w-[120px]">
                           <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Performance Details</p>
                           <div className="flex justify-between gap-4 mb-1">
                              <span className="text-[10px] font-bold">Revenue:</span>
                              <span className="text-[10px] font-black">${(h * 150).toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between gap-4">
                              <span className="text-[10px] font-bold">Growth:</span>
                              <span className="text-[10px] font-black text-emerald-400">+{Math.round(h/4)}%</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="grid grid-cols-6 gap-2 mt-6 px-4">
                   {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                     <span key={m} className="text-[10px] font-black text-slate-400 uppercase text-center">{m}</span>
                   ))}
                </div>
              </div>

              <div className="lg:col-span-3 glass rounded-[2.5rem] p-10 border border-border">
                 <h3 className="text-xl font-black uppercase tracking-tight mb-2">Live Transactions</h3>
                 <p className="text-xs text-slate-500 font-medium mb-10">Real-time stream of incoming net revenue.</p>
                 <div className="space-y-8">
                    {mockTransactions.slice(0, 4).map((tx, i) => (
                      <div key={i} className="flex justify-between items-center group">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs">
                               {tx.user.charAt(0)}
                            </div>
                            <div>
                               <p className="text-sm font-black uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{tx.user}</p>
                               <p className="text-[10px] text-slate-400 font-medium">{tx.id}</p>
                            </div>
                         </div>
                         <p className="font-black text-sm">{tx.amount}</p>
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setActiveTab('billing')} className="w-full mt-12 py-4 rounded-2xl glass border-border font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                    View Ledger
                 </button>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] selection:bg-indigo-500 selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-8 px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
         <div>
            <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">Enterprise Command Center</span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">LIT-DASHBOARD <span className="text-gradient">PRO</span></h1>
         </div>
         <div className="flex gap-4">
            <div className="flex -space-x-3">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-10 h-10 rounded-full border-4 border-background bg-slate-200 dark:bg-slate-800" />
               ))}
               <div className="w-10 h-10 rounded-full border-4 border-background bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">+24</div>
            </div>
            <button className="p-3 glass rounded-xl border-border text-slate-500 hover:text-indigo-600"><Bell size={20} /></button>
            <button className="p-3 glass rounded-xl border-border text-slate-500 hover:text-indigo-600"><Settings size={20} /></button>
         </div>
      </div>

      <div className="px-8 max-w-[1600px] mx-auto pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-2 space-y-2">
           {[
             { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Market Overview' },
             { id: 'users', icon: <Users size={18} />, label: 'Customer Base' },
             { id: 'billing', icon: <CreditCard size={18} />, label: 'Billing Engine' },
             { id: 'database', icon: <Database size={18} />, label: 'Core Logs' },
           ].map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id)}
               className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/30' : 'hover:bg-indigo-500/5 text-slate-500 hover:text-indigo-600'}`}
             >
               {item.icon} {item.label}
             </button>
           ))}
           
           <div className="mt-12 p-8 glass rounded-[2.5rem] border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <ShieldCheck className="text-indigo-600 mb-6" size={32} />
              <p className="text-xs font-black uppercase tracking-tighter mb-2">System Integrity</p>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-6">Your engine is optimized for 2026 enterprise standards.</p>
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "98%" }}
                   className="h-full bg-indigo-600" 
                 />
              </div>
           </div>
        </aside>

        {/* Dynamic Content Area */}
        <div className="lg:col-span-10 space-y-10">
          
          {/* Active Tab Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {(activeTab === 'users' ? statsData.users : statsData.overview).map((stat, i) => (
               <motion.div 
                 key={stat.label + activeTab}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="glass rounded-[2rem] p-8 border border-border bg-white dark:bg-slate-900/40"
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 bg-slate-500/5 rounded-2xl">{stat.icon}</div>
                     <span className={`text-[10px] font-black ${stat.positive ? 'text-emerald-500' : 'text-red-500'} bg-slate-500/5 px-2 py-1 rounded-lg`}>
                        {stat.trend}
                     </span>
                  </div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <h4 className="text-3xl font-black tracking-tighter mt-1">{stat.value}</h4>
               </motion.div>
             ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      <Contact />

      <footer className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} LITGENICS BY M.HAMZA SHAIKH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}
