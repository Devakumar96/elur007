import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
   apiKey: "AIzaSyDF2jnPIKTCuN3vsjqEMbxoJYHNE0rZkck",
  authDomain: "myelur-complaints.firebaseapp.com",
  projectId: "myelur-complaints",
  storageBucket: "myelur-complaints.firebasestorage.app",
  messagingSenderId: "496623154696",
  appId: "1:496623154696:web:3e864b7cfdc393b84583bd"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const form = document.getElementById("complaintForm");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const complaintId =
      "ELR-" + Date.now();

  await addDoc(
    collection(db, "complaints"),
    {
      complaintId,
      street: document.getElementById("street").value,
      category: document.getElementById("category").value,
      description: document.getElementById("description").value,
      mobile: document.getElementById("mobile").value,
      status: "Pending",
      createdAt: new Date().toISOString()
    }
  );

  document.getElementById("result").innerHTML =
      `
      <div class="alert alert-success">
          Complaint Submitted<br>
          ID: <strong>${complaintId}</strong>
      </div>
      `;

  form.reset();

});