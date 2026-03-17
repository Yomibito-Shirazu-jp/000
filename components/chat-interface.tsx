import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export function ChatInterface({ onGenerate, isGenerating }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'こんにちは。DTP Web Design 総合OSへようこそ。どのようなデザインを作成しますか？（例：「春のキャンペーン用のInstagramバナーを作って」「モダンなSaaSのLPをデザインして」）',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    onGenerate(input);

    // Simulate assistant response after generation starts
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '承知いたしました。ご要望に合わせてデザインを生成しています。右側のプレビュー画面をご確認ください。',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="w-96 border-r border-neutral-800 bg-neutral-950 flex flex-col h-full">
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/50">
        <h2 className="text-sm font-semibold flex items-center gap-2 text-neutral-200">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          AI Design Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-indigo-600' : 'bg-neutral-800'
                }`}
              >
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-indigo-400" />
                )}
              </div>
              <div
                className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-sm'
                    : 'bg-neutral-800 text-neutral-200 rounded-tl-sm'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-neutral-800 rounded-tl-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                <span className="text-sm text-neutral-400">Generating design...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-neutral-900/50 border-t border-neutral-800">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="デザインの要望を入力..."
            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-700 disabled:text-neutral-500 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-2 text-center">
          <span className="text-[10px] text-neutral-500 font-mono">
            Powered by Gemini 3.1 Pro
          </span>
        </div>
      </div>
    </div>
  );
}
