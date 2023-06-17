// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKZO7VCmOthdoRydPhm-jp_pn075mhvUU",
  authDomain: "finaldemo-17085.firebaseapp.com",
  projectId: "finaldemo-17085",
  storageBucket: "finaldemo-17085.appspot.com",
  messagingSenderId: "1029318603466",
  appId: "1:1029318603466:web:cbb94cf9715bd195b23a33",
  measurementId: "G-XK1DT9K7Y3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
