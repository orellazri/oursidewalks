import { createContext, useState, useEffect, useContext } from "react";
import { getItemAsync } from "expo-secure-store";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);
  const [hazardType, setHazardType] = useState("");
  const [freetext, setFreetext] = useState("");
  const [location, setLocation] = useState(null);
  const [consent, setConsent] = useState(false);

  const value = {
    photos,
    setPhotos,
    hazardType,
    setHazardType,
    freetext,
    setFreetext,
    location,
    setLocation,
    consent,
    setConsent,
  };

  // Retrieve user from persistent storage on start
  useEffect(async () => {
    const result = await getItemAsync("user");
    if (result) {
      console.log("User is stored");
      console.log(result);
    } else {
      console.log("User is *NOT* stored");
    }
  }, []);

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReport = () => useContext(ReportContext);
