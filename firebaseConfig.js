// NOTE YOU CAN REMOVE THE ANALYTICS IMPORT 
 import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

/* Paste  API code here */
{/* <script type="module"> */}
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB3IbV49bGpPamEmj2VBbVyNSesCWr_T9k",
    authDomain: "learnwithfirebase2025.firebaseapp.com",
    projectId: "learnwithfirebase2025",
    storageBucket: "learnwithfirebase2025.firebasestorage.app",
    messagingSenderId: "356707378808",
    appId: "1:356707378808:web:7890aa15129614c29b2f8d",
    measurementId: "G-WHE1BXLDYN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
{/* </script> */}
// Additional imports to initialize Firebase 
// NOTE YOU CAN REMOVE THE ANALYTICS variable 
 export const auth = getAuth(app);
 export const db = getFirestore(app);