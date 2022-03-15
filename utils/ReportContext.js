import { createContext, useState, useContext } from "react";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  const value = { photos, setPhotos };

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReport = () => useContext(ReportContext);
