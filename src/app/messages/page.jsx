'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Menu, X } from 'lucide-react';

export default function MessagesPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('/api/conversations');
      if (res.ok) {
        setConversations(await res.json());
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation) return;

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversationId: selectedConversation.id, content: message }),
    });

    if (res.ok) {
      const newMessage = await res.json();
      setSelectedConversation({
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage],
      });
      setMessage('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-primary">Messages</h1>

      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-200px)]">
        <div className="lg:hidden mb-4">
          <Button onClick={toggleMobileMenu} className="w-full">
            {isMobileMenuOpen ? <X /> : <Menu />} Conversations
          </Button>
        </div>

        <AnimatePresence>
          {(isMobileMenuOpen || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:w-1/3 lg:mr-4 mb-4 lg:mb-0"
            >
              <Card className="h-full overflow-y-auto bg-black border-primary text-white">
                <CardHeader>
                  <CardTitle className="text-primary">Conversations</CardTitle>
                </CardHeader>
                <CardContent>
                  {conversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 my-2 cursor-pointer rounded-lg transition-colors ${
                        selectedConversation?.id === conversation.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => {
                        setSelectedConversation(conversation);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <p className="font-semibold">{conversation.otherUser.name}</p>
                      <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="flex-1 flex flex-col bg-black text-white border-primary">
          <CardHeader>
            <CardTitle className="text-primary">
              {selectedConversation ? selectedConversation.otherUser.name : 'Select a conversation'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {selectedConversation && selectedConversation.messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`mb-2 ${msg.sender === session.user.id ? 'text-right' : 'text-left'}`}
              >
                <span className={`inline-block p-2 rounded-lg ${
                  msg.sender === session.user.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {msg.content}
                </span>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t border-primary">
            <form onSubmit={handleSendMessage} className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 mr-2 bg-black text-white border-primary"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                <Send size={18} />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}