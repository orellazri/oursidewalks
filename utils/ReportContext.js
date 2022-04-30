import { createContext, useState, useEffect, useContext } from "react";
import { getItemAsync } from "expo-secure-store";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [photos, setPhotos] = useState([]);
  const [hazardType, setHazardType] = useState("");
  const [freetext, setFreetext] = useState("");
  const [location, setLocation] = useState(null);
  const [consent, setConsent] = useState(false);

  const value = {
    user,
    setUser,
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
      // User is stored
      // TODO: validate uid. if doesn't exist in firestore, remove key from storage
      setUser(result);
    }
  }, []);

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReport = () => useContext(ReportContext);
