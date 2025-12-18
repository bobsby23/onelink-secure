"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Bot, Send, X, Loader, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import { profileSummaryForChatbot } from "@/ai/flows/profile-summary-for-chatbot";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export default function ChatWidget({ publicProfileData }: { publicProfileData: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
        setIsLoading(true);
        profileSummaryForChatbot({ profileData: publicProfileData })
            .then(response => {
                setMessages([
                    { id: '1', role: 'assistant', text: response.summary + "\n\nWhat would you like to know?" }
                ]);
            })
            .catch(error => {
                console.error("AI Error:", error);
                setMessages([
                    { id: '1', role: 'assistant', text: "Sorry, I couldn't load the profile summary. You can still ask me questions." }
                ]);
            })
            .finally(() => setIsLoading(false));
    }
  }, [isOpen, messages.length, publicProfileData]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // AI response simulation
    setTimeout(() => {
        const aiResponse: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: "As an AI assistant, I can only provide information based on the user's public profile. For more complex queries, please use the provided links." };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
    }, 1500);
  };
  
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence>
            {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
          </AnimatePresence>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] max-w-sm"
          >
            <Card className="shadow-2xl">
              <CardHeader className="flex flex-row items-center gap-3">
                <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="font-headline flex items-center gap-2">Chatbud AI <Sparkles className="w-4 h-4 text-accent" /></CardTitle>
                    <CardDescription>I can answer questions about this profile.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-80 pr-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                  {messages.map((message) => (
                      <div key={message.id} className={`flex gap-3 text-sm ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {message.role === 'assistant' && <Avatar className="w-6 h-6"><AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback></Avatar>}
                          <div className={`rounded-lg px-3 py-2 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                              <p className="leading-relaxed">{message.text}</p>
                          </div>
                      </div>
                  ))}
                   {isLoading && (
                        <div className="flex justify-start gap-3 text-sm">
                            <Avatar className="w-6 h-6"><AvatarFallback><Bot className="w-4 h-4"/></AvatarFallback></Avatar>
                            <div className="rounded-lg px-3 py-2 bg-muted flex items-center">
                                <Loader className="w-4 h-4 animate-spin"/>
                            </div>
                        </div>
                   )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                  <Input
                    id="message"
                    placeholder="Type your question..."
                    className="flex-1"
                    autoComplete="off"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
