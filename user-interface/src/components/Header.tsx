"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b bg-white/50 backdrop-blur-sm fixed w-full top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary p-2 rounded-lg"
            >
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-primary">Valuestox AI</h1>
              <p className="text-sm text-muted-foreground">
                Invest in value stocks using AI
              </p>
            </div>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
