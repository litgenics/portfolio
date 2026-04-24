"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/#services" },
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
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-semibold hover:text-indigo-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="#contact"
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
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold hover:text-indigo-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="#contact"
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
