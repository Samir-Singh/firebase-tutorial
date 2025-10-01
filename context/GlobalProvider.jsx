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
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
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
  const getData = () => {
    const dbRef = ref(firebaseDataBase);
    get(child(dbRef, `users`))
      .then((res) => {
        if (res.exists()) {
          console.log(res.val(), typeof res.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log("User Logged In");
        setIsLoggedIn(true);
        router.push("/about-us");
      } else {
        console.log("User Logged Out");
        setIsLoggedIn(false);
      }
    });
  }, []);

  const LogoutUser = () => {
    signOut(firebaseAuth);
  };

  const handleAddData = async (collectionName, payload) => {
    return await addDoc(collection(fireStoreDb, collectionName), payload);
  };

  const handleReadData = async (collectionName) => {
    const querySnapShot = await getDocs(
      collection(fireStoreDb, collectionName)
    );

    const documents = [];
    querySnapShot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  };

  const handleDeleteData = async (collectionName, id) => {
    return await deleteDoc(doc(fireStoreDb, collectionName, id));
  };

  const handleUpdateData = async (collectionName, id, payload) => {
    const docRef = doc(fireStoreDb, collectionName, id);
    await updateDoc(docRef, payload);
  };

  const handleAddRealTimeData = async (key, data) => {
    await set(ref(firebaseDataBase, key), data);
  };

  const handleReadRealTimeData = (key, setData) => {
    const unsubscribe = onValue(ref(firebaseDataBase, key), (snapshot) => {
      setData(snapshot.val() ? Object.values(snapshot.val()) : []);
    });
    return unsubscribe;
  };

  const handleDeleteRealTimeData = async (key) => {
    return await remove(ref(firebaseDataBase, key));
  };

  return (
    <GlobalContext.Provider
      value={{
        putData,
        getData,
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
          handleUpdateData,
        },
        realTimeDatabase: {
          handleAddRealTimeData,
          handleReadRealTimeData,
          handleDeleteRealTimeData,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
