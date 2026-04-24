"use client";

import { motion } from "framer-motion";
import { Mail, Link as LinkIcon, MessageSquare } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to work together?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
            Whether you want to improve your English or build a custom software solution, 
            I&apos;m here to help you achieve your goals. Let&apos;s start a conversation!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a 
              href="mailto:contact@litgenics.com" 
              className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors"
            >
              <Mail size={20} />
              Email Me
            </a>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20">
                <LinkIcon size={24} />
              </a>
              <a href="#" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors border border-white/20">
                <MessageSquare size={24} />
              </a>
            </div>
          </div>

          <p className="text-indigo-200">
            Founder of <span className="font-bold text-white">litgenics</span>
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full -ml-16 -mb-16 blur-2xl" />
      </div>
    </section>
  );
};

export default Contact;
