"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface TabLinkContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const TabLinkContext = createContext<TabLinkContextType | undefined>(undefined);

export const useTabLink = () => {
  const context = useContext(TabLinkContext);
  if (context === undefined) {
    throw new Error('useTab must be used within a TabLinkProvider');
  }
  return context;
}

export const TabLinkProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("coins");
  const [activeLink, setActiveLink] = useState<string>("home");

  return (
    <TabLinkContext.Provider value={{ activeTab, setActiveTab, activeLink, setActiveLink }}>
      {children}
    </TabLinkContext.Provider>
  );
};