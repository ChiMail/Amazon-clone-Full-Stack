import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDc3Y79LLPwSqcKpRZxHGaAjJPo2mNP4DU",
  authDomain: "clone-64509.firebaseapp.com",
  projectId: "clone-64509",
  storageBucket: "clone-64509.appspot.com",
  messagingSenderId: "553946915934",
  appId: "1:553946915934:web:f31dd48911017fc87d80cf",
  measurementId: "G-NKWT8HK9EG",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
