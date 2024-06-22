import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const key = import.meta.env.VITE_FIREBASE_KEY;
const domain = import.meta.env.VITE_FIREBASE_DOMAIN;
const id = import.meta.env.VITE_FIREBASE_ID;
const bucket = import.meta.env.VITE_FIREBASE_BUCKET;
const senderId = import.meta.env.VITE_FIREBASE_SENDERID;
const appId = import.meta.env.VITE_FIREBASE_APPID;
const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENTID;

const firebaseConfig = {
    apiKey: key,
    authDomain: domain,
    projectId: id,
    storageBucket: bucket,
    messagingSenderId: senderId,
    appId: appId,
    measurementId: measurementId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);