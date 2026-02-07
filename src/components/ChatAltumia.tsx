/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from "next/image";

import {
  Send,
  MessageCircle,
  MessageSquareText,
  Bot,
  X,
  Loader2,
  ArrowRight,
  ChevronLeft,
  MessageSquare
} from 'lucide-react';

// --- Interfaces ---
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Interfaz para la respuesta estructurada del bot (Lead)
interface BotActionResponse {
  action: 'SAVE_LEAD';
  data: {
    name: string;
    whatsapp: string;
  };
  confirmation: string;
}

// --- Componente para procesar Enlaces y Evitar Desborde ---
const MessageContent = ({ text }: { text: string }) => {
  const parts = text.split(/(\[.+?\]\(.+?\))/g);
  
  return (
    <span className="block break-words whitespace-pre-wrap">
      {parts.map((part, i) => {
        const match = part.match(/\[(.+?)\]\((.+?)\)/);
        if (match) {
          return (
            <a
              key={i}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 my-2 px-4 py-2 bg-[#3AF2CE]/10 text-[#3AF2CE] border border-[#3AF2CE]/30 rounded-xl hover:bg-[#3AF2CE]/20 transition-all font-bold shadow-[0_0_15px_rgba(58,242,206,0.1)]"
            >
              {match[1]} ↗
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export function ChatBot() {
  const t = useTranslations('ChatBot');
  const locale = useLocale();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = t.raw('suggestions') as string[];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const toggleContainer = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowChat(false); 
    }
  };

  const handleLeadCapture = async (botResponseText: string) => {
    try {
      const jsonMatch = botResponseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed: BotActionResponse = JSON.parse(jsonMatch[0]);
        if (parsed.action === 'SAVE_LEAD') {
          console.log("Lead capturado internamente:", parsed.data);
          return parsed.confirmation;
        }
      }
    } catch (e) {}
    return botResponseText;
  };

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { 
      id: Math.random().toString(), 
      role: 'user', 
      content: textToSend.trim() 
    };
    
    const newMessagesUI = [...messages, userMessage];
    setMessages(newMessagesUI);
    setInput('');
    setIsLoading(true);

    const apiHistory: GeminiMessage[] = newMessagesUI.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // --- LÓGICA DE REINTENTOS INTERNOS ---
    let attempts = 0;
    const maxAttempts = 3;
    let success = false;
    let finalBotResponse = "";

    while (attempts < maxAttempts && !success) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: apiHistory, locale }),
        });
        
        if (!response.ok) throw new Error("Server Error");

        const data = await response.json();
        finalBotResponse = data.response || t('errorMessage');
        success = true;
      } catch (error) {
        attempts++;
        console.warn(`Intento ${attempts} de Altumia fallido. Reintentando...`);
        // Pausa exponencial (500ms, 1s, 1.5s)
        await new Promise(res => setTimeout(res, attempts * 500));
      }
    }

    if (success) {
      const cleanDisplayContent = await handleLeadCapture(finalBotResponse);
      setMessages(prev => [...prev, { 
        id: Math.random().toString(), 
        role: 'assistant', 
        content: cleanDisplayContent
      }]);
    } else {
      setMessages(prev => [...prev, { 
        id: Math.random().toString(), 
        role: 'assistant', 
        content: t('errorMessage') 
      }]);
    }

    setIsLoading(false);
  };

  const WhatsAppIcon = () => (
    <svg 
      role="img" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg" 
      className="size-5 fill-current text-[#969997]"
    >
      <title>WhatsApp</title>
      <path d="M17.472 14.382c-.297-.149-.88-.436-1.017-.486-.137-.05-.282-.074-.427.05-.145.122-.547.679-.67.816-.123.137-.247.162-.443.049-.196-.113-.837-.308-1.592-.985-.589-.541-.973-1.218-1.092-1.424-.12-.206-.012-.314.104-.424.099-.099.22-.248.33-.373.11-.124.148-.207.223-.347.075-.14.038-.262-.012-.374-.05-.112-.427-1.028-.584-1.409-.157-.381-.315-.328-.427-.334-.112-.006-.247-.006-.382-.006a.729.729 0 0 0-.529.247c-.182.195-.693.679-.693 1.655 0 .976.71 1.916.81 2.053.098.137 1.397 2.136 3.39 2.992.47.205.84.326 1.12.418.475.152.9.129 1.26.079.427-.06 1.25-.513 1.424-.997.174-.486.174-.9.124-1.002-.05-.102-.182-.162-.297-.212zm-5.488 7.372a9.75 9.75 0 0 1-5.18-1.503l-5.273 1.373 1.414-5.134a9.72 9.72 0 0 1-1.64-5.424A9.752 9.752 0 0 1 12 2.25a9.75 9.75 0 0 1 9.75 9.75c0 5.38-4.37 9.75-9.75 9.75z"/>
    </svg>
  );

  return (
    <div className="fixed bottom-20 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 w-[320px] sm:w-[380px] bg-[#1a1a1a] rounded-[24px] shadow-2xl overflow-hidden border border-white/10 flex flex-col origin-bottom-right"
          >
            {!showChat ? (
              <div className="p-6">
                 <div className="w-[120px] h-[60px] relative">
                    <Image src="/logo_altum.svg" alt="Icon" fill className="object-contain" priority />
                 </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed">{t('welcome')}</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => setShowChat(true)} className="w-full bg-altum-violeta hover:bg-[#4c32b3] text-white py-3 px-5 rounded-xl flex justify-between items-center transition-all group shadow-lg shadow-[#5D3FD3]/20">
                    <span className="text-sm font-semibold">{t('liveChat')}</span>
                    <MessageCircle size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a href="https://wa.me/573155870958" target="_blank" rel="noopener noreferrer" className="w-full bg-[#2a2a2a] hover:bg-[#333] text-white py-3 px-5 rounded-xl flex justify-between items-center transition-all group border border-white/5">
                    <span className="text-sm font-semibold">{t('whatsappChat')}</span>
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex h-[450px] flex-col bg-black">
                <div className="flex items-center justify-between bg-gradient-to-r from-altum-violeta to-[#4c32b3] px-4 py-3 text-white">
                  <div className="flex items-center gap-2">
                    <div className="bg-black/20 p-1.5 rounded-lg"><Bot size={18} className="text-[#3AF2CE]" /></div>
                    <div>
                        <span className="font-bold text-xs block leading-none">{t('advisorName')}</span>
                        <span className="text-[10px] opacity-80 uppercase tracking-widest">{t('status')}</span>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[#0d0d0d]">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-40">
                      <Bot size={40} className="text-gray-600" />
                      <p className="text-[11px] text-gray-500 max-w-[150px]">{t('emptyState')}</p>
                    </div>
                  )}
                  {messages.map((message) => (
                    <div key={message.id} className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      {message.role === "assistant" && (
                        <div className="h-7 w-7 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center flex-shrink-0">
                             <Bot size={14} className="text-[#3AF2CE]" />
                        </div>
                      )}
                      <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed overflow-hidden ${message.role === "user" ? "bg-[#5D3FD3] text-white rounded-tr-none shadow-lg shadow-[#5D3FD3]/10" : "bg-[#222] text-gray-200 border border-white/5 rounded-tl-none"}`}>
                        <MessageContent text={message.content} />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                      <div className="h-7 w-7 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center animate-pulse"><Bot size={14} className="text-[#3AF2CE]" /></div>
                      <div className="bg-[#222] px-4 py-3 rounded-2xl rounded-bl-none border border-white/5"><Loader2 className="h-4 w-4 animate-spin text-[#3AF2CE]" /></div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                {!isLoading && (
                  <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-[#0a0a0a]">
                    {suggestions.map((suggestion, index) => (
                      <button key={index} onClick={() => sendMessage(suggestion)} className="whitespace-nowrap px-3 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-full text-[10px] font-medium text-gray-400 hover:text-[#3AF2CE] hover:border-[#3AF2CE]/40 transition-all active:scale-95">{suggestion}</button>
                    ))}
                  </div>
                )}
                <div className="border-t border-white/5 p-4 bg-[#111]">
                  <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t('placeholder')} className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5D3FD3]/50 transition-all" disabled={isLoading} />
                    <button type="submit" disabled={isLoading || !input.trim()} className="bg-[#5D3FD3] hover:bg-[#4c32b3] text-white p-2.5 rounded-xl disabled:opacity-30 disabled:hover:bg-[#5D3FD3] transition-all flex items-center justify-center active:scale-90"><Send size={16} /></button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={toggleContainer} className="fixed bottom-6 right-6 h-14 w-14 sm:h-16 sm:w-16 bg-altum-violeta text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 group z-[10000] border border-white/10">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}><X className="h-7 w-7 sm:h-8 sm:w-8" /></motion.div>
          ) : (
            <motion.div key="bot" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}><Bot className="h-7 w-7 sm:h-8 sm:w-8" /></motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 rounded-full bg-altum-violeta blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
      </button>
    </div>
  );
}