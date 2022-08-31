import { createContext, useContext } from 'react';

// Context for ./SharedModal.jsx
export const SharedModalContext = createContext();

// useContext for ./SharedModal.jsx
export const useSharedModal = () => useContext(SharedModalContext);
