import { useState, useEffect, useRef } from "react";
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
} from "firebase/firestore/lite";
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
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const useFirebase = (collectionName, start, count, docId, servicesArr) => {
  const [data, setData] = useState([]);
  const [startDoc, setStartDoc] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [singleDoc, setSingleDoc] = useState(null);
  const hasNextPage = useRef(null);
  const lastDoc = useRef(null);

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
        // console.log("GETTING DOCS SNAPSHOTS");
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
      setIsLoading(true);
      setFetchError(null);
      try {
        await getDoc(docRef).then(
          (docSnap) => {
            if (isMounted) {
              if (docSnap.exists()) {
                setSingleDoc(docSnap.data());
              } else {
                setFetchError("No Document Found");
              }
              setIsLoading(false);
            }
          },
          (e) => {
            console.log(e);
            setFetchError("An Error Occurred While Fetching Data");
          }
        );
      } catch (err) {
        if (isMounted) {
          setIsLoading(false);
          setFetchError(err.message);
        }
      }
    };
    if (docId) {
      setIsLoading(true);
      setFetchError(null);
      docQuery(docId);
    }

    return () => (isMounted = false);
  }, [docId, data]);

  return { isLoading, fetchError, startDoc, hasNextPage, singleDoc };
};

export default useFirebase;
