// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGZtr1sRLeCYzBfQ3Gw6BlGIXZ7pi7XYQ",
    authDomain: "todo-app-aon.firebaseapp.com",
    projectId: "todo-app-aon",
    storageBucket: "todo-app-aon.appspot.com",
    messagingSenderId: "602794448802",
    appId: "1:602794448802:web:ddd739cf49c76fba7244fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);