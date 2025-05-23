import React, { createContext, useContext, ReactNode } from 'react';
import { ReactFlowProvider } from '@xyflow/react';

interface PatternEditorContextType {
  // Define any properties you need in the context
}

const PatternEditorContext = createContext<PatternEditorContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export const PatternEditorProvider: React.FC<ProviderProps> = ({ children }) => {
  const contextValue: PatternEditorContextType = {}; // Initialize with actual properties if needed

  return (
    <PatternEditorContext.Provider value={contextValue}>
      <ReactFlowProvider>
        {children}
      </ReactFlowProvider>
    </PatternEditorContext.Provider>
  );
};

export const usePatternEditor = () => useContext(PatternEditorContext);
