"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, RotateCcw, Brain, GraduationCap } from "lucide-react";

const decks = {
  "Medical English": [
    { term: "Diagnosis", def: "The identification of the nature of an illness or other problem by examination of the symptoms.", ex: "The doctor is waiting for the results before making a diagnosis." },
    { term: "Prognosis", def: "The likely course of a disease or ailment.", ex: "The prognosis for a full recovery is excellent." },
    { term: "Chronic", def: "Persisting for a long time or constantly recurring.", ex: "He suffers from chronic back pain." }
  ],
  "Project Management": [
    { term: "Stakeholder", def: "A person with an interest or concern in something, especially a business.", ex: "We need to identify all stakeholders before starting the project." },
    { term: "Milestone", def: "A significant stage or event in the development of something.", ex: "Completing the prototype is a major milestone." },
    { term: "Scope Creep", def: "Uncontrolled changes or continuous growth in a project's scope.", ex: "We need to manage scope creep to stay on budget." }
  ],
  "IT & Tech": [
    { term: "Scalability", def: "The capacity to be changed in size or scale.", ex: "Our new architecture offers great scalability." },
    { term: "Deployment", def: "The action of bringing resources into effective action.", ex: "The deployment of the new software is scheduled for Sunday." },
    { term: "Legacy System", def: "An old method, technology, or computer system.", ex: "We are migrating data from our legacy system to the cloud." }
  ]
};

const VocabFlashcards = () => {
  const [selectedDeck, setSelectedDeck] = useState<keyof typeof decks>("Medical English");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = decks[selectedDeck][currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % decks[selectedDeck].length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + decks[selectedDeck].length) % decks[selectedDeck].length);
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Deck Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {Object.keys(decks).map((deck) => (
          <button
            key={deck}
            onClick={() => {
              setSelectedDeck(deck as keyof typeof decks);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
              selectedDeck === deck 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 scale-105" 
                : "glass text-slate-500 hover:text-indigo-600"
            }`}
          >
            {deck}
          </button>
        ))}
      </div>

      {/* Flashcard Area */}
      <div className="relative h-[400px] w-full max-w-md mx-auto perspective-1000">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-full cursor-pointer preserve-3d"
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden glass rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border-2 border-indigo-100 dark:border-indigo-900/30 shadow-2xl">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl flex items-center justify-center text-indigo-600 mb-8">
              <BookOpen size={32} />
            </div>
            <h3 className="text-4xl font-black tracking-tighter text-slate-800 dark:text-white uppercase">
              {currentCard.term}
            </h3>
            <p className="mt-8 text-xs font-black text-indigo-500 uppercase tracking-[0.3em]">Click to reveal</p>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 backface-hidden glass rounded-[3rem] p-12 flex flex-col items-center justify-center text-center border-2 border-indigo-600/20 shadow-2xl bg-indigo-600 text-white"
            style={{ transform: "rotateY(180) rotateZ(180deg)", rotate: "180deg" }}
          >
            <div className="w-full">
              <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-4">Definition</p>
              <p className="text-xl font-bold leading-relaxed mb-8">
                {currentCard.def}
              </p>
              <div className="h-px w-12 bg-indigo-400 mx-auto mb-8 opacity-30" />
              <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-4">Example</p>
              <p className="italic text-lg font-medium">
                "{currentCard.ex}"
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-8 mt-12">
        <button 
          onClick={handlePrev}
          className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="font-black text-lg tracking-tighter text-slate-400">
          <span className="text-slate-800 dark:text-white">{currentIndex + 1}</span> / {decks[selectedDeck].length}
        </div>
        <button 
          onClick={handleNext}
          className="w-14 h-14 rounded-2xl glass flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-20 bg-slate-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 opacity-10">
          <GraduationCap size={200} className="text-white" />
        </div>
        <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
          Master your <span className="text-indigo-400">Industry Vocabulary</span>
        </h3>
        <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
          Need a personalized deck for your specific career path? Our Premium Coaching includes custom vocabulary building.
        </p>
        <button className="bg-white text-slate-900 px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center gap-3 mx-auto">
          Get Custom Curriculum <Brain size={20} />
        </button>
      </motion.div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default VocabFlashcards;
