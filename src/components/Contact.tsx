"use client";

import { motion } from "framer-motion";
import { Mail, Link as LinkIcon, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">
              LET&apos;S CREATE <br />
              <span className="text-gradient">SOMETHING EPIC</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-12 max-w-lg">
              Ready to elevate your business or communication skills? 
              Partner with <span className="text-indigo-600 font-bold underline decoration-indigo-500/30 underline-offset-4">litgenics</span> and turn your vision into reality.
            </p>
            
            <div className="space-y-6">
              <a 
                href="mailto:contact@litgenics.com" 
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email me at</p>
                  <p className="text-lg font-black">contact@litgenics.com</p>
                </div>
              </a>
              
              <div className="flex gap-4 pt-4">
                {[
                  { icon: <LinkIcon size={20} />, href: "#" },
                  { icon: <MessageSquare size={20} />, href: "#" },
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href} 
                    className="w-14 h-14 glass rounded-2xl flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/20 transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-indigo-500/20 transition-colors" />
            
            <h3 className="text-3xl font-black mb-8 tracking-tight">Quick Inquiry</h3>
            <form 
              className="space-y-6" 
              action="https://formspree.io/f/xldgqezw" 
              method="POST"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="John Doe" 
                  className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-1">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="john@example.com" 
                  className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-1">How can I help?</label>
                <textarea 
                  rows={4}
                  name="message"
                  required
                  placeholder="Tell me about your project..." 
                  className="w-full glass px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-95"
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default Contact;
