import { createContext, useContext, useState } from 'react';

export const datacontext = createContext(null);

export const DataProvider = ({ children }) => {
  // const accountValue = JSON.parse(localStorage.getItem('userInfo'));

  const [account, setAccount] = useState(null);

  return (
    <datacontext.Provider
      value={{
        account,
        setAccount,
      }}
    >
      {children}
    </datacontext.Provider>
  );
};

export const useData = () => {
  return useContext(datacontext);
};
