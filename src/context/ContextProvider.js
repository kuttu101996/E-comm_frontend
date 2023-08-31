import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [singleData, setSingleData] = useState({});
  const [cartNumber, setCartNumber] = useState(0);
  const [render, setRender] = useState(false);
  return (
    <AppContext.Provider
      value={{
        singleData,
        setSingleData,
        cartNumber,
        setCartNumber,
        render,
        setRender,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default ContextProvider;
