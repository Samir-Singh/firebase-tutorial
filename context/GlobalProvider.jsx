"use client";

import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

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

const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);
const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();

const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signInUserWithProvider = (providerName) => {
    if (!providerName) {
      alert("Please provide a provider name");
      return;
    }
    return signInWithPopup(
      firebaseAuth,
      providerName === "Google"
        ? GoogleProvider
        : providerName === "Github"
        ? GithubProvider
        : null
    );
  };

  const putData = (key, data) => set(ref(firebaseDataBase, key), data);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("User Logged In");
        setIsLoggedIn(true);
        router.push("/about-us");
      } else {
        console.log("User Logged Out");
        setIsLoggedIn(false);
        router.push("/login");
      }
    });
  }, []);

  const LogoutUser = () => {
    signOut(firebaseAuth);
  };

  return (
    <GlobalContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        putData,
        signInUserWithProvider,
        isLoggedIn,
        LogoutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
