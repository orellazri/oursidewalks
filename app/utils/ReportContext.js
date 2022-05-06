import { createContext, useState, useEffect, useContext } from "react";
import { getItemAsync } from "expo-secure-store";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../utils/firebase";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [uid, setUid] = useState("");
  const [user, setUser] = useState({});
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
    if (result && result != "") {
      // User is stored

      // Validate uid and get details
      const docSnapshot = await getDoc(doc(db, "users", result));
      if (!docSnapshot.exists()) {
        // UID doesn't exist. Remove uid from persistent storage and state
        setUid("");
        await setItemAsync("uid", "");
        return;
      }

      // UID exists. TODO: Get data
      console.log(docSnapshot.data());
      setUid(result);
    }
  }, []);

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReport = () => useContext(ReportContext);
