import { createContext, useState, useEffect, useContext } from "react";
import { getItemAsync } from "expo-secure-store";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [uid, setUid] = useState("");
  const [photos, setPhotos] = useState([]);
  const [hazardType, setHazardType] = useState("");
  const [freetext, setFreetext] = useState("");
  const [location, setLocation] = useState(null);
  const [consent, setConsent] = useState(false);

  const value = {
    uid,
    setUid,
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
    const result = await getItemAsync("uid");
    if (result != "") {
      // User is stored
      // TODO: validate uid and get details and save to state. if doesn't exist in firestore, remove key from storage
      setUid(result);
    }
  }, []);

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReport = () => useContext(ReportContext);
