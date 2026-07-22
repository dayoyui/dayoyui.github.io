import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, Check, X, ExternalLink, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BotData {
  id: string;
  name: string;
  platform: 'whatsapp' | 'telegram' | 'discord';
  status: 'Online' | 'Offline';
  description: string;
  link: string;
}

const bots: BotData[] = [
  {
    id: '1',
    name: 'Kinda WhatsApp Bot',
    platform: 'whatsapp',
    status: 'Online',
    description: '‎ ',
    link: 'https://api.whatsapp.com/send?phone=6285194718404&text=.menu',
  },
  {
    id: '2',
    name: 'Kinda Discord Bot',
    platform: 'discord',
    status: 'Online',
    description: '‎ ',
    link: 'https://discord.com/oauth2/authorize?client_id=1231017573861294111',
  },
  {
    id: '3',
    name: 'Kinda Telegram Bot',
    platform: 'telegram',
    status: 'Online',
    description: '‎ ',
    link: 'https://t.me/KindaToram_bot',
  },
];

const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case 'whatsapp':
      return <MessageCircle className="w-5 h-5 text-green-400" />;
    case 'telegram':
      return <Send className="w-5 h-5 text-blue-400" />;
    case 'discord':
      return <Bot className="w-5 h-5 text-indigo-400" />;
    default:
      return <Bot className="w-5 h-5 text-gray-500" />;
  }
};

const getPlatformName = (platform: string) => {
  switch (platform) {
    case 'whatsapp':
      return 'WhatsApp';
    case 'telegram':
      return 'Telegram';
    case 'discord':
      return 'Discord';
    default:
      return 'Unknown';
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.5,
      ease: 'easeOut'
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  },
};

function BotCard({ bot }: { bot: BotData }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      layout
      variants={cardVariants}
      whileHover={
        !isMobile
          ? {
            scale: 1.03,
            y: -4,
            transition: {
              type: 'spring',
              stiffness: 200,
              damping: 15,
              duration: 0.3
            },
          }
          : undefined
      }
      whileTap={{
        scale: 0.96,
        y: 0,
        transition: { duration: 0.15 },
      }}
      className="relative bg-white/70 dark:bg-[#2a243a] border border-[#e2d9fb] dark:border-[#6c4ab6] rounded-2xl p-6 shadow-xl backdrop-blur-md text-gray-900 dark:text-[#e6e0f9] hover:shadow-[0_0_25px_4px_rgba(204,153,255,0.3)] hover:border-[#d5bdfc] transition-colors duration-700"
    >
      <div className="absolute top-4 right-4">
        {bot.status === 'Online' ? (
          <div className="bg-[#d5bdfc] rounded-full p-1.5 shadow">
            <Check className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="bg-red-400 rounded-full p-1.5 shadow">
            <X className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-2 text-[#d5bdfc] text-sm font-semibold">
        {getPlatformIcon(bot.platform)}
        <span className="uppercase tracking-wider">{getPlatformName(bot.platform)}</span>
      </div>

      <h3 className="text-xl font-bold mb-2 text-[#d5bdfc]">{bot.name}</h3>
      <p className="text-sm text-gray-700 dark:text-[#cbbbf9] mb-4">{bot.description}</p>

      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${bot.status === 'Online'
          ? 'bg-[#d5bdfc] text-gray-800'
          : 'bg-red-100 text-red-800'
          }`}
      >
        <span className="w-2 h-2 rounded-full bg-white"></span>
        {bot.status}
      </div>

      <button
        onClick={() => window.open(bot.link, '_blank', 'noopener,noreferrer')}
        className="mt-4 w-full py-2.5 rounded-lg 
             bg-[#d5bdfc] hover:bg-[#c9a9f5] 
             text-gray-900
             font-semibold transition-all duration-300 transform hover:scale-105 
             flex items-center justify-center gap-2"
      >
        Chat Sekarang <ExternalLink className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme as 'light' | 'dark' || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

    setTimeout(() => setIsMounted(true), 300);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen relative overflow-hidden font-sans bg-[#fbfaff] text-gray-900 dark:bg-gradient-to-br dark:from-[#181827] dark:to-[#1e1b29] dark:text-[#e6e0f9]">
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#d5bdfc] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-gradient-to-b from-[#FBFAFF] to-[#f3edff] text-gray-900 dark:bg-gradient-to-br dark:from-[#1f1b2e] dark:to-[#2a2342] dark:text-[#e6e0f9] transition-colors duration-500">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#e0c3fc] opacity-30 blur-[300px] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#8ec5fc] opacity-20 blur-[200px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#d5bdfc] opacity-10 blur-[150px] pointer-events-none z-0"></div>

      {/* Toggle Theme */}
      <div className="absolute top-6 right-6 z-50">
        <motion.button
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="bg-[#d5bdfc] hover:bg-[#c9a9f5] text-gray-900 dark:text-gray-800 p-2 rounded-full shadow-md transition-colors duration-300"
          whileHover={{
            rotate: 10,
            scale: 1.05,
            boxShadow: '0px 0px 12px rgba(204,153,255,0.5)',
            transition: { duration: 0.3 }
          }}
          whileTap={{
            rotate: -20,
            scale: 0.9,
            transition: { duration: 0.15 }
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {theme === 'dark' ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Sun className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Moon className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Header */}
      <AnimatePresence mode="wait">
        <motion.header
          className="py-12 text-center z-10 relative transition-colors duration-700"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full overflow-hidden"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
            style={{ filter: 'drop-shadow(0 0 16px #d5bdfcaa)' }}
            whileHover={{
              rotate: 3,
              scale: 1.08,
              transition: { type: 'spring', stiffness: 250, damping: 14 },
            }}
            whileTap={{
              scale: 0.95,
              rotate: -2,
              transition: { duration: 0.15 },
            }}
          >
            <img
              src="https://ucarecdn.com/72e39c89-791c-4730-b05a-848110bc99d1/-/preview/300x300/"
              alt="Kinda"
              className="w-full h-full object-cover border-4 border-[#d5bdfc] rounded-full"
            />
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-[#d5bdfc]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          >
            Kinda
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-[#aaa1cc] mt-2 max-w-sm sm:max-w-md mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
          >
            Your Toram Online Assistant 🌸
          </motion.p>
        </motion.header>

        {/* Bot Cards */}
        <motion.main
          key={theme}
          className="max-w-6xl mx-auto px-4 pb-20 z-10 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        className="text-center text-sm text-gray-600 dark:text-[#aaa1cc] pb-3 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <p>Made with ❤️ by Zaxerion</p>
      </motion.footer>
    </div>
  );
}

export default App;
