'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MessagesPage() {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('/api/conversations');
      if (res.ok) {
        setConversations(await res.json());
      }
    };

    fetchConversations();
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="flex h-[600px]">
        <Card className="w-1/3 mr-4 overflow-y-auto bg-black border-0 text-white">
          <CardHeader>
            <CardTitle className=''>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-2 cursor-pointer ${selectedConversation?.id === conversation.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <p className="font-semibold">{conversation.otherUser.name}</p>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="flex-1 flex flex-col bg-black text-white border-0">
          <CardHeader>
            <CardTitle>{selectedConversation ? selectedConversation.otherUser.name : 'Select a conversation'}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {selectedConversation && selectedConversation.messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === session.user.id ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.sender === session.user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 mr-2 border-secondary"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}