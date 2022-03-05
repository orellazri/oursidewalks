import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnsXG64rJbRtnHsa6F2sr9iwecrtOlMIM",
  authDomain: "our-sidewalks.firebaseapp.com",
  projectId: "our-sidewalks",
  storageBucket: "our-sidewalks.appspot.com",
  messagingSenderId: "401314557114",
  appId: "1:401314557114:web:ba3107eb4ff9f01b5f6683",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
