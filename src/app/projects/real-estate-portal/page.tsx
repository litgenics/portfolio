"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, MapPin, Bed, Bath, Square, 
  ArrowRight, Heart, Share2, 
  Building2, Palette, Check
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

const properties = [
  {
    id: 1,
    title: "The Sky Garden Penthouse",
    location: "Baku, Azerbaijan",
    price: "$2,450,000",
    beds: 4,
    baths: 3,
    area: "3,200 sqft",
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
    tag: "Featured"
  },
  {
    id: 2,
    title: "Modernist Desert Villa",
    location: "Palm Jumeirah, Dubai",
    price: "$5,100,000",
    beds: 5,
    baths: 6,
    area: "6,500 sqft",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop",
    tag: "New"
  },
  {
    id: 3,
    title: "Glass Waterfront Studio",
    location: "Zurich, Switzerland",
    price: "$890,000",
    beds: 1,
    baths: 1,
    area: "950 sqft",
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?q=80&w=1000&auto=format&fit=crop",
    tag: "Exclusive"
  }
];

const themes = [
  { 
    id: 'midnight', 
    name: 'Midnight Pro', 
    colors: ['bg-[#020617]', 'bg-[#818cf8]', 'bg-[#f472b6]'],
    description: 'Deep contrast for luxury elegance.' 
  },
  { 
    id: 'emerald', 
    name: 'Emerald City', 
    colors: ['bg-[#064e3b]', 'bg-[#10b981]', 'bg-[#34d399]'],
    description: 'Eco-modern sustainability vibe.' 
  },
  { 
    id: 'rose', 
    name: 'Desert Rose', 
    colors: ['bg-[#4c0519]', 'bg-[#fb7185]', 'bg-[#f43f5e]'],
    description: 'Warm, high-energy boutique feel.' 
  }
];

export default function RealEstatePortal() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTheme, setActiveTheme] = useState('midnight');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  const filteredProperties = activeFilter === "All" 
    ? properties 
    : properties.filter(p => p.type === activeFilter);

  return (
    <main data-theme={activeTheme} className="min-h-screen bg-background transition-colors duration-700">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover brightness-50"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-8 inline-block backdrop-blur-md">
              The Real Estate Engine
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
              FIND YOUR <br/> <span className="text-primary italic">DREAM ESTATE</span>
            </h1>
            
            <div className="bg-white/10 backdrop-blur-xl p-2 rounded-[2rem] border border-white/20 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto shadow-2xl">
              <div className="flex-1 flex items-center gap-4 px-6 py-4">
                <Search className="text-primary" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter location, area or type..."
                  className="bg-transparent border-none outline-none text-white font-medium w-full placeholder:text-slate-400"
                />
              </div>
              <button className="bg-primary text-white px-10 py-4 rounded-[1.5rem] font-black uppercase tracking-widest hover:brightness-110 transition-all">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Theme Switcher Section - Based on User Visual Feedback */}
      <section className="py-24 px-4 max-w-7xl mx-auto text-center border-b border-border">
         <div className="flex flex-col items-center mb-12">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary mb-6">
               <Palette size={32} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
               DYNAMIC <span className="text-gradient">DESIGN SYSTEM</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-xl">
               Experience the 2026 design trends. Switch themes to see how the engine adapts its entire visual identity instantly.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {themes.map((theme) => (
               <button
                 key={theme.id}
                 onClick={() => setActiveTheme(theme.id)}
                 className={`group p-8 rounded-[2.5rem] glass text-left transition-all duration-500 border-2 ${activeTheme === theme.id ? 'border-primary shadow-2xl scale-[1.02]' : 'border-border hover:border-primary/50'}`}
               >
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex gap-2">
                        {theme.colors.map((c, i) => (
                           <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white/20`} />
                        ))}
                     </div>
                     {activeTheme === theme.id && (
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                           <Check size={16} strokeWidth={4} />
                        </div>
                     )}
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2">{theme.name}</h4>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{theme.description}</p>
               </button>
            ))}
         </div>
      </section>

      {/* Listings */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {properties.map((prop) => (
            <motion.div
              key={prop.id}
              className="group glass rounded-[2.5rem] overflow-hidden border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={prop.title} />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-primary text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {prop.tag}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black tracking-tight leading-none group-hover:text-primary transition-colors uppercase">
                    {prop.title}
                  </h3>
                  <p className="text-primary font-black text-lg">{prop.price}</p>
                </div>

                <div className="flex items-center gap-2 text-slate-400 font-medium text-sm mb-8">
                  <MapPin size={16} />
                  {prop.location}
                </div>

                <div className="grid grid-cols-3 gap-4 py-6 border-y border-border mb-8">
                  <div className="flex flex-col gap-1 text-center">
                    <span className="text-[10px] font-black uppercase text-slate-500">Beds</span>
                    <span className="font-black text-lg">{prop.beds}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-center border-x border-border px-4">
                    <span className="text-[10px] font-black uppercase text-slate-500">Baths</span>
                    <span className="font-black text-lg">{prop.baths}</span>
                  </div>
                  <div className="flex flex-col gap-1 text-center">
                    <span className="text-[10px] font-black uppercase text-slate-500">Area</span>
                    <span className="font-black text-[10px] truncate">{prop.area}</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-between group/btn text-xs font-black uppercase tracking-widest">
                  <span>View Details</span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden border border-border">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-primary">
              <Building2 size={300} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <span className="bg-primary px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 inline-block text-white">Full Stack Engineering</span>
                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">
                    LITGENICS <br/> <span className="text-primary italic text-gradient">CORE</span>
                 </h2>
                 <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                    This portal integrates complex listing logic with a dynamic theme engine. Experience how the design adapts to the target market in real-time.
                 </p>
                 
                 <div className="flex flex-wrap gap-4 mb-12">
                    {["Listing Management", "Filter Engine", "Dynamic Styling", "Pro Rendering"].map((tech) => (
                      <div key={tech} className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 text-xs font-black uppercase">
                        <Check size={14} className="text-primary" /> {tech}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

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
