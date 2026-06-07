import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
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

loadResolvedComplaints();

async function loadResolvedComplaints() {

  const container =
    document.getElementById("resolvedComplaints");

  if (!container) return;

  const snapshot =
    await getDocs(
      collection(db, "complaints")
    );

  let html = "";
  let count = 0;

  snapshot.forEach((item) => {

    const data = item.data();

    if (data.status === "Resolved") {

      count++;

      html += `

      <div class="card mb-3 shadow-sm">

        <div class="card-body">

          <h5 class="card-title">
            ${data.category}
          </h5>

          <p class="mb-1">
            <strong>Street:</strong>
            ${data.street}
          </p>

          <p class="mb-1">
            ${data.description}
          </p>
          <p class="mb-1">
  <strong>Resolved Date:</strong>
  ${
    data.resolvedAt
      ? new Date(data.resolvedAt)
          .toLocaleDateString()
      : "-"
  }
</p>

          <small class="text-success">
            Resolved Successfully
          </small>

        </div>

      </div>

      `;
    }

  });

  if (count === 0) {

    html = `

      <div class="alert alert-info">

        No resolved complaints yet.

      </div>

    `;
  }

  container.innerHTML = html;
}