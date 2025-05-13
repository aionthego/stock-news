"use client"

import { motion } from "framer-motion"
import { 
  BarChart3, 
  Home, 
  Settings, 
  TrendingUp, 
  PieChart, 
  BookOpen, 
  Bell,
  History,
  Wallet
} from "lucide-react"
import Link from "next/link"

const navSections = [
  {
    title: "Overview",
    items: [
      { icon: Home, label: "Dashboard", href: "/" },
      { icon: BookOpen, label: "Stock News", href: "/stocknews" },
      { icon: PieChart, label: "Sector Analysis", href: "/sector" },
      { icon: PieChart, label: "Industry Analysis", href: "/industry" },
      { icon: BookOpen, label: "Company Analysis", href: "/company" },
      { icon: Wallet, label: "Portfolio", href: "/portfolio" }
    ]
  },
  {
    title: "Analysis",
    items: [
      { icon: BarChart3, label: "Technical Analysis", href: "/technical" },
      { icon: PieChart, label: "Fundamental Analysis", href: "/fundamental" },
      { icon: History, label: "Historical Data", href: "/historical" }
    ]
  },
  {
    title: "Resources",
    items: [
      { icon: Bell, label: "Alerts", href: "/alerts" },
      { icon: BookOpen, label: "Learning Center", href: "/learn" },
      { icon: BookOpen, label: "Prompt Engineering", href: "/prompt" },
      { icon: Settings, label: "Settings", href: "/settings" }
    ]
  }
]

export const Navigation = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full bg-sidebar-background border-r p-4 space-y-6 overflow-y-auto"
    >
      {navSections.map((section, idx) => (
        <div key={section.title} className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
            {section.title}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
