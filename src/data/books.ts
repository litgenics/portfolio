export interface Book {
  title: string;
  author: string;
  moods: string[];
  reason: string;
  desc: string;
  englishLevel: 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
  color: string;
}

export const bookDatabase: Book[] = [
  // PHILOSOPHY
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    moods: ["anxious", "stressed", "overwhelmed", "powerless", "seeking-peace"],
    reason: "Stoic wisdom designed to differentiate between internal control and external chaos.",
    desc: "The private reflections of the Roman Emperor on how to live a virtuous and tranquil life.",
    englishLevel: "Advanced",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Letters from a Stoic",
    author: "Seneca",
    moods: ["grieving", "anxious", "ambitious", "stuck", "lonely"],
    reason: "Practical advice on handling wealth, failure, and the inevitability of death.",
    desc: "A collection of letters offering timeless counsel on friendship, courage, and emotions.",
    englishLevel: "Advanced",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "The Enchiridion",
    author: "Epictetus",
    moods: ["frustrated", "resentful", "unhappy", "angry", "seeking-clarity"],
    reason: "A manual for focusing only on what is within our own power to change.",
    desc: "A short, punchy guide to Stoicism that emphasizes personal responsibility.",
    englishLevel: "Intermediate",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    moods: ["hopeless", "depressed", "lost", "suffering", "seeking-purpose"],
    reason: "Argues that finding meaning is the primary motivational force in humans, even in suffering.",
    desc: "A psychiatrist's memoir of surviving Nazi death camps and his discovery of logotherapy.",
    englishLevel: "Intermediate",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    moods: ["existential", "bored", "absurd", "confused", "questioning"],
    reason: "Explores the struggle of finding meaning in an inherently meaningless universe.",
    desc: "A philosophical essay introducing the concept of the Absurd and the importance of revolt.",
    englishLevel: "Expert",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Tao Te Ching",
    author: "Lao Tzu",
    moods: ["busy", "conflicted", "aggressive", "rushed", "seeking-balance"],
    reason: "Teaches the art of effortless action and living in harmony with the natural flow.",
    desc: "The foundational text of Taoism, offering cryptic yet profound insights on life.",
    englishLevel: "Advanced",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    moods: ["rebellious", "cynical", "intellectual", "skeptical", "bold"],
    reason: "Challenges traditional morality and encourages the creation of one's own values.",
    desc: "A scathing critique of Western philosophy and a call for the 'overman'.",
    englishLevel: "Expert",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "The Daily Stoic",
    author: "Ryan Holiday",
    moods: ["distracted", "impatient", "unfocused", "stressed", "seeking-routine"],
    reason: "Provides bite-sized daily reminders to stay grounded and focused on virtue.",
    desc: "366 days of Stoic insights and exercises for modern practitioners.",
    englishLevel: "Intermediate",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "The Prophet",
    author: "Kahlil Gibran",
    moods: ["spiritual", "loving", "reflective", "peaceful", "wondering"],
    reason: "Poetic wisdom on love, marriage, work, and the human condition.",
    desc: "A series of philosophical essays delivered as sermons by a wise man named Almustafa.",
    englishLevel: "Advanced",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Zen and the Art of Motorcycle Maintenance",
    author: "Robert Pirsig",
    moods: ["analytical", "confused", "dissatisfied", "searching", "stuck"],
    reason: "A journey into the concept of 'Quality' and how it connects the mechanical and spiritual.",
    desc: "Part memoir, part philosophical treatise on the nature of Quality.",
    englishLevel: "Expert",
    category: "Philosophy",
    color: "from-blue-500 to-cyan-600"
  },

  // WEALTH
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    moods: ["greedy", "fearful", "irresponsible", "envious", "seeking-stability"],
    reason: "Explains how behavior and ego drive financial success more than technical knowledge.",
    desc: "19 short stories exploring the strange ways people think about money.",
    englishLevel: "Intermediate",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    moods: ["uninformed", "ambitious", "broke", "curious", "seeking-freedom"],
    reason: "Challenges conventional views on work and teaches the importance of financial literacy.",
    desc: "The story of two fathers and the different lessons they taught about money.",
    englishLevel: "Intermediate",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    moods: ["reckless", "patient", "analytical", "fearful", "seeking-safety"],
    reason: "The definitive guide on value investing and protecting yourself from market volatility.",
    desc: "A classic text on investment philosophy and risk management.",
    englishLevel: "Expert",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "The Almanack of Naval Ravikant",
    author: "Eric Jorgenson",
    moods: ["unhappy", "ambitious", "confused", "stuck", "seeking-wisdom"],
    reason: "A collection of insights on wealth creation, happiness, and judgment.",
    desc: "Wisdom from one of Silicon Valley's most influential thinkers on building wealth.",
    englishLevel: "Intermediate",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "Principles",
    author: "Ray Dalio",
    moods: ["indecisive", "ambitious", "systematic", "curious", "seeking-results"],
    reason: "A framework for making decisions based on radical truth and radical transparency.",
    desc: "The unconventional principles that helped build the world's largest hedge fund.",
    englishLevel: "Advanced",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "The Richest Man in Babylon",
    author: "George S. Clason",
    moods: ["broke", "hopeless", "disciplined", "curious", "seeking-wealth"],
    reason: "Timeless parables on saving, investing, and the laws of wealth building.",
    desc: "Set in ancient Babylon, these simple stories provide foundational lessons in finance.",
    englishLevel: "Intermediate",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    moods: ["ambitious", "unmotivated", "doubting", "driven", "seeking-success"],
    reason: "The classic study of the mindset required to achieve immense success and wealth.",
    desc: "Based on interviews with 500 successful people, outlining 13 steps to achievement.",
    englishLevel: "Advanced",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "I Will Teach You to Be Rich",
    author: "Ramit Sethi",
    moods: ["lazy", "overwhelmed", "ambitious", "practical", "seeking-system"],
    reason: "A no-BS, 6-week program to automate your finances and live a 'rich life'.",
    desc: "A modern guide to managing money, focused on conscious spending.",
    englishLevel: "Intermediate",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "The Millionaire Next Door",
    author: "Thomas J. Stanley",
    moods: ["envious", "flashy", "curious", "disciplined", "seeking-truth"],
    reason: "Reveals the surprising habits of America's truly wealthy who live below their means.",
    desc: "A research-based look at the common traits of millionaires.",
    englishLevel: "Intermediate",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },
  {
    title: "Your Money or Your Life",
    author: "Vicki Robin",
    moods: ["burnt-out", "materialistic", "unhappy", "trapped", "seeking-freedom"],
    reason: "Transforms your relationship with money and time, viewing money as 'life energy'.",
    desc: "A 9-step program for achieving financial independence and conscious living.",
    englishLevel: "Intermediate",
    category: "Wealth",
    color: "from-emerald-500 to-teal-700"
  },

  // PRODUCTIVITY
  {
    title: "Atomic Habits",
    author: "James Clear",
    moods: ["unmotivated", "stuck", "inconsistent", "ambitious", "seeking-change"],
    reason: "Provides a practical system for making small changes that lead to remarkable results.",
    desc: "The definitive guide on how to build good habits and break bad ones.",
    englishLevel: "Intermediate",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    moods: ["distracted", "busy", "unproductive", "ambitious", "seeking-focus"],
    reason: "Arguments for the value of concentrated focus in an increasingly distracted world.",
    desc: "Rules for focused success in a distracted world.",
    englishLevel: "Advanced",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "The 4-Hour Workweek",
    author: "Tim Ferriss",
    moods: ["overworked", "trapped", "ambitious", "bored", "seeking-lifestyle"],
    reason: "A blueprint for escaping the 9-5 grind and designing a life of adventure.",
    desc: "The book that popularized lifestyle design and 'mini-retirements'.",
    englishLevel: "Intermediate",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Getting Things Done",
    author: "David Allen",
    moods: ["overwhelmed", "disorganized", "forgetful", "stressed", "seeking-order"],
    reason: "A comprehensive system for capturing and processing all the tasks on your plate.",
    desc: "The art of stress-free productivity, focusing on clear minds.",
    englishLevel: "Advanced",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Essentialism",
    author: "Greg McKeown",
    moods: ["overcommitted", "scattered", "exhausted", "confused", "seeking-priority"],
    reason: "Teaches the disciplined pursuit of less, focusing only on what truly matters.",
    desc: "A manual for cutting out the noise and focusing your energy.",
    englishLevel: "Intermediate",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "The War of Art",
    author: "Steven Pressfield",
    moods: ["procrastinating", "blocked", "fearful", "creative", "seeking-discipline"],
    reason: "Identifies 'Resistance' as the enemy of creativity and provides a plan to defeat it.",
    desc: "A short, powerful book on overcoming internal barriers to creative work.",
    englishLevel: "Intermediate",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    moods: ["bored", "unhappy", "unfocused", "curious", "seeking-happiness"],
    reason: "Explores the psychology of optimal experience and total immersion in activities.",
    desc: "A scientific study of the state of 'flow' and fulfillment.",
    englishLevel: "Expert",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Eat That Frog!",
    author: "Brian Tracy",
    moods: ["lazy", "procrastinating", "overwhelmed", "practical", "seeking-action"],
    reason: "A simple method for tackling your most difficult and important task first.",
    desc: "21 great ways to stop procrastinating and get more done.",
    englishLevel: "Intermediate",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "Indistractable",
    author: "Nir Eyal",
    moods: ["distracted", "addicted", "regretful", "ambitious", "seeking-control"],
    reason: "Reveals the hidden psychology behind distraction and how to master your attention.",
    desc: "How to control your attention and choose your life in a digital world.",
    englishLevel: "Intermediate",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    moods: ["tired", "undisciplined", "ambitious", "seeking-routine", "morning-person"],
    reason: "Advocates for a morning routine to maximize productivity and growth.",
    desc: "A fictional story that imparts lessons on elite performance and mastery.",
    englishLevel: "Intermediate",
    category: "Productivity",
    color: "from-indigo-600 to-blue-700"
  },

  // PSYCHOLOGY
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    moods: ["irrational", "curious", "judgmental", "confused", "seeking-truth"],
    reason: "Explains the two systems of the mind and the biases that cloud our judgment.",
    desc: "A Nobel Prize winner's tour of the mind and cognitive shortcuts.",
    englishLevel: "Expert",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    moods: ["powerless", "ambitious", "vulnerable", "calculating", "seeking-advantage"],
    reason: "A ruthless analysis of power dynamics and how to navigate social hierarchies.",
    desc: "Synthesizes thousands of years of history into 48 laws for power.",
    englishLevel: "Advanced",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Influence",
    author: "Robert Cialdini",
    moods: ["gullible", "persuasive", "curious", "manipulated", "seeking-defense"],
    reason: "Reveals the six psychological triggers that lead people to say 'yes'.",
    desc: "The classic book on persuasion and how to protect yourself.",
    englishLevel: "Advanced",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Daring Greatly",
    author: "Brené Brown",
    moods: ["ashamed", "vulnerable", "fearful", "stuck", "seeking-courage"],
    reason: "Explores how vulnerability is the birthplace of courage, creativity, and connection.",
    desc: "A transformative look at how the courage to be vulnerable changes lives.",
    englishLevel: "Intermediate",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    moods: ["traumatized", "anxious", "disconnected", "pained", "seeking-healing"],
    reason: "Explains how trauma reshapes the brain and body, and offers paths to recovery.",
    desc: "A pioneering study on how trauma affects the human system.",
    englishLevel: "Expert",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Predictably Irrational",
    author: "Dan Ariely",
    moods: ["curious", "irrational", "confused", "analytical", "seeking-logic"],
    reason: "Shows how we consistently make illogical decisions in predictable ways.",
    desc: "Explores the hidden forces that shape our decisions.",
    englishLevel: "Advanced",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Quiet",
    author: "Susan Cain",
    moods: ["introverted", "misunderstood", "socially-anxious", "quiet", "seeking-strength"],
    reason: "Validates the power of introverts in a world that can't stop talking.",
    desc: "An exploration of the introvert-extrovert divide and contemplation.",
    englishLevel: "Advanced",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Emotional Intelligence",
    author: "Daniel Goleman",
    moods: ["angry", "unaware", "disconnected", "reactive", "seeking-empathy"],
    reason: "Argues that EQ is more important for success and happiness than IQ.",
    desc: "The book that redefined intelligence and self-awareness.",
    englishLevel: "Advanced",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    moods: ["lonely", "ambitious", "awkward", "clueless", "seeking-connection"],
    reason: "Timeless advice on how to build relationships and win people over.",
    desc: "The original self-help book for social success and communication.",
    englishLevel: "Intermediate",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "The Paradox of Choice",
    author: "Barry Schwartz",
    moods: ["indecisive", "unhappy", "overwhelmed", "regretful", "seeking-contentment"],
    reason: "Explains why having more options can lead to less satisfaction and more anxiety.",
    desc: "Why less is more in a world of endless choices.",
    englishLevel: "Advanced",
    category: "Psychology",
    color: "from-purple-500 to-indigo-600"
  },

  // FICTION
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    moods: ["lost", "hopeful", "dreamy", "searching", "seeking-destiny"],
    reason: "A metaphorical fable about following your heart and pursuing your personal legend.",
    desc: "The story of a shepherd boy's journey to the pyramids.",
    englishLevel: "Intermediate",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "1984",
    author: "George Orwell",
    moods: ["paranoid", "rebellious", "cynical", "oppressed", "seeking-truth"],
    reason: "A chilling warning about totalitarianism, surveillance, and language manipulation.",
    desc: "The classic dystopian novel about Big Brother and individual freedom.",
    englishLevel: "Advanced",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    moods: ["numb", "questioning", "bored", "skeptical", "seeking-reality"],
    reason: "Explores a future where happiness is manufactured and individuality is suppressed.",
    desc: "A dystopian vision of a world controlled by pleasure and engineering.",
    englishLevel: "Advanced",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    moods: ["nostalgic", "ambitious", "melancholy", "lonely", "seeking-love"],
    reason: "A critique of the American Dream and the emptiness of wealth without meaning.",
    desc: "A tragic story of obsession and class in the Roaring Twenties.",
    englishLevel: "Advanced",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    moods: ["childlike", "lonely", "spiritual", "sad", "seeking-innocence"],
    reason: "Beautiful insights on friendship, love, and what truly matters in life.",
    desc: "A tender story of a pilot and a prince from another planet.",
    englishLevel: "Intermediate",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Siddhartha",
    author: "Hermann Hesse",
    moods: ["searching", "spiritual", "restless", "dissatisfied", "seeking-peace"],
    reason: "A journey of self-discovery and enlightenment through different life stages.",
    desc: "The story of a man's spiritual journey in ancient India.",
    englishLevel: "Advanced",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    moods: ["guilty", "tormented", "analytical", "dark", "seeking-redemption"],
    reason: "A deep dive into the psychology of guilt, morality, and consequences.",
    desc: "A student commits a murder and is haunted by his conscience.",
    englishLevel: "Expert",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    moods: ["determined", "tired", "struggling", "resilient", "seeking-honor"],
    reason: "A powerful story of perseverance and the struggle of man against nature.",
    desc: "An aging fisherman's epic battle with a giant marlin.",
    englishLevel: "Intermediate",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Fight Club",
    author: "Chuck Palahniuk",
    moods: ["angry", "numb", "rebellious", "lost", "seeking-feeling"],
    reason: "A visceral critique of consumer culture and the search for identity.",
    desc: "An insomniac office worker starts an underground fight club.",
    englishLevel: "Advanced",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },
  {
    title: "Life of Pi",
    author: "Yann Martel",
    moods: ["surviving", "spiritual", "hopeless", "wondering", "seeking-faith"],
    reason: "Explores the power of storytelling and the nature of belief in survival.",
    desc: "A young boy survives a shipwreck and shares a boat with a tiger.",
    englishLevel: "Advanced",
    category: "Fiction",
    color: "from-pink-500 to-rose-600"
  },

  // SCIENCE
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    moods: ["curious", "existential", "analytical", "amazed", "seeking-perspective"],
    reason: "Provides a sweeping history of humankind and the myths that bind us together.",
    desc: "A brief history of our species, from ancient times to the present.",
    englishLevel: "Advanced",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    moods: ["curious", "amazed", "analytical", "humbled", "seeking-cosmos"],
    reason: "Explains complex cosmological concepts like black holes in accessible terms.",
    desc: "The landmark book on the nature of space, time, and the universe.",
    englishLevel: "Expert",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    moods: ["analytical", "skeptical", "curious", "ruthless", "seeking-truth"],
    reason: "Shifts the perspective of evolution to the gene level, explaining behavior.",
    desc: "A revolutionary book on evolutionary biology and drivers of behavior.",
    englishLevel: "Expert",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    moods: ["curious", "fearful", "hopeful", "analytical", "seeking-origins"],
    reason: "A comprehensive history of genetics and what it means to be human.",
    desc: "An intimate history of the gene, blending science and memoir.",
    englishLevel: "Expert",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    moods: ["wondering", "inspired", "peaceful", "curious", "seeking-connection"],
    reason: "A poetic exploration of the universe and our place within it.",
    desc: "The classic book that brings the wonders of astronomy to life.",
    englishLevel: "Advanced",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    moods: ["analytical", "curious", "skeptical", "wondering", "seeking-reasons"],
    reason: "Explains why some civilizations succeeded while others failed.",
    desc: "The fates of human societies through geography and biology.",
    englishLevel: "Expert",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "The Emperor of All Maladies",
    author: "Siddhartha Mukherjee",
    moods: ["pained", "hopeful", "curious", "analytical", "seeking-understanding"],
    reason: "A 'biography' of cancer, exploring its history and our future battle.",
    desc: "An epic story of a disease that has haunted humanity.",
    englishLevel: "Expert",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Being Mortal",
    author: "Atul Gawande",
    moods: ["aging", "grieving", "practical", "fearful", "seeking-dignity"],
    reason: "A surgeon's reflection on the limitations of medicine and living well.",
    desc: "A powerful book on aging, death, and medicine's ultimate goal.",
    englishLevel: "Advanced",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "The Sixth Extinction",
    author: "Elizabeth Kolbert",
    moods: ["concerned", "guilty", "alarmed", "curious", "seeking-awareness"],
    reason: "Documents the ongoing mass extinction caused by human activity.",
    desc: "An unnatural history of the planet and the crisis we are creating.",
    englishLevel: "Advanced",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Loonshots",
    author: "Safi Bahcall",
    moods: ["creative", "ambitious", "analytical", "stuck", "seeking-innovation"],
    reason: "Uses physics to explain why great ideas get killed and how to nurture them.",
    desc: "How to nurture the crazy ideas that change industries.",
    englishLevel: "Advanced",
    category: "Science",
    color: "from-amber-400 to-orange-500"
  },

  // BIOGRAPHY
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    moods: ["ambitious", "creative", "perfectionist", "inspired", "seeking-excellence"],
    reason: "A detailed look at the life of a visionary who blended technology and art.",
    desc: "The exclusive biography of the co-founder of Apple.",
    englishLevel: "Advanced",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Shoe Dog",
    author: "Phil Knight",
    moods: ["struggling", "ambitious", "inspired", "uncertain", "seeking-persistence"],
    reason: "An honest account of the early days of Nike and the grit required to build.",
    desc: "A memoir by the creator of Nike about building a startup.",
    englishLevel: "Intermediate",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Elon Musk",
    author: "Ashlee Vance",
    moods: ["ambitious", "driven", "overwhelmed", "visionary", "seeking-impact"],
    reason: "Explores the relentless drive and risks taken by the man behind SpaceX and Tesla.",
    desc: "A biography of the entrepreneur who wants to colonize Mars.",
    englishLevel: "Advanced",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    moods: ["hopeful", "reflective", "inspired", "growing", "seeking-identity"],
    reason: "A deeply personal account of a life lived with purpose and grace.",
    desc: "The memoir of the former First Lady of the United States.",
    englishLevel: "Intermediate",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "The Autobiography of Malcolm X",
    author: "Malcolm X & Alex Haley",
    moods: ["angry", "transforming", "seeking-truth", "rebellious", "determined"],
    reason: "A powerful story of personal transformation and the fight for justice.",
    desc: "The account of one of the most influential African Americans in history.",
    englishLevel: "Advanced",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Can't Hurt Me",
    author: "David Goggins",
    moods: ["unmotivated", "lazy", "stuck", "weak", "seeking-toughness"],
    reason: "Shows how to master your mind through extreme physical and mental tests.",
    desc: "A Navy SEAL's story of overcoming trauma to become tough.",
    englishLevel: "Intermediate",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Titan",
    author: "Ron Chernow",
    moods: ["ambitious", "analytical", "calculating", "curious", "seeking-wealth"],
    reason: "A massive biography of John D. Rockefeller and American capitalism.",
    desc: "The life of the man who became the world's first billionaire.",
    englishLevel: "Expert",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Long Walk to Freedom",
    author: "Nelson Mandela",
    moods: ["resilient", "patient", "hopeful", "oppressed", "seeking-justice"],
    reason: "A testament to the human spirit's ability to endure and triumph.",
    desc: "The autobiography of the anti-apartheid revolutionary.",
    englishLevel: "Advanced",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Total Recall",
    author: "Arnold Schwarzenegger",
    moods: ["ambitious", "focused", "inspired", "disciplined", "seeking-success"],
    reason: "The story of a man who conquered bodybuilding, acting, and politics.",
    desc: "The unbelievably true life story of Arnold Schwarzenegger.",
    englishLevel: "Intermediate",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },
  {
    title: "Open",
    author: "Andre Agassi",
    moods: ["resentful", "confused", "vulnerable", "successful", "seeking-peace"],
    reason: "A candid look at the pressure of sports and hating what you're good at.",
    desc: "The honest and gripping memoir of a tennis icon.",
    englishLevel: "Intermediate",
    category: "Biography",
    color: "from-slate-700 to-slate-900"
  },

  // BUSINESS
  {
    title: "Zero to One",
    author: "Peter Thiel",
    moods: ["innovative", "ambitious", "rebellious", "calculating", "seeking-future"],
    reason: "Challenges business wisdom and encourages building unique companies.",
    desc: "Notes on startups, or how to build the future.",
    englishLevel: "Advanced",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    moods: ["confused", "ambitious", "practical", "stuck", "seeking-efficiency"],
    reason: "A systematic approach to building businesses that avoids wasting time.",
    desc: "How today's entrepreneurs use continuous innovation.",
    englishLevel: "Advanced",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "Good to Great",
    author: "Jim Collins",
    moods: ["ambitious", "analytical", "driven", "stagnant", "seeking-excellence"],
    reason: "Explains why some companies make the leap to greatness.",
    desc: "A data-driven study of exceptional companies.",
    englishLevel: "Expert",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "Hard Things About Hard Things",
    author: "Ben Horowitz",
    moods: ["stressed", "failing", "ambitious", "lonely", "seeking-guidance"],
    reason: "Real-world advice on managing through crises when there are no easy answers.",
    desc: "Building a business when there are no easy answers.",
    englishLevel: "Advanced",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "Extreme Ownership",
    author: "Jocko Willink & Leif Babin",
    moods: ["blaming", "weak", "unfocused", "ambitious", "seeking-leadership"],
    reason: "Teaches that leaders must take 100% responsibility for everything.",
    desc: "How Navy SEALs lead and win in business and life.",
    englishLevel: "Intermediate",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "High Output Management",
    author: "Andrew Grove",
    moods: ["busy", "inefficient", "ambitious", "systematic", "seeking-leverage"],
    reason: "The definitive guide on how to manage people and increase productivity.",
    desc: "Wisdom from the former CEO of Intel on management.",
    englishLevel: "Expert",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "The E-Myth Revisited",
    author: "Michael Gerber",
    moods: ["overworked", "stressed", "trapped", "practical", "seeking-scale"],
    reason: "Explains why most small businesses fail and how to work 'on' your business.",
    desc: "Why most small businesses don't work and what to do.",
    englishLevel: "Intermediate",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "Purple Cow",
    author: "Seth Godin",
    moods: ["boring", "invisible", "creative", "ambitious", "seeking-attention"],
    reason: "Urges businesses to be remarkable instead of just 'good enough'.",
    desc: "Transform your business by being remarkable.",
    englishLevel: "Intermediate",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "Never Split the Difference",
    author: "Chris Voss",
    moods: ["anxious", "vulnerable", "ambitious", "conflict-averse", "seeking-control"],
    reason: "Teaches negotiation techniques from an FBI hostage negotiator.",
    desc: "Negotiating as if your life depended on it.",
    englishLevel: "Advanced",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },
  {
    title: "Start with Why",
    author: "Simon Sinek",
    moods: ["uninspired", "confused", "ambitious", "lost", "seeking-purpose"],
    reason: "Argues that people don't buy what you do, they buy why you do it.",
    desc: "How great leaders inspire action by starting with 'why'.",
    englishLevel: "Intermediate",
    category: "Business",
    color: "from-red-600 to-orange-700"
  },

  // HISTORY
  {
    title: "The Silk Roads",
    author: "Peter Frankopan",
    moods: ["curious", "analytical", "ignorant", "amazed", "seeking-perspective"],
    reason: "Reframes world history by looking at the East and trade routes.",
    desc: "A new history of the world, focusing on the East.",
    englishLevel: "Expert",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "The Lessons of History",
    author: "Will & Ariel Durant",
    moods: ["reflective", "cynical", "curious", "existential", "seeking-patterns"],
    reason: "A concise summary of recurring themes and patterns of human history.",
    desc: "Masterpiece condensing thousands of years of history.",
    englishLevel: "Expert",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "Postwar",
    author: "Tony Judt",
    moods: ["curious", "analytical", "serious", "somber", "seeking-knowledge"],
    reason: "A definitive history of Europe since 1945, explaining reconstruction.",
    desc: "A massive account of European history after WWII.",
    englishLevel: "Expert",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "The Rise and Fall of the Third Reich",
    author: "William L. Shirer",
    moods: ["alarmed", "serious", "curious", "somber", "seeking-understanding"],
    reason: "A detailed account of Nazi Germany's rise and destruction.",
    desc: "The history of Nazi Germany by a journalist who was there.",
    englishLevel: "Expert",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "SPQR",
    author: "Mary Beard",
    moods: ["curious", "analytical", "amazed", "academic", "seeking-origins"],
    reason: "A lively and scholarly history of ancient Rome.",
    desc: "A history of ancient Rome by a leading classicist.",
    englishLevel: "Advanced",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "A People's History of the United States",
    author: "Howard Zinn",
    moods: ["skeptical", "angry", "curious", "empathetic", "seeking-truth"],
    reason: "Tells American history from the perspective of the marginalized.",
    desc: "A book that challenges traditional American narratives.",
    englishLevel: "Advanced",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "The Wright Brothers",
    author: "David McCullough",
    moods: ["inspired", "curious", "amazed", "determined", "seeking-innovation"],
    reason: "A story of incredible perseverance and the birth of aviation.",
    desc: "The story of the two brothers who taught the world to fly.",
    englishLevel: "Intermediate",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "Genghis Khan and the Making of the Modern World",
    author: "Jack Weatherford",
    moods: ["curious", "surprised", "analytical", "amazed", "seeking-perspective"],
    reason: "Argues that Genghis Khan was a sophisticated and influential leader.",
    desc: "How the Mongol Empire laid globalized foundations.",
    englishLevel: "Advanced",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "Team of Rivals",
    author: "Doris Kearns Goodwin",
    moods: ["ambitious", "analytical", "seeking-leadership", "inspired", "serious"],
    reason: "Shows how Abraham Lincoln's genius helped him lead through the Civil War.",
    desc: "The political genius of Lincoln and his cabinet.",
    englishLevel: "Expert",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },
  {
    title: "The Splendid and the Vile",
    author: "Erik Larson",
    moods: ["anxious", "inspired", "resilient", "serious", "seeking-courage"],
    reason: "A gripping account of Winston Churchill's leadership during the Blitz.",
    desc: "A saga of Churchill and defiance during Britain's darkest hour.",
    englishLevel: "Advanced",
    category: "History",
    color: "from-yellow-600 to-amber-700"
  },

  // HEALTH
  {
    title: "Why We Sleep",
    author: "Matthew Walker",
    moods: ["tired", "anxious", "unhealthy", "foggy", "seeking-performance"],
    reason: "Explains the vital importance of sleep for every aspect of health.",
    desc: "A scientific look at the power of sleep and dreaming.",
    englishLevel: "Advanced",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "How Not to Die",
    author: "Michael Greger",
    moods: ["fearful", "unhealthy", "practical", "curious", "seeking-longevity"],
    reason: "A scientific look at how diet can prevent and reverse chronic diseases.",
    desc: "Discover the foods proven to prevent and reverse disease.",
    englishLevel: "Advanced",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Breath",
    author: "James Nestor",
    moods: ["anxious", "stressed", "tired", "curious", "seeking-calm"],
    reason: "Reveals how breathing correctly can transform our health.",
    desc: "The new science of a lost art, exploring how we breathe.",
    englishLevel: "Intermediate",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "The Blue Zones",
    author: "Dan Buettner",
    moods: ["lonely", "unhealthy", "searching", "curious", "seeking-long-life"],
    reason: "Studies the habits of the world's longest-lived people.",
    desc: "Lessons for living longer from the people who've lived the longest.",
    englishLevel: "Intermediate",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Atomic Habits for Health",
    author: "James Clear",
    moods: ["inconsistent", "unmotivated", "unhealthy", "ambitious", "seeking-vitality"],
    reason: "Applies habit-building principles specifically to fitness and nutrition.",
    desc: "Tiny changes and remarkable results for your health.",
    englishLevel: "Intermediate",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Exercised",
    author: "Daniel Lieberman",
    moods: ["lazy", "guilty", "curious", "analytical", "seeking-fitness"],
    reason: "An evolutionary look at why we should exercise even if we didn't evolve to.",
    desc: "The science of physical activity from an evolutionary perspective.",
    englishLevel: "Advanced",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Brain Maker",
    author: "David Perlmutter",
    moods: ["foggy", "depressed", "unhealthy", "curious", "seeking-clarity"],
    reason: "Explores the connection between gut health and brain function.",
    desc: "The power of gut microbes to heal and protect your brain.",
    englishLevel: "Advanced",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Spark",
    author: "John Ratey",
    moods: ["unfocused", "unhappy", "lazy", "anxious", "seeking-sharpness"],
    reason: "Explains how exercise literally builds a better brain and improves mood.",
    desc: "The revolutionary new science of exercise and the brain.",
    englishLevel: "Advanced",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Deep Nutrition",
    author: "Catherine Shanahan",
    moods: ["unhealthy", "curious", "analytical", "confused", "seeking-foundation"],
    reason: "Arguments for returning to traditional ways of eating.",
    desc: "Why your genes need traditional food for health.",
    englishLevel: "Advanced",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "The Joy of Movement",
    author: "Kelly McGonigal",
    moods: ["depressed", "lonely", "lazy", "inspired", "seeking-connection"],
    reason: "Explores how physical activity can lead to happiness and connection.",
    desc: "How exercise helps us find happiness, hope, and courage.",
    englishLevel: "Intermediate",
    category: "Health",
    color: "from-green-500 to-emerald-600"
  }
];
