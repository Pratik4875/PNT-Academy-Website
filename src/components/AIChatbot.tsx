"use client";
import { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2, Maximize2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "model";
    content: string;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", content: "Hi! I'm the PNT Academy AI Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);

    // Reference to the Spline Application
    const splineApp = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    function onLoad(spline: any) {
        splineApp.current = spline;
        setSplineLoaded(true);
    }

    // Toggle the 3D Camera / Chat Interface
    const toggleChat = () => {
        const nextState = !isOpen;
        setIsOpen(nextState);

        if (splineApp.current) {
            // Trigger predefined Spline events matching the "Zoom In" and "Zoom Out" states
            if (nextState) {
                splineApp.current.emitEvent('keyDown', 'PhoneZoomIn');
            } else {
                splineApp.current.emitEvent('keyDown', 'PhoneZoomOut');
            }
        }
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userText = input.trim();
        setInput("");

        const newMessages: Message[] = [...messages, { role: "user", content: userText }];
        setMessages(newMessages);
        setIsTyping(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages })
            });

            const data = await res.json();

            if (res.ok && data.reply) {
                setMessages(prev => [...prev, { role: "model", content: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: "model", content: "Sorry, I am having trouble connecting to my brain right now. Please try again later!" }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "model", content: "Network error. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-0 right-0 z-[100] pointer-events-none">

            {/* 3D Spline Canvas Container */}
            {/* The canvas sits in the bottom right corner. We use a public Spline scene featuring a stylized phone/robot for the FPV effect */}
            <div className={`absolute bottom-0 right-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-auto origin-bottom-right
                ${isOpen ? "w-[100vw] h-[100dvh] md:w-[450px] md:h-[750px] md:bottom-6 md:right-6 rounded-3xl overflow-hidden shadow-2xl" : "w-[150px] h-[150px] bottom-4 right-4"}`
            }>
                {/* 
                  Using a curated community Spline scene: "Robot holding phone"
                  Note: In a real production environment, you would replace this URL with your custom exported Spline scene URL 
                  that has the specific camera zoom triggers set up. 
                */}
                <Spline
                    scene="https://prod.spline.design/6Wq1Q7YGyMqi-nJb/scene.splinecode"
                    onLoad={onLoad}
                    className="w-full h-full object-cover"
                />

                {/* Loading overlay for 3D model */}
                {!splineLoaded && (
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center backdrop-blur-sm rounded-3xl">
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                )}
            </div>

            {/* Closed State Button (Overlayed on top of the small 3D robot) */}
            <AnimatePresence>
                {!isOpen && splineLoaded && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={toggleChat}
                        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center pointer-events-auto transition-colors z-10"
                    >
                        <Bot className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Opened State UI (The HTML 'Screen' that overlays the 3D phone screen) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 0.3 }} // Delay showing HTML until 3D camera zoom finishes
                        className="absolute bottom-0 right-0 w-full h-full md:bottom-6 md:right-6 md:w-[450px] md:h-[750px] pointer-events-auto flex flex-col z-20"
                    >
                        {/* 
                          We use a heavy backdrop-blur instead of solid bg so the 3D phone edges remain visible,
                          simulating looking AT a screen rather than just replacing the whole div.
                        */}
                        <div className="flex-1 m-4 md:m-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-slate-800/50 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col relative">

                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between text-white shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">PNT Assistant</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                            <span className="text-[10px] text-white/80 uppercase tracking-wider">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleChat}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Chat History */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {msg.role === 'model' && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center shrink-0">
                                                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        )}

                                        <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${msg.role === 'user'
                                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                                            }`}>
                                            {msg.role === 'model' ? (
                                                <div className="prose prose-sm dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0 pb-0">
                                                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                                                </div>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>

                                        {msg.role === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                                                <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <div className="flex gap-3 justify-start">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center shrink-0">
                                            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 rounded-tl-sm flex items-center gap-1.5">
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                            <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Box */}
                            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
                                <form onSubmit={handleSend} className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm rounded-full py-3.5 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isTyping}
                                        className="absolute right-1.5 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
