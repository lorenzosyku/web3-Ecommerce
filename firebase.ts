// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZo5h0MREfCcu6YdqRisEIp3uXzc1ZC54",
  authDomain: "web3-ecommerce.firebaseapp.com",
  projectId: "web3-ecommerce",
  storageBucket: "web3-ecommerce.appspot.com",
  messagingSenderId: "1027525510008",
  appId: "1:1027525510008:web:171c79e1c7dca907effe8d"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore();

export { db, app }