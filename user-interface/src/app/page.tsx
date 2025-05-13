"use client"

import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { TickerSelect } from "@/components/TickerSelect"
import { Navigation } from "@/components/Navigation"
import { ChatInterface } from "@/components/ChatInterface"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <div className="w-64 border-r">
          <Navigation />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-6">
            <TickerSelect />
          </div>
        </div>
        <div className="w-96 border-l">
          <ChatInterface />
        </div>
      </div>
      <Footer />
    </main>
  );
}
