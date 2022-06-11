import { createContext, useState, useEffect, useContext } from "react";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { doc, getDoc } from "firebase/firestore";

import { db } from "./firebase";

const ReportContext = createContext(null);

export const ReportProvider = ({ children }) => {
  const [uid, setUid] = useState("");
  const [user, setUser] = useState({});
  const [photos, setPhotos] = useState([]);
  const [hazardType, setHazardType] = useState("");
  const [freetext, setFreetext] = useState("");
  const [location, setLocation] = useState(null);
  const [consent, setConsent] = useState(false);

  // Reset the report (when going back)
  const resetReport = () => {
    setPhotos([]);
    setHazardType("");
    setFreetext("");
    setLocation(null);
    setConsent(false);
  };

  // Retrieve the user's info by uid from firebase and populate state
  const retrieveUserInfo = async (uid) => {
    // Validate uid and get details
    const docSnapshot = await getDoc(doc(db, "users", uid));
    if (!docSnapshot.exists()) {
      // UID doesn't exist. Remove uid from persistent storage and state
      setUid("");
      await setItemAsync("uid", "");
      return false;
    }

    // UID exists. Get data and save to state
    setUid(uid);
    setUser(docSnapshot.data());
  };

  const value = {
    uid,
    setUid,
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
    resetReport,
    retrieveUserInfo,
  };

  // Retrieve user from persistent storage on start
  useEffect(async () => {
    const result = await getItemAsync("uid");
    if (result && result != "") {
      // User is stored. Validate uid and retrieve info
      await retrieveUserInfo(result);
    }
  }, []);

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

export const useReport = () => useContext(ReportContext);
