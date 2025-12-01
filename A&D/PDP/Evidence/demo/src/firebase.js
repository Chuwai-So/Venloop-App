// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCFAEC3w-89CUEEO6RJ4KVbEbVxImJOME",
    authDomain: "venloop-demo.firebaseapp.com",
    databaseURL: "databaseURL: \"https://venloop-demo-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "venloop-demo",
    storageBucket: "venloop-demo.firebasestorage.app",
    messagingSenderId: "316066622044",
    appId: "1:316066622044:web:7443bb47fec6e275a11499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };