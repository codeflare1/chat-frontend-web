import React, { createContext, useState } from 'react';

// Create the context outside the component
export const LayoutContext = createContext(null);

const LayoutContextToggleProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <LayoutContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextToggleProvider;
