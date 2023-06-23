
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKZO7VCmOthdoRydPhm-jp_pn075mhvUU",
  authDomain: "finaldemo-17085.firebaseapp.com",
  projectId: "finaldemo-17085",
  storageBucket: "finaldemo-17085.appspot.com",
  messagingSenderId: "1029318603466",
  appId: "1:1029318603466:web:cbb94cf9715bd195b23a33",
  measurementId: "G-XK1DT9K7Y3",
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;
