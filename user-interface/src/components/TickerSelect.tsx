"use client"

import * as Select from "@radix-ui/react-select"
import { useState, useEffect } from 'react';
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCzSGK--1X9tuK6kiCkoCckMPlpQi2-rE0",
  authDomain: "valuestox-ai.firebaseapp.com",
  projectId: "valuestox-ai",
  storageBucket: "valuestox-ai.firebasestorage.app",
  messagingSenderId: "457448776296",
  appId: "1:457448776296:web:30d764ea7d4371112591dd",
  measurementId: "G-Z6W0PGRVL5"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tickers = [
  { value: "AAPL", label: "Apple Inc." },
  { value: "GOOG", label: "Alphabet Inc." },
  { value: "TSLA", label: "Tesla Inc." },
]

export const TickerSelect = () => {
  const [sectors, setSectors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  useEffect(() => {
    const fetchSectors = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'Companies'));
        const uniqueSectors = new Set<string>();
        querySnapshot.forEach((doc) => {
          const sector = doc.data().sector;
          if (sector) {
            uniqueSectors.add(sector);
          }
        });
        setSectors(Array.from(uniqueSectors));
      } catch (error) {
        console.error('Error fetching sectors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSectors();
  }, []);

  useEffect(() => {
    console.log("Selected sector:", selectedSector);
  }, [selectedSector]);

  return (
    <Select.Root>
      <Select.Trigger
        className={cn(
          "inline-flex items-center justify-between rounded-md px-4 py-2 text-sm",
          "bg-white border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "w-[200px] font-medium"
        )}
      >
        <Select.Value placeholder="Select ticker..." />
        <Select.Icon>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={cn(
            "relative z-50 min-w-[200px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
        >
          <Select.Viewport className="p-1">
            {sectors.map((ticker) => (
              <Select.Item
                key={ticker}
                value={ticker}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                  "focus:bg-accent focus:text-accent-foreground",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                )}
              >
                <Select.ItemText>{ticker.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
