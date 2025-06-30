import firebase from 'firebase/compat/app';
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEP1eTR36lAISmBVtxqVbPT2pq-mtsLQ8",
  authDomain: "clone-2025-96bdb.firebaseapp.com",
  projectId: "clone-2025-96bdb",
  storageBucket: "clone-2025-96bdb.firebasestorage.app",
  messagingSenderId: "236590709221",
  appId: "1:236590709221:web:2f09d86fc1bb1fb824570c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
