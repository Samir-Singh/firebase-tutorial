"use client";

import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBTcBuhO70j0YOLGvPvFkVf4w_ke50DW44",
  authDomain: "fir-tutorial-ac90b.firebaseapp.com",
  projectId: "fir-tutorial-ac90b",
  storageBucket: "fir-tutorial-ac90b.firebasestorage.app",
  messagingSenderId: "406424187870",
  appId: "1:406424187870:web:e3d754af039add2ec6e34f",
  databaseURL: "https://fir-tutorial-ac90b-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDataBase = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const putData = (key, data) => {
    set(ref(firebaseDataBase, key), data);
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        putData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
