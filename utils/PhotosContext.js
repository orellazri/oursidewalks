import { createContext, useState, useContext } from "react";

const PhotosContext = createContext(null);

export const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  return <PhotosContext.Provider value={{ photos, setPhotos }}>{children}</PhotosContext.Provider>;
};

export const usePhotos = () => useContext(PhotosContext);
