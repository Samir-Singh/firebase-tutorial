"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";

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
  const [auth, setAuth] = useState(null);
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

  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  const putAuth = (data) => {
    localStorage.setItem("token", data);
    setAuth(data);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(localStorage.getItem("token"));
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        putData,
        auth,
        putAuth,
        clearAuth,
        signInUserWithProvider,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
