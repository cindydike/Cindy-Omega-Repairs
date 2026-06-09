import { useState, useEffect, useRef, createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  initializeFirestore,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  startAfter,
  getDoc,
  doc,
  serverTimestamp,
  addDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
import getQuery from "../utils/getQuery";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const FirebaseContext = createContext({});

export const FirebaseProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [startDoc, setStartDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [docIsLoading, setDocIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [docFetchError, setDocFetchError] = useState(null);
  const [singleDoc, setSingleDoc] = useState(null);
  const [start, setStart] = useState(null);
  const [count, setCount] = useState(null);
  const [docId, setDocId] = useState(null);
  const [collectionName, setCollectionName] = useState("");
  const [servicesArr, setServicesArr] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const hasNextPage = useRef(null);
  const lastDoc = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("Auth State Change", user.uid);
        setUser(user);
        setAuthLoading(false);
      } else {
        // console.log("Auth State Change", "UnAthenticated");
        setUser(null);
        setAuthLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (collectionName) {
      setData([]);
    }
  }, [collectionName, servicesArr]);

  useEffect(() => {
    let isMounted = true;
    const collectionQuery = async (collectionName) => {
      try {
        const collectionRef = collection(db, collectionName);
        let q;
        if (servicesArr?.length) {
          q = getQuery(
            start,
            count,
            servicesArr,
            collectionName,
            "services",
            db
          );
        } else {
          if (start && count) {
            q = query(
              collectionRef,
              where("headers.rating", "!=", "N/A"),
              orderBy("headers.rating", "desc"),
              startAfter(start),
              limit(count)
            );
          } else if (count) {
            q = query(
              collectionRef,
              where("headers.rating", "!=", "N/A"),
              orderBy("headers.rating", "desc"),
              limit(count)
            );
          } else {
            q = query(
              collectionRef,
              where("headers.rating", "!=", "N/A"),
              orderBy("headers.rating", "desc"),
              limit(15)
            );
          }
        }
        setIsLoading(true);
        setFetchError(null);

        await getDocs(q).then(
          (snapShot) => {
            // console.log(snapShot);
            if (isMounted) {
              if (!snapShot.empty) {
                let arr = [];
                if (lastDoc.current) {
                  if (
                    lastDoc.current.id ==
                    snapShot.docs[snapShot.docs.length - 1].id
                  ) {
                    hasNextPage.current = false;
                  } else {
                    lastDoc.current = snapShot.docs[snapShot.docs.length - 1];
                    hasNextPage.current = true;
                  }
                }
                if (snapShot.size < count) {
                  hasNextPage.current = false;
                } else {
                  hasNextPage.current = true;
                }
                setStartDoc(snapShot.docs[snapShot.docs.length - 1]);
                lastDoc.current = snapShot.docs[snapShot.docs.length - 1];
                snapShot.forEach((doc) => {
                  arr.push(doc.data());
                });
                setData((prev) => [...prev, ...arr]);
              } else if (snapShot.empty && lastDoc.current && start) {
                if (lastDoc.current.id == start.id) {
                  // console.log("Last Page");
                  hasNextPage.current = false;
                }
              } else if (snapShot.empty) {
                setFetchError("No Data Found For Search");
              }
              setIsLoading(false);
            }
          },
          (e) => {
            console.log(e);
            setIsLoading(false);
            setFetchError("An Error Occurred While Fetching Data");
          }
        );
      } catch (err) {
        if (isMounted) {
          setIsLoading(false);
          setFetchError("An Error Occurred");
          console.log(err);
        }
      }
    };
    if (collectionName && start != "Not Allowed") {
      collectionQuery(collectionName);
    }
    return () => (isMounted = false);
  }, [collectionName, start, count, servicesArr]);

  useEffect(() => {
    let isMounted = true;
    const docQuery = async (docId) => {
      let docRef;
      docRef = doc(db, "repairShops", docId);
      setDocIsLoading(true);
      setDocFetchError(null);
      try {
        await getDoc(docRef).then(
          (docSnap) => {
            if (isMounted) {
              if (docSnap.exists()) {
                setSingleDoc(docSnap.data());
              } else {
                setDocFetchError("No Document Found");
              }
              setDocIsLoading(false);
            }
          },
          (e) => {
            console.log(e);
            setDocFetchError("An Error Occurred While Fetching Data");
          }
        );
      } catch (err) {
        if (isMounted) {
          setDocIsLoading(false);
          setDocFetchError(err.message);
        }
      }
    };
    if (docId) {
      docQuery(docId);
    }
    return () => (isMounted = false);
  }, [docId]);

  return (
    <FirebaseContext.Provider
      value={{
        data,
        isLoading,
        docIsLoading,
        fetchError,
        docFetchError,
        startDoc,
        hasNextPage,
        singleDoc,
        setStart,
        setCount,
        setDocId,
        setCollectionName,
        setServicesArr,
        signInWithEmailAndPassword,
        user,
        setUser,
        setPersistence,
        browserSessionPersistence,
        authLoading,
        db,
        getDocs,
        doc,
        serverTimestamp,
        collection,
        onSnapshot,
        query,
        deleteDoc,
        addDoc,
        auth,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
