"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showToolsDropdown, setShowToolsToolsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
    { 
      name: "Tools", 
      href: "#",
      dropdown: [
        { name: "IELTS Predictor", href: "/tools/ielts-predictor", desc: "Estimate your band score" },
        { name: "English Level Quiz", href: "/tools/business-english-quiz", desc: "Assess your professional rank" },
        { name: "AI Fluency Audit", href: "/tools/ai-fluency-audit", desc: "Voice analysis & tone report" },
        { name: "AI Librarian", href: "/tools/ai-librarian", desc: "Book suggestions for your mood" },
        { name: "Brand Suggester", href: "/tools/brand-name-suggester", desc: "Modern names for your startup" },
        { name: "University Finder", href: "/tools/university-finder", desc: "Match institutions with your goals" },
        { name: "Europass CV Maker", href: "/tools/europass-cv-maker", desc: "Professional European resumes" },
      ]
    },
    { name: "Pricing", href: "/#pricing" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl px-6 py-3 flex justify-between items-center transition-all ${scrolled ? "shadow-2xl shadow-indigo-500/10" : ""}`}>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Rocket size={20} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              LITGENICS
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group/item"
                onMouseEnter={() => link.dropdown && setShowToolsToolsDropdown(true)}
                onMouseLeave={() => link.dropdown && setShowToolsToolsDropdown(false)}
              >
                <Link 
                  href={link.href}
                  className="text-sm font-semibold hover:text-indigo-500 transition-colors flex items-center gap-1 py-2"
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${showToolsDropdown ? 'rotate-180' : ''}`} />}
                </Link>

                {link.dropdown && (
                  <AnimatePresence>
                    {showToolsDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-64 pt-4"
                      >
                        <div className="glass rounded-2xl p-4 shadow-2xl border-white/20">
                          {link.dropdown.map((sub) => (
                            <Link 
                              key={sub.name}
                              href={sub.href}
                              className="block p-3 rounded-xl hover:bg-indigo-500/10 transition-colors group/sub"
                            >
                              <p className="text-sm font-bold group-hover/sub:text-indigo-500">{sub.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{sub.desc}</p>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            <Link 
              href="/#contact"
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Start Project
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <motion.div 
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.dropdown ? (
                <div className="space-y-4">
                  <p className="text-lg font-bold text-slate-400 uppercase tracking-widest text-xs">{link.name}</p>
                  {link.dropdown.map((sub) => (
                    <Link 
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-bold hover:text-indigo-500 transition-colors pl-4"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold hover:text-indigo-500 transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <Link 
            href="/#contact"
            onClick={() => setIsOpen(false)}
            className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold text-center shadow-xl shadow-indigo-500/20"
          >
            Start Project
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
