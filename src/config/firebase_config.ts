import { getStorage } from "@firebase/storage";
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let iApp

if (!getApps().length) {
    console.log('Firebase initialized')
    iApp = initializeApp(firebaseConfig);
}
const appAuth = getAuth(iApp)

export const fi = iApp
export const userStatus = appAuth.currentUser
export const app = iApp;
export const auth = appAuth
export const firebaseStorage = getStorage(iApp)
export const db = getFirestore(iApp!)