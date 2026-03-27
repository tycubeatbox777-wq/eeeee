import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MonitorPlay, Terminal, Code2, Bot, Zap, ShieldCheck, CheckCircle2, XCircle, Lightbulb, PartyPopper, Bug, Bus, MapPin, Sun, Cloud, TreePine, Mountain, Building2, Bird, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

type SlideLayout = 'title' | 'bullets' | 'code' | 'split' | 'comparison' | 'task' | 'game' | 'simple-explain' | 'prompt-compare';

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  layout?: SlideLayout;
  icon?: React.ReactNode;
  codeSnippet?: string;
}

const BusGameSlide = ({ onWin }: { onWin: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [won, setWon] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);

  const playGreeting = () => {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const text = "Hello, I am Marcin's AI agent. He asked me to do a demo for you today... Hahaha, no, I am just kidding. Let's get started!";
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a male English voice (preferably Microsoft/Edge)
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Male') || v.name.includes('Guy') || v.name.includes('David') || v.name.includes('Mark') || v.name.includes('Microsoft'))
    );
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 0.8; // Lower pitch for a more masculine voice
    window.speechSynthesis.speak(utterance);
  };

  const handleGas = () => {
    if (won) return;
    setIsAccelerating(true);
    setTimeout(() => setIsAccelerating(false), 200);

    const newProgress = Math.min(progress + 2, 100);
    setProgress(newProgress);
    
    if (newProgress >= 100 && !won) {
      setWon(true);
      confetti({
        particleCount: 400,
        spread: 160,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#a855f7']
      });
      setTimeout(() => {
        onWin();
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-between w-full relative overflow-hidden bg-gradient-to-b from-sky-400 via-blue-300 to-indigo-900">
      {/* Sky Elements */}
      <div className="absolute top-10 right-20 text-yellow-300 drop-shadow-[0_0_60px_rgba(253,224,71,1)]">
        <Sun className="w-56 h-56 animate-[spin_30s_linear_infinite]" />
      </div>
      
      <motion.div className="absolute top-16 left-32 text-white/80" animate={{ x: [0, 80, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}>
        <Cloud className="w-56 h-56" />
      </motion.div>
      
      <motion.div className="absolute top-32 right-1/3 text-white/60" animate={{ x: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}>
        <Cloud className="w-40 h-40" />
      </motion.div>

      {/* Birds */}
      <motion.div className="absolute top-24 left-1/4 text-gray-800/40" animate={{ y: [0, -10, 0], x: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <Bird className="w-12 h-12" />
      </motion.div>
      <motion.div className="absolute top-20 left-[28%] text-gray-800/40" animate={{ y: [0, -15, 0], x: [0, 30, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <Bird className="w-10 h-10" />
      </motion.div>

      {/* Mountains (Parallax slow) */}
      <div 
        className="absolute bottom-64 w-[400%] flex justify-around text-indigo-800/40 transition-transform duration-1000 ease-out" 
        style={{ transform: `translateX(-${progress * 0.3}%)` }}
      >
        {[...Array(12)].map((_, i) => (
          <Mountain key={i} className="w-[600px] h-[600px]" />
        ))}
      </div>

      {/* City Skyline (Parallax medium-slow) */}
      <div 
        className="absolute bottom-56 w-[300%] flex justify-around text-slate-700/50 transition-transform duration-1000 ease-out" 
        style={{ transform: `translateX(-${progress * 0.6}%)` }}
      >
        {[...Array(20)].map((_, i) => (
          <Building2 key={i} className="w-64 h-64" />
        ))}
      </div>

      {/* Trees (Parallax medium) */}
      <div 
        className="absolute bottom-48 w-[300%] flex justify-around text-green-800/80 transition-transform duration-1000 ease-out" 
        style={{ transform: `translateX(-${progress * 1.2}%)` }}
      >
        {[...Array(25)].map((_, i) => (
          <TreePine key={i} className="w-80 h-80" />
        ))}
      </div>

      {/* Title overlay */}
      <div className="z-20 text-center mt-12 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 drop-shadow-2xl shadow-white">
          VMM & FD AI session
        </h1>
        <p className="text-2xl text-white bg-black/60 inline-block px-8 py-3 rounded-full backdrop-blur-md border border-gray-500 shadow-2xl font-bold">
          Drive the bus to DEMO to start! 🚌💨
        </p>
      </div>
      
      {/* Hidden AI Greeting Button */}
      <button 
        onClick={playGreeting}
        className="absolute bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 bg-gray-800/50 hover:bg-purple-600/80 text-white/50 hover:text-white rounded-full transition-all border border-transparent hover:border-purple-400 hover:scale-110 active:scale-95 backdrop-blur-sm"
        title="Play AI Greeting"
      >
        <Volume2 className="w-5 h-5" />
      </button>
      
      <div className="w-full flex flex-col items-center">
        {/* Road */}
        <div className="w-full h-72 bg-gradient-to-b from-gray-600 to-gray-900 relative border-t-[16px] border-green-700 flex items-center justify-center shadow-[inset_0_30px_40px_rgba(0,0,0,0.8)]">
          {/* Grass edge */}
          <div className="absolute top-0 w-full h-4 bg-green-600/40" />
          
          {/* Dashed line moving */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            <div 
              className="absolute w-[400%] h-4 flex gap-20 transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${(progress * 30) % 200}px)` }}
            >
              {[...Array(60)].map((_, i) => (
                <div key={i} className="w-20 h-full bg-yellow-400/80 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
              ))}
            </div>
          </div>

          {/* Destination Markers */}
          {[
            { name: 'DEMO', offset: 0, pinColor: 'text-red-500', bgColor: 'bg-red-600', borderColor: 'border-red-300', shadow: 'drop-shadow-[0_0_30px_rgba(239,68,68,1)]' },
            { name: 'India', offset: 20, pinColor: 'text-orange-500', bgColor: 'bg-orange-600', borderColor: 'border-orange-300', shadow: 'drop-shadow-[0_0_30px_rgba(249,115,22,1)]' },
            { name: 'Argentina', offset: 40, pinColor: 'text-blue-400', bgColor: 'bg-blue-500', borderColor: 'border-blue-200', shadow: 'drop-shadow-[0_0_30px_rgba(59,130,246,1)]' },
            { name: 'Poland', offset: 60, pinColor: 'text-gray-100', bgColor: 'bg-gray-100', borderColor: 'border-red-500', shadow: 'drop-shadow-[0_0_30px_rgba(255,255,255,1)]', textColor: 'text-red-600' },
            { name: 'Columbia', offset: 80, pinColor: 'text-yellow-400', bgColor: 'bg-yellow-500', borderColor: 'border-blue-600', shadow: 'drop-shadow-[0_0_30px_rgba(234,179,8,1)]', textColor: 'text-blue-900' },
          ].map((marker, idx) => (
            <div 
              key={idx}
              className="absolute bottom-20 flex flex-col items-center z-10 transition-all duration-1000 ease-out"
              style={{ left: `${100 + marker.offset - progress * 0.8}%`, transform: 'translateX(-50%)' }}
            >
              <MapPin 
                className={`w-24 h-24 md:w-32 md:h-32 ${marker.pinColor} mb-2 animate-bounce ${marker.shadow}`} 
                style={{ animationDelay: `${idx * 0.15}s` }} 
              />
              <span className={`whitespace-nowrap font-black text-2xl md:text-4xl ${marker.textColor || 'text-white'} ${marker.bgColor} px-6 md:px-8 py-2 md:py-3 rounded-2xl shadow-2xl border-4 ${marker.borderColor}`}>
                {marker.name}
              </span>
            </div>
          ))}
          
          {/* Bus */}
          <motion.div 
            className="absolute bottom-12 z-20"
            style={{ left: '20%', transform: 'translateX(-50%)' }}
            animate={{ 
              y: isAccelerating ? [-8, 8, -8] : [0, -4, 0],
              rotate: isAccelerating ? -4 : 0
            }}
            transition={{ 
              y: { duration: 0.3, repeat: Infinity },
              rotate: { duration: 0.15 }
            }}
          >
            <div className="relative">
              <div className="bg-blue-600 rounded-3xl p-5 shadow-[0_15px_50px_rgba(59,130,246,0.9)] border-4 border-blue-300">
                <Bus className="w-40 h-40 text-white" />
              </div>
              <span className="absolute -top-16 left-1/2 -translate-x-1/2 text-3xl font-black bg-yellow-400 px-10 py-3 rounded-full text-black whitespace-nowrap shadow-2xl border-4 border-yellow-500">
                VMM & FD
              </span>
              {isAccelerating && (
                <motion.div 
                  initial={{ opacity: 1, x: 0, scale: 1 }}
                  animate={{ opacity: 0, x: -100, scale: 3 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-6 -left-20 text-gray-300 text-6xl drop-shadow-lg"
                >
                  💨
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Controls Area */}
        <div className="h-48 flex items-center justify-center bg-[#0a0a0a] w-full z-20 border-t-4 border-gray-800">
          <button 
            onClick={handleGas}
            disabled={won}
            className="bg-green-600 hover:bg-green-500 text-white font-black text-6xl py-8 px-32 rounded-full shadow-[0_0_60px_rgba(22,163,74,0.7)] hover:shadow-[0_0_80px_rgba(22,163,74,1)] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer flex items-center gap-6 border-8 border-green-400"
          >
            GAS! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

const slides: SlideData[] = [
  {
    id: 0,
    title: "VMM & FD AI session",
    content: [],
    layout: 'game'
  },
  {
    id: 1,
    title: "AI Models for Your Dev Workflow",
    subtitle: "2026 Edition",
    content: [
      "How LLMs work",
      "Which models are best right now",
      "GitHub Copilot in VS Code",
      "Droid and Claude Code intro",
      "Real benchmarks"
    ],
    layout: 'title',
    icon: <MonitorPlay className="w-20 h-20 text-blue-500 mb-8" />
  },
  {
    id: 2,
    title: "How LLMs Work (Simply)",
    subtitle: "Think of it as super-powered autocomplete 📱",
    content: [
      "They don't 'think' like humans. They predict the most likely next word (token) based on massive training data.",
      "Example prompt: 'The developer drank coffee and...'",
      "➡️ 'started coding' (85%)",
      "➡️ 'fixed the bug' (10%)",
      "➡️ 'cried' (5%)"
    ],
    layout: 'simple-explain',
    icon: <Bot className="w-12 h-12 text-purple-500" />
  },
  {
    id: 3,
    title: "The Big Players Right Now",
    content: [
      "Claude Opus 4.6 and Sonnet 4.6 (Anthropic)",
      "GPT-5.4 (OpenAI)",
      "Gemini 3.1 Pro (Google)",
      "DeepSeek V3.2 (open source)"
    ],
    subtitle: "All top-tier in 2026.",
    layout: 'bullets',
    icon: <Zap className="w-12 h-12 text-yellow-500" />
  },
  {
    id: 35,
    title: "Same Prompt, Different Models",
    subtitle: 'Prompt: "Explain a database index in one short sentence to a 5-year-old."',
    content: [
      "Claude 4.6|It's like a magical bookmark that helps the computer find your favorite storybook instantly without flipping through every page.",
      "GPT-5.4|An index is like a library's alphabet poster that tells you exactly which shelf your toy is on so you don't have to look everywhere.",
      "Gemini 3.1 Pro|It's a super fast treasure map that shows the computer exactly where the data is hiding!"
    ],
    layout: 'prompt-compare',
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />
  },
  {
    id: 4,
    title: "Models in GitHub Copilot",
    subtitle: "VS Code Integration",
    content: [
      "Copilot now lets you switch models dynamically.",
      "Claude Sonnet 4.6 (default agent)",
      "GPT-4o, o3, Gemini",
      "Pick the right one for the task.",
      "• Recommended: Gemini 3.1 Pro (Best for frontend)",
      "• Recommended: Claude Opus 4.6 (Best for coding and debugging)",
      "• Recommended: GPT-5.4 (Fast autocomplete and general tasks)"
    ],
    layout: 'bullets',
    icon: <Code2 className="w-12 h-12 text-blue-400" />
  },
  {
    id: 5,
    title: "Which Model for Which Task?",
    content: [
      "Gemini 3.1 Pro: best for frontend.",
      "Claude Opus 4.6: best for coding and debugging.",
      "GPT-5.4: fast autocomplete and chat."
    ],
    layout: 'split'
  },
  {
    id: 6,
    title: "Latest Benchmarks",
    subtitle: "What this means in practice (March 2026)",
    content: [
      "• Claude Opus 4.6 & Gemini 3.1 Pro (~80%): They can autonomously fix 8 out of 10 real-world GitHub bugs. (Best for Software Engineering)",
      "• GPT-5.4 (75%): The smartest model for running terminal commands and managing servers. (Best for DevOps)",
      "• Claude Sonnet 4.6: The top performer for daily office tasks, emails, and documentation. (Best for General Work)"
    ],
    layout: 'bullets'
  },
  {
    id: 7,
    title: "Prompt Engineering",
    subtitle: "Do This, Not That",
    content: [
      "Bad: fix my code.",
      "Good: this Python function fails with TypeError on line 12, here is the stack trace, fix it and explain why.",
      "Context is everything."
    ],
    layout: 'comparison'
  },
  {
    id: 8,
    title: "Practical Examples — QA",
    content: [
      "Ask AI to write Cypress tests from a user story.",
      "Paste a failing test and ask why it fails.",
      "Generate edge cases for a form.",
      "Real prompts shown."
    ],
    layout: 'bullets',
    icon: <ShieldCheck className="w-12 h-12 text-green-500" />
  },
  {
    id: 9,
    title: "Practical Examples — DevOps",
    content: [
      "Paste a CI/CD error and ask for fix.",
      "Ask to generate a GitHub Actions workflow.",
      "Explain a Dockerfile.",
      "Summarize a long log file."
    ],
    layout: 'bullets',
    icon: <Terminal className="w-12 h-12 text-orange-500" />
  },
  {
    id: 10,
    title: "What is Factory Droid?",
    content: [
      "Factory Droid is an AI coding agent from Factory.ai.",
      "It has specialized sub-agents:",
      "• Coding Droid",
      "• Reliability Droid (incidents)",
      "• Knowledge Droid (docs)",
      "• Product Droid (tickets)",
      "One agent per job."
    ],
    layout: 'bullets'
  },
  {
    id: 11,
    title: "Installing Factory Droid",
    content: [
      "Also available as VS Code extension from the Marketplace.",
      "Free account required.",
      "Works with Claude, GPT, Gemini — no vendor lock-in."
    ],
    codeSnippet: "curl -fsSL https://app.factory.ai/cli | sh\n# then:\ndroid",
    layout: 'code'
  },
  {
    id: 12,
    title: "What is Claude Code?",
    content: [
      "Anthropic's official CLI coding agent.",
      "Runs in terminal.",
      "Reads files, runs commands, edits code autonomously.",
      "Best paired with Claude Opus 4.6 for complex tasks."
    ],
    layout: 'bullets'
  },
  {
    id: 13,
    title: "Installing Claude Code",
    content: [
      "Needs Node.js 18+.",
      "Works on Mac, Linux, Windows WSL.",
      "Run claude in your project folder. Done."
    ],
    codeSnippet: "npm install -g @anthropic-ai/claude-code\n# then:\nclaude",
    layout: 'code'
  },
  {
    id: 14,
    title: "Tips and Tricks",
    content: [
      "Use /explain, /fix, /tests in Copilot.",
      "Paste full error messages.",
      "Reference specific files.",
      "Use Droid for incidents and tickets.",
      "Use Claude Code for deep refactors."
    ],
    layout: 'bullets',
    icon: <Lightbulb className="w-12 h-12 text-yellow-400" />
  },
  {
    id: 15,
    title: "Key Takeaways",
    content: [
      "Models are converging fast — pick by workflow fit, not hype.",
      "Learn to prompt well.",
      "Try Claude Sonnet 4.6 in Copilot today.",
      "Explore Droid for team-wide agent workflows."
    ],
    layout: 'title'
  },
  {
    id: 45,
    title: "Interactive Task",
    subtitle: "Let's Check Your Setup!",
    content: [
      "1. Open your GitHub Copilot chat or preferred AI tool.",
      "2. Check which model you are currently using.",
      "3. Write in the meeting chat: Are you using one of the recommended top models (Claude 4.6, Gemini 3.1 Pro, GPT-5.4)?",
      "4. Click 'Done!' below when you've posted in the chat!"
    ],
    layout: 'task',
    icon: <PartyPopper className="w-16 h-16 text-pink-500 mb-4" />
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderContent = () => {
    switch (slide.layout) {
      case 'game':
        return <BusGameSlide onWin={nextSlide} />;

      case 'simple-explain':
        return (
          <div className="flex flex-col h-full px-12 py-8 items-center justify-center text-center">
            {slide.icon}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
            {slide.subtitle && <p className="text-2xl text-purple-400 mb-12">{slide.subtitle}</p>}
            
            <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl max-w-3xl w-full text-left shadow-xl">
              <p className="text-2xl text-gray-200 mb-8 font-medium leading-relaxed">{slide.content[0]}</p>
              <div className="bg-black/50 p-6 rounded-xl font-mono">
                <p className="text-xl text-gray-400 mb-6">{slide.content[1]}</p>
                <div className="space-y-4 pl-4">
                  <p className="text-3xl text-green-400 font-bold">{slide.content[2]}</p>
                  <p className="text-2xl text-yellow-400/80">{slide.content[3]}</p>
                  <p className="text-xl text-red-400/60">{slide.content[4]}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'prompt-compare':
        return (
          <div className="flex flex-col h-full px-12 py-8">
            <div className="flex items-center gap-6 mb-8">
              {slide.icon}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
                <p className="text-xl text-blue-400 font-mono bg-blue-900/20 p-3 rounded-lg inline-block border border-blue-800/50">{slide.subtitle}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
              {slide.content.map((item, i) => {
                const [model, response] = item.split('|');
                const colors = ['border-orange-500/50', 'border-green-500/50', 'border-blue-500/50'];
                const textColors = ['text-orange-400', 'text-green-400', 'text-blue-400'];
                const bgColors = ['bg-orange-950/20', 'bg-green-950/20', 'bg-blue-950/20'];
                return (
                  <div key={i} className={`${bgColors[i]} border ${colors[i]} p-8 rounded-2xl flex flex-col shadow-lg`}>
                    <h3 className={`text-2xl font-bold ${textColors[i]} mb-6 pb-4 border-b border-gray-700/50`}>{model}</h3>
                    <p className="text-xl text-gray-300 italic leading-relaxed">"{response}"</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'task':
        return (
          <div className="flex flex-col h-full px-12 py-8 items-center justify-center text-center">
            {slide.icon}
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{slide.title}</h2>
            {slide.subtitle && <p className="text-2xl text-blue-400 mb-12">{slide.subtitle}</p>}
            
            <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl max-w-2xl w-full text-left mb-12 shadow-xl">
              <div className="space-y-4">
                {slide.content.map((item, i) => (
                  <p key={i} className="text-xl text-gray-300 flex items-start gap-4">
                    <span className="text-blue-500 font-bold">{item.split('.')[0]}.</span>
                    <span>{item.split('.').slice(1).join('.').trim()}</span>
                  </p>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                confetti({
                  particleCount: 150,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899']
                });
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-2xl py-4 px-12 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer"
            >
              <CheckCircle2 className="w-8 h-8" />
              Done!
            </button>
          </div>
        );

      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-12">
            {slide.icon}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <h2 className="text-2xl md:text-3xl text-blue-400 font-medium mb-12">
                {slide.subtitle}
              </h2>
            )}
            <div className="space-y-4 text-xl text-gray-400 max-w-3xl">
              {slide.content.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        );

      case 'split':
        return (
          <div className="flex flex-col h-full px-12 py-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">{slide.title}</h2>
            <div className={`grid grid-cols-1 ${slide.content.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-8 h-full`}>
              {slide.content.map((item, i) => {
                const [model, desc] = item.split(': ');
                return (
                  <div key={i} className="bg-gray-800/50 border border-gray-700 p-8 rounded-2xl flex flex-col justify-center shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">{model}</h3>
                    <p className="text-xl text-gray-300">{desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="flex flex-col h-full px-12 py-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
            {slide.subtitle && <p className="text-xl text-gray-400 mb-12">{slide.subtitle}</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
              <div className="bg-red-950/30 border border-red-900/50 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <h3 className="text-2xl font-bold text-red-400">Bad Prompt</h3>
                </div>
                <p className="text-xl text-gray-300 font-mono bg-black/30 p-4 rounded-lg">
                  "fix my code."
                </p>
              </div>
              
              <div className="bg-green-950/30 border border-green-900/50 p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-green-400">Good Prompt</h3>
                </div>
                <p className="text-xl text-gray-300 font-mono bg-black/30 p-4 rounded-lg leading-relaxed">
                  "this Python function fails with TypeError on line 12, here is the stack trace, fix it and explain why."
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-2xl font-medium text-blue-400">{slide.content[2]}</p>
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="flex flex-col h-full px-12 py-8">
            <div className="flex items-center gap-6 mb-12">
              {slide.icon}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{slide.title}</h2>
                {slide.subtitle && <p className="text-xl text-gray-400">{slide.subtitle}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
              <div className="space-y-6">
                {slide.content.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-3 flex-shrink-0" />
                    <p className="text-2xl text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-8 shadow-2xl overflow-hidden flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="text-gray-300 font-mono text-lg overflow-x-auto">
                  <code>{slide.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        );

      case 'bullets':
      default:
        return (
          <div className="flex flex-col h-full px-12 py-8 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10" />
            <div className="flex items-center gap-6 mb-8">
              {slide.icon}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{slide.title}</h2>
                {slide.subtitle && <p className="text-xl text-gray-400">{slide.subtitle}</p>}
              </div>
            </div>
            <div className="space-y-5 flex-1 flex flex-col justify-center max-w-4xl">
              {slide.content.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-6 group"
                >
                  {item.startsWith('•') ? (
                    <div className="w-2 h-2 rounded-full bg-gray-500 mt-3 ml-8 flex-shrink-0 group-hover:bg-blue-400 transition-colors" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-3 flex-shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  )}
                  <p className={`text-2xl leading-relaxed transition-colors ${item.startsWith('•') ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-200 group-hover:text-white'}`}>
                    {item.replace('• ', '')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col font-sans selection:bg-blue-500/30">
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-900">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 relative max-w-7xl w-full mx-auto">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="h-20 border-t border-gray-800/50 flex items-center justify-between px-8 bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
        <div className="text-gray-500 font-mono text-sm">
          {currentSlide + 1} / {slides.length}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-full hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
