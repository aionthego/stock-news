"use client"

import { motion } from "framer-motion"

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-t bg-white/50 backdrop-blur-sm w-full py-6 mt-20"
    >
      <div className="container mx-auto px-6">
        <p className="text-sm text-center text-muted-foreground">
          © {currentYear} Valuestox AI Inc. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}
