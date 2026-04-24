"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ArrowRight, CheckCircle2, Trophy, Mail, RefreshCw } from "lucide-react";

const questions = [
  {
    q: "In a formal email, which is the most appropriate way to suggest a meeting?",
    options: ["How about we meet tomorrow?", "I would like to propose a meeting for tomorrow.", "Meeting tomorrow?", "Let's catch up tomorrow."],
    correct: 1
  },
  {
    q: "What does the term 'ASAP' stand for in a professional context?",
    options: ["As Soon As Possible", "Always Send All Papers", "At Some Advanced Point", "As Simple As Possible"],
    correct: 0
  },
  {
    q: "Which word is more professional than 'get' in: 'I will get the report to you'?",
    options: ["Deliver", "Give", "Bring", "Take"],
    correct: 0
  },
  {
    q: "In business, 'To touch base' means:",
    options: ["To play a game", "To brief someone", "To contact someone briefly", "To finish a project"],
    correct: 2
  },
  {
    q: "Which is a 'Soft Skill'?",
    options: ["Coding", "Graphic Design", "Emotional Intelligence", "Data Analysis"],
    correct: 2
  },
  {
    q: "What is the best way to disagree politely in a meeting?",
    options: ["You are wrong.", "I see your point, but I have a different perspective.", "That won't work.", "I don't like that idea."],
    correct: 1
  },
  {
    q: "'Due Diligence' refers to:",
    options: ["Doing a job quickly", "A comprehensive appraisal of a business", "Paying taxes on time", "Leaving work early"],
    correct: 1
  },
  {
    q: "A 'Pain Point' in business is:",
    options: ["A physical injury", "A specific problem faced by a customer", "A sharp corner in the office", "A low salary"],
    correct: 1
  },
  {
    q: "Which closing is best for a very formal letter to someone you don't know?",
    options: ["Best,", "Cheers,", "Yours faithfully,", "See ya,"],
    correct: 2
  },
  {
    q: "'Leveraging' a resource means:",
    options: ["Using it to maximum advantage", "Throwing it away", "Borrowing money for it", "Storing it for later"],
    correct: 0
  }
];

const BusinessEnglishQuiz = () => {
  const [step, setStep] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (idx: number) => {
    if (idx === questions[currentQ].correct) setScore(score + 1);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStep('result');
    }
  };

  const getLevel = () => {
    if (score >= 9) return { title: "Executive Level", desc: "You have a masterful command of professional English." };
    if (score >= 7) return { title: "Managerial Level", desc: "You communicate clearly with strong business vocabulary." };
    if (score >= 5) return { title: "Associate Level", desc: "You have the basics but need to refine your formal tone." };
    return { title: "Junior Level", desc: "Focus on building your professional vocabulary and etiquette." };
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {step === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass rounded-[3rem] p-12 text-center"
          >
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl">
              <Brain size={40} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase">Business English <br/> <span className="text-gradient">Level Assessment</span></h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-10">
              Discover your professional speaking and writing rank in just 2 minutes. 
              Get a detailed improvement plan based on your results.
            </p>
            <button 
              onClick={() => setStep('quiz')}
              className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/40 flex items-center gap-3 mx-auto"
            >
              Start Assessment <ArrowRight />
            </button>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass rounded-[3rem] p-8 md:p-12"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Question {currentQ + 1} of 10</span>
              <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentQ + 1) * 10}%` }}
                  className="h-full bg-indigo-600"
                />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-black mb-10 tracking-tight leading-tight">
              {questions[currentQ].q}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 transition-all font-bold text-lg"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[3rem] p-12 text-center"
          >
            <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-yellow-500/20">
              <Trophy size={40} />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-2">Assessment Complete</p>
            <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase">{getLevel().title}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-12 max-w-md mx-auto">
              {getLevel().desc} You scored <span className="text-indigo-600 font-black">{score}/10</span>.
            </p>

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 mb-10 border border-slate-100 dark:border-slate-800">
              <h4 className="text-lg font-black mb-4 flex items-center justify-center gap-2">
                <Mail className="text-indigo-500" size={20} /> Get Your Improvement Plan
              </h4>
              <p className="text-sm text-slate-500 mb-6 font-medium">Enter your email and I'll send you a custom roadmap to reach Executive Level.</p>
              <form action="https://formspree.io/f/xldgqezw" method="POST" className="flex flex-col sm:flex-row gap-3">
                <input type="hidden" name="_subject" value={`Business English Quiz Result: ${getLevel().title}`} />
                <input type="hidden" name="score" value={`${score}/10`} />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="your@email.com" 
                  className="flex-1 px-6 py-4 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
                <button type="submit" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black hover:bg-indigo-700 transition-all">Send Plan</button>
              </form>
            </div>

            <button 
              onClick={() => { setStep('start'); setCurrentQ(0); setScore(0); }}
              className="flex items-center gap-2 mx-auto font-black text-xs uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors"
            >
              <RefreshCw size={14} /> Retake Assessment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessEnglishQuiz;
