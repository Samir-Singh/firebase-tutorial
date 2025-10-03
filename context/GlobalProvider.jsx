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
  update,
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
import { usePathname, useRouter } from "next/navigation";
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
const firebaseDataBase = getDatabase(firebaseApp); // For realtime database

const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);
const GoogleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();
const fireStoreDb = getFirestore(firebaseApp); // For cloud firestore

const GlobalProvider = ({ children }) => {
  const pathName = usePathname();
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
      console.log("oiuytfdcvbnm", user);
      if (user) {
        console.log("User Logged In");
        setIsLoggedIn(true);
        router.push("/about-us");
      } else {
        console.log("User Logged Out");
        setIsLoggedIn(false);
        if (pathName === "/about-us" || pathName === "/contact-us") {
          router.push("/");
        }
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

  const handleAddRealTimeData = async (key, payload) => {
    await set(ref(firebaseDataBase, key), payload);
  };

  const handleReadRealTimeData = (key, cb) => {
    const dbRef = ref(firebaseDataBase, key);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const todos = data ? Object.values(data) : [];
      cb(todos);
    });

    return unsubscribe;
  };

  const handleDeleteRealTimeData = async (key) => {
    return await remove(ref(firebaseDataBase, key));
  };

  const handleUpdateRealTimeData = async (key, payload) => {
    await update(ref(firebaseDataBase, key), payload);
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
          handleUpdateRealTimeData,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
