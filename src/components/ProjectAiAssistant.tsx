'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  providerUsed?: string;
}

interface ProjectAiAssistantProps {
  projectId: string;
  projectTitle?: string;
}

const QUICK_QUESTIONS = [
  'Summarize this project',
  'How is the project progressing?',
  'Which milestones are overdue?',
  'What are the biggest current risks?',
  'What happened recently?',
  'What should we focus on next?',
];

export default function ProjectAiAssistant({ projectId, projectTitle }: ProjectAiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    setError(null);
    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const res = await fetch(`/api/projects/${projectId}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || json.message || 'Failed to get response from AI Assistant.');
      }

      const { reply, providerUsed } = json.data;
      if (providerUsed) setActiveProvider(providerUsed);

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        providerUsed,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message || 'AI Assistant is temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full bg-[#0f1524]/90 border border-[#7dd3fc]/30 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl transition-all">
      
      {/* Header */}
      <div className="px-6 py-4 bg-white/5 border-b border-[#334155]/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7dd3fc]/15 border border-[#7dd3fc]/40 flex items-center justify-center text-[#7dd3fc] shadow-[0_0_10px_rgba(125,211,252,0.2)]">
            <span className="material-symbols-outlined text-[22px]">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-headline font-bold text-base text-white">AI Project Assistant</h3>
              {activeProvider && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 uppercase">
                  {activeProvider}
                </span>
              )}
            </div>
            <p className="text-[11px] text-white/50">
              Project-scoped intelligence • {projectTitle || 'Current Project'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Read-Only Advisory Mode
          </span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-white/60 hover:text-white rounded-lg transition-colors cursor-pointer"
            title={isOpen ? 'Collapse Assistant' : 'Expand Assistant'}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 flex flex-col gap-5">
          
          {/* Quick Questions Chips */}
          <div>
            <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider block mb-2">
              Suggested Quick Questions:
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-[#334155]/60 hover:border-[#7dd3fc]/50 text-xs text-white/80 hover:text-[#7dd3fc] hover:bg-[#7dd3fc]/10 transition-all font-medium flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#7dd3fc]">help_outline</span>
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Thread */}
          <div className="min-h-[220px] max-h-[420px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
            {messages.length === 0 ? (
              <div className="h-44 flex flex-col items-center justify-center text-center p-6 rounded-xl bg-white/[0.02] border border-dashed border-white/10">
                <span className="material-symbols-outlined text-[#7dd3fc]/40 text-[40px] mb-2">
                  forum
                </span>
                <p className="text-xs font-bold text-white/80">Ask anything about this project</p>
                <p className="text-[11px] text-white/50 max-w-md mt-1">
                  Query project overview, active milestones, schedule progress, safety scores, recent updates, or strategic recommendations based on current AtlasBuild data.
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-1 ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#7dd3fc]/20 border border-[#7dd3fc]/40 text-white rounded-br-none'
                        : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none shadow-lg'
                    }`}
                  >
                    {/* Render Markdown formatted reply */}
                    <div className="prose prose-invert prose-xs max-w-none space-y-2 whitespace-pre-wrap font-sans">
                      {msg.content}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-white/40 px-1">
                    {msg.role === 'user' ? 'You' : `AI Assistant ${msg.providerUsed ? `(${msg.providerUsed})` : ''}`} • {msg.timestamp}
                  </span>
                </div>
              ))
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit">
                <div className="w-4 h-4 border-2 border-[#7dd3fc] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-mono text-[#7dd3fc] animate-pulse">
                  Analyzing project structured context...
                </span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  <span>{error}</span>
                </div>
                <button onClick={() => setError(null)} className="text-white/60 hover:text-white">✕</button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Controls */}
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about milestones, timeline, updates, risks, or progress..."
              disabled={loading}
              className="flex-1 h-11 pl-4 pr-12 rounded-xl bg-white/5 border border-[#334155]/60 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#7dd3fc] disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputValue.trim()}
              className="h-11 px-5 rounded-xl bg-[#7dd3fc] text-[#001f2e] text-xs font-bold hover:bg-[#38bdf8] transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(125,211,252,0.25)]"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
