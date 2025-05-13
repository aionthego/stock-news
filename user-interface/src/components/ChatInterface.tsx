"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useState } from "react"

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hello! How can I help you analyze this stock?", isUser: false }
  ])

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col bg-white rounded-lg shadow-sm"
    >
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>
      
      <div className="flex-grow overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
