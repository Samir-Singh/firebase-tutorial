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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
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
const fireStoreDb = getFirestore(firebaseApp);

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

  const handleAddData = async (collectionName, payload) => {
    try {
      const docRef = await addDoc(
        collection(fireStoreDb, collectionName),
        payload
      );
      return { success: true, data: docRef, error: null };
    } catch (error) {
      return { success: false, data: null, error: error };
    }
  };

  const handleReadData = async (collectionName) => {
    try {
      const querySnapShot = await getDocs(
        collection(fireStoreDb, collectionName)
      );

      const documents = [];
      querySnapShot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        data: documents,
        error: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error,
      };
    }
  };

  const handleDeleteData = async (collectionName, id) => {
    try {
      await deleteDoc(doc(fireStoreDb, collectionName, id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        putData,
        authentication: {
          signupUserWithEmailAndPassword,
          signInUserWithEmailAndPassword,
          signInUserWithProvider,
          isLoggedIn,
          LogoutUser,
        },
        firestore: {
          handleAddData,
          handleReadData,
          handleDeleteData,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
