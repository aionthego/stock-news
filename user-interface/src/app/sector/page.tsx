'use client'
// src/app/market/page.tsx
import React, { useState, useEffect } from 'react';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { ChatInterface } from '../../components/ChatInterface';
import  DataDisplay  from '../../components/DataDisplay';
import { collection, getDocs, query, where, and, getFirestore} from 'firebase/firestore';
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

interface CompanyData {
  [key: string]: any; // Allows any key-value pairs
}

export default function MarketPage() {
  const [sectors, setSectors] = useState<string[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [industries, setIndustries] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Sectors
  useEffect(() => {
    const fetchSectors = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'Companies3'));
        const uniqueSectors = new Set<string>();
        querySnapshot.forEach((doc) => {
          const sector = doc.data().Sector;
          console.log(sector);
          if (sector) {
            uniqueSectors.add(sector);
          }
        });
        setSectors(Array.from(uniqueSectors).sort());
      } catch (error) {
        console.error('Error fetching sectors:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSectors();
  }, []);

  // Fetch Industries
  useEffect(() => {
    const fetchIndustries = async () => {
      if (selectedSector) {
        setIsLoading(true);
        try {
          const q = query(collection(db, 'Companies3'), where('Sector', '==', selectedSector));
          const querySnapshot = await getDocs(q);
          const uniqueIndustries: Set<string> = new Set();
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data)
            if (data.Industry) {
              uniqueIndustries.add(data.Industry);
            }
          });
          setIndustries(Array.from(uniqueIndustries).sort());
        } catch (error) {
          console.error('Error fetching industries:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIndustries([]);
        setSelectedIndustry(null);
      }
    };
    fetchIndustries();
  }, [selectedSector]);

  // Fetch Company Data
  useEffect(() => {
    const fetchData = async () => {
      if (selectedSector && selectedIndustry) {
        setIsLoading(true);
        try {
          const q = query(
            collection(db, 'Companies3'),
            and(where('Sector', '==', selectedSector), where('Industry', '==', selectedIndustry))
          );
          const querySnapshot = await getDocs(q);
          const data: CompanyData[] = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data() as CompanyData);
          });
          setCompanyData(data);
        } catch (error) {
          console.error('Error fetching company data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCompanyData([]);
      }
    };
    fetchData();
  }, [selectedSector, selectedIndustry]);

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSector(e.target.value === "" ? null : e.target.value);
    setSelectedIndustry(null);
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIndustry(e.target.value === "" ? null : e.target.value);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow flex">
        <div className="w-64 border-r">
          <Navigation />
        </div>
        <div className="flex-1 p-6">
          <div className="mb-6">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <select
                  value={selectedSector || ''}
                  onChange={handleSectorChange}
                >
                  <option value="">Select Sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
                {selectedSector && (
                  <select
                    value={selectedIndustry || ''}
                    onChange={handleIndustryChange}
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          </div>
          {/* Pass companyData to DataDisplay */}
          <DataDisplay companyData={companyData} />
          <ChatInterface  />
        </div>
      </div>
      <Footer />
    </main>
  );
}
