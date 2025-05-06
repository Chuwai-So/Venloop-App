// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEcRpYGggKA4fTsAcIQtm7Ik5Ut3Hr2SM",
    authDomain: "venloop-ee862.firebaseapp.com",
    databaseURL: "https://venloop-ee862-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "venloop-ee862",
    storageBucket: "venloop-ee862.firebasestorage.app",
    messagingSenderId: "857610419342",
    appId: "1:857610419342:web:98ca2eca51bd7d8ca91ddf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getDatabase(app);
export { db };
export const storage = getStorage(app)
export { db, auth, app };