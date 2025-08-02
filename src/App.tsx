import React, { useEffect, useState } from 'react';
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
    description: '‎',
    link: 'https://api.whatsapp.com/send?phone=6285194718404&text=.menu',
  },
  {
    id: '2',
    name: 'Kinda Discord Bot',
    platform: 'discord',
    status: 'Online',
    description: '‎',
    link: 'https://discord.com/oauth2/authorize?client_id=1231017573861294111',
  },
  {
    id: '3',
    name: 'Kinda Telegram Bot',
    platform: 'telegram',
    status: 'Online',
    description: '‎',
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

function BotCard({ bot }: { bot: BotData }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleClick = () => {
    window.open(bot.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 50, scale: 0.9 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={
        !isMobile
          ? {
              scale: 1.03,
              y: -4,
              transition: { type: 'spring', stiffness: 200, damping: 15 },
            }
          : undefined
      }
      whileTap={{
        scale: 0.96,
        y: 0,
        transition: { duration: 0.15 },
      }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="relative bg-white/70 dark:bg-[#2a243a] border border-[#e2d9fb] dark:border-[#6c4ab6] rounded-2xl p-6 shadow-xl backdrop-blur-md text-gray-900 dark:text-[#e6e0f9] hover:shadow-[0_0_25px_4px_rgba(204,153,255,0.3)] hover:border-[#d5bdfc]"
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
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
          bot.status === 'Online'
            ? 'bg-[#d5bdfc] text-gray-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-white"></span>
        {bot.status}
      </div>

      <button
        onClick={handleClick}
        className="mt-4 w-full py-2.5 rounded-lg bg-[#d5bdfc] hover:bg-[#c9a9f5] text-gray-900 font-semibold transition transform hover:scale-105 flex items-center justify-center gap-2"
      >
        Chat Sekarang <ExternalLink className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="min-h-screen relative overflow-hidden font-sans bg-[#fbfaff] text-gray-900 dark:bg-gradient-to-br dark:from-[#181827] dark:to-[#1e1b29] dark:text-[#e6e0f9]">
      {/* Background glow effect */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#e0c3fc] opacity-30 blur-[300px] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#8ec5fc] opacity-20 blur-[200px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#d5bdfc] opacity-10 blur-[150px] pointer-events-none z-0"></div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="bg-[#d5bdfc] hover:bg-[#c9a9f5] text-gray-900 dark:text-gray-800 p-2 rounded-full shadow transition"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Header */}
      <motion.header
        className="py-16 text-center z-10 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src="https://ucarecdn.com/604bd41e-f1d9-424e-b574-7787de4314aa/-/preview/300x296/-/format/webp/"
          alt="Kinda"
          className="w-24 h-24 mx-auto rounded-full border-4 border-[#d5bdfc] shadow-lg mb-4 object-cover"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={
            !isMobile
              ? {
                  rotate: 3,
                  scale: 1.05,
                  transition: { type: 'spring', stiffness: 300, damping: 15 },
                }
              : undefined
          }
          whileTap={{
            scale: 0.95,
            rotate: -2,
            transition: { duration: 0.2 },
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <h1 className="text-4xl font-bold text-[#d5bdfc]">Kinda</h1>
        <p className="text-gray-600 dark:text-[#aaa1cc] mt-2 max-w-xl mx-auto">
          Your Toram Online Assistant 🌸
        </p>
      </motion.header>

      {/* Bot List */}
      <motion.main
        className="max-w-6xl mx-auto px-4 pb-20 z-10 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <AnimatePresence>
          {bots.map((bot) => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </AnimatePresence>
      </motion.main>

      {/* Footer */}
      <motion.footer
        className="text-center text-sm text-gray-600 dark:text-[#aaa1cc] pb-8 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        <p>Made with ❤️ by Zaxerion</p>
      </motion.footer>
    </div>
  );
}

export default App;
