import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
export const app = initializeApp({
  apiKey: "AIzaSyDOMfHc7LAXfddxDB6k8rOFMRO5ViMjuq0",
  authDomain: "home-sales-board.firebaseapp.com",
  projectId: "home-sales-board",
  storageBucket: "home-sales-board.firebasestorage.app",
  messagingSenderId: "743161573262",
  appId: "1:743161573262:web:f46f78a533e9c0047e7edf"
});
export const db = getFirestore(app);