import React, { createContext, useState, useContext, ReactNode } from 'react';

type AppContextType = {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
};

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: number;
};

const defaultContext: AppContextType = {
  selectedCurrency: 'BTC',
  setSelectedCurrency: () => {},
  notifications: [],
  addNotification: () => {},
  clearNotifications: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [...prev, notification]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        notifications,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
