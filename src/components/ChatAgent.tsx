import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, Stethoscope } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { hoverSound, clickSound } from "@/lib/sound";

const transport = new DefaultChatTransport({ api: "/api/chat" });

const SUGGESTIONS = [
  "What services do you offer?",
  "Where is the clinic located?",
  "How do I book a consultation?",
  "Do you accept walk-ins?",
];

function messageText(m: UIMessage) {
  return m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
}

export function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (!isLoading) inputRef.current?.focus();
  }, [isLoading]);

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || isLoading) return;
    void sendMessage({ text: value });
    setInput("");
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        aria-label="Open Aria, the Medeek assistant"
        onClick={() => {
          clickSound();
          setOpen((v) => !v);
        }}
        onMouseEnter={hoverSound}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-gradient-primary glow-blue shadow-[0_10px_40px_-10px_oklch(0.6_0.18_220/0.6)]"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6 text-primary-foreground" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6 text-primary-foreground" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="absolute inset-0 rounded-full bg-gradient-primary opacity-60 animate-ping" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[400px] h-[min(620px,calc(100vh-8rem))] glass-strong rounded-3xl border border-white/10 shadow-[0_24px_80px_-20px_oklch(0.1_0.05_250/0.8)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-white/10 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary glow-blue">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-base truncate">Aria</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">Medeek virtual assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-primary mt-1 shrink-0" />
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      Hi, I&apos;m <span className="text-gradient font-medium">Aria</span>. I can answer
                      questions about Medeek Ambulatory Surgical Clinic and help you book a consultation.
                      How can I help you today?
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          clickSound();
                          submit(s);
                        }}
                        onMouseEnter={hoverSound}
                        className="text-xs px-3 py-1.5 rounded-full glass border border-white/10 hover:border-primary/40 text-muted-foreground hover:text-foreground transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const text = messageText(m);
                const isUser = m.role === "user";
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {isUser ? (
                      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary text-primary-foreground px-3.5 py-2 text-sm shadow-[0_4px_20px_-6px_oklch(0.6_0.18_220/0.5)]">
                        {text}
                      </div>
                    ) : (
                      <div className="max-w-[90%] text-sm text-foreground/95 leading-relaxed prose prose-invert prose-sm prose-p:my-2 prose-headings:my-2 prose-ul:my-2 prose-li:my-0.5 max-w-none">
                        <ReactMarkdown>{text || " "}</ReactMarkdown>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {status === "submitted" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "120ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "240ms" }} />
                  </span>
                  Aria is thinking…
                </div>
              )}

              {error && (
                <div className="text-xs text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
                  Sorry, something went wrong. Please try again.
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(input);
              }}
              className="border-t border-white/10 p-3 flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit(input);
                  }
                }}
                rows={1}
                placeholder="Ask about services, hours, booking…"
                className="flex-1 resize-none bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none rounded-xl px-3 py-2.5 text-sm placeholder:text-muted-foreground max-h-32"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary glow-blue text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
