// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuUauXlpoHsuRMWvHl9h7YrDsG7yvVlcI",
  authDomain: "automated-hr-tool.firebaseapp.com",
  projectId: "automated-hr-tool",
  storageBucket: "automated-hr-tool.firebasestorage.app",
  messagingSenderId: "510114581040",
  appId: "1:510114581040:web:0f93b9420c66bde523fbf5",
  measurementId: "G-FC0XMCM4GW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);