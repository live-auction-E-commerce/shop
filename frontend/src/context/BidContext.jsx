import { createContext, useState, useContext } from 'react';

const BidContext = createContext();

export const BidProvider = ({ children }) => {
  const [latestBid, setLatestBid] = useState(null);

  return <BidContext.Provider value={{ latestBid, setLatestBid }}>{children}</BidContext.Provider>;
};

export const useBidContext = () => useContext(BidContext);
