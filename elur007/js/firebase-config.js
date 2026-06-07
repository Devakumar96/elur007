// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {
  // Firebase config here
   apiKey: "AIzaSyDF2jnPIKTCuN3vsjqEMbxoJYHNE0rZkck",
    authDomain: "myelur-complaints.firebaseapp.com",
    projectId: "myelur-complaints",
    storageBucket: "myelur-complaints.firebasestorage.app",
    messagingSenderId: "496623154696",
    appId: "1:496623154696:web:3e864b7cfdc393b84583bd"
};

const app = initializeApp(firebaseConfig);

export { app };