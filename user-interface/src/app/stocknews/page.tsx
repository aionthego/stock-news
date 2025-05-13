"use client"
import { Footer } from "@/components/Footer"
import { Navigation } from "@/components/Navigation"
import { ChatInterface } from "@/components/ChatInterface"
import { initializeApp } from 'firebase/app';
import { GenerationConfig,
  getGenerativeModel,
  getVertexAI,
  HarmBlockThreshold,
  HarmCategory,
  SafetySetting } from 'firebase/vertexai';
import { useState, useEffect } from 'react'; // Import useState and useEffect

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
const vertexAI = getVertexAI(app);

const generationConfig: GenerationConfig = {
  temperature: 0,
  topP: 0.95,
  maxOutputTokens: 8192,
};
const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.OFF,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.OFF,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.OFF,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.OFF,
  },
];
const model = getGenerativeModel(vertexAI, { model: "gemini-2.0-flash", generationConfig, safetySettings});

export default function StockNewsPage() {
    const [stockNews, setStockNews] = useState<string | null>(null); // Use state to hold the news

    useEffect(() => {
        const fetchStockNews = async () => { // Create an async function to fetch the news
            const chat = model.startChat();
            const prompt = "[Rashida Hodge of Microsoft and Gerben Bakker of Hubbell Join Regal Rexnord Board of Directors]";
            try {
                const result = await model.generateContent(prompt); // Await the promise
                const text = result.response.text(); // Extract the text
                setStockNews(text); // Update the state with the news
            } catch (error) {
                console.error("Error fetching stock news:", error);
                setStockNews("Error loading stock news." + error); // Handle errors
            }
        };

        fetchStockNews(); // Call the async function when the component mounts
    }, []); // The empty array ensures this effect runs only once

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <div className="w-64 border-r">
          <Navigation />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-6">
              <h1>Stock News</h1>
              {stockNews ? (
                <p>{stockNews}</p>
              ) : (
                <p>Loading stock news...</p> // Display loading state
              )}
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