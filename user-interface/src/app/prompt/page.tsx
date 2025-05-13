"use client"

import { motion } from "framer-motion"
import { Copy, ChevronDown } from "lucide-react"
import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Navigation } from "@/components/Navigation"

interface Prompt {
  title: string
  description: string
  template: string
}

const prompts: Prompt[] = [
  {
    title: "Market Analysis",
    description: "Analyze market trends and identify opportunities",
    template: "Analyze the current trends in the stock market, focusing on [input sector or stock]. Identify any emerging patterns and suggest potential investment opportunities. Consider recent earnings reports and industry news in your analysis."
  },
  {
    title: "Portfolio Diversification",
    description: "Get strategies for portfolio diversification",
    template: "Given a portfolio with a mix of [input current sectors or stocks], suggest strategies to diversify further while minimizing risk. Include potential sectors to explore and specific stocks to consider."
  },
  {
    title: "Risk Management",
    description: "Learn effective risk management techniques",
    template: "Discuss effective risk management techniques for a stock trader. Provide detailed examples of how to implement stop-loss orders, diversification, and position sizing in a trading strategy. Use [input current trading strategy or stock] as a reference."
  },
  {
    title: "Technical Analysis",
    description: "Get technical analysis for stocks",
    template: "Using technical analysis, evaluate the stock of [input stock]. Analyze recent price movements, volume, and key indicators such as moving averages and RSI. Provide a buy, sell, or hold recommendation."
  },
  {
    title: "Economic Indicators",
    description: "Understand economic indicators' impact",
    template: "Explain how various economic indicators like GDP, unemployment rates, and inflation impact stock market performance. Provide examples of how investors can use these indicators to make informed trading decisions regarding [input sector or stock]."
  },
  {
    title: "Value Investing",
    description: "Learn value investing principles",
    template: "Describe the principles of value investing and how to identify undervalued stocks. Use real-world examples, including [input stock or company], to illustrate how investors can apply this strategy in the current market."
  },
  {
    title: "Market Sentiment",
    description: "Analyze market sentiment influence",
    template: "Analyze how market sentiment influences stock prices. Discuss tools and techniques investors can use to gauge sentiment and incorporate it into their trading strategies. Focus on [input stock or sector]."
  },
  {
    title: "Earnings Reports",
    description: "Learn to interpret earnings reports",
    template: "Explain how to interpret a company's earnings report. Highlight the key metrics investors should focus on and how these metrics can impact stock prices. Use [input company's latest earnings report] as an example."
  },
  {
    title: "Growth vs Dividend Stocks",
    description: "Compare growth and dividend stocks",
    template: "Compare and contrast growth stocks and dividend stocks. Discuss the benefits and risks of each type of investment and suggest scenarios where one might be more suitable than the other. Reference [input specific growth stock and dividend stock]."
  },
  {
    title: "Global Events Impact",
    description: "Understand global events' market impact",
    template: "Analyze the impact of major global events (e.g., geopolitical tensions, pandemics) on the stock market. Provide strategies for investors to protect their portfolios during such events. Consider the impact on [input sector or stock]."
  }
]

export default function PromptEngineeringPage() {
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null)
  const [copied, setCopied] = useState<number | null>(null)

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex">
        <div className="w-64 border-r">
          <Navigation />
        </div>
        <div className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl font-bold mb-2">Prompt Engineering</h1>
            <p className="text-muted-foreground mb-8">
              Craft effective prompts for AI-powered stock market analysis
            </p>
            
            <div className="space-y-4">
              {prompts.map((prompt, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ height: expandedPrompt === index ? "auto" : "76px" }}
                  className="border rounded-lg bg-white shadow-sm overflow-hidden"
                >
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/5"
                    onClick={() => setExpandedPrompt(expandedPrompt === index ? null : index)}
                  >
                    <div>
                      <h3 className="font-semibold">{prompt.title}</h3>
                      <p className="text-sm text-muted-foreground">{prompt.description}</p>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 transition-transform ${
                        expandedPrompt === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {expandedPrompt === index && (
                    <div className="p-4 border-t bg-accent/5">
                      <div className="relative">
                        <pre className="text-sm whitespace-pre-wrap font-mono bg-white p-4 rounded-lg border">
                          {prompt.template}
                        </pre>
                        <button
                          onClick={() => copyToClipboard(prompt.template, index)}
                          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-lg transition-colors"
                        >
                          <Copy className={`w-4 h-4 ${
                            copied === index ? "text-primary" : "text-muted-foreground"
                          }`} />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
