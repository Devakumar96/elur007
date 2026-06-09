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

let allComplaints = [];

loadPublicComplaints();

document
  .getElementById("categoryFilter")
  .addEventListener("change", renderComplaints);

async function loadPublicComplaints() {

  const snapshot = await getDocs(
    collection(db, "complaints")
  );

  allComplaints = [];

  snapshot.forEach((doc) => {
    allComplaints.push(doc.data());
  });

  renderComplaints();
}

function renderComplaints() {

  const selectedCategory =
    document.getElementById(
      "categoryFilter"
    ).value;

  const container =
    document.getElementById(
      "publicComplaints"
    );

  let html = "";

  allComplaints.forEach((data) => {

    if (
      selectedCategory !== "All" &&
      data.category !== selectedCategory
    ) {
      return;
    }

    let badgeClass = "bg-secondary";

    if (data.status === "Pending") {
      badgeClass = "bg-warning text-dark";
    }

    if (data.status === "In Progress") {
      badgeClass = "bg-primary";
    }

    if (data.status === "Resolved") {
      badgeClass = "bg-success";
    }

    html += `
      <div class="card mb-3 shadow-sm">

        <div class="card-body">

          <h5>${data.category}</h5>

          <p>
            <strong>Street:</strong>
            ${data.street}
          </p>

          <p>
            ${data.description}
          </p>

          <span class="badge ${badgeClass}">
            ${data.status}
          </span>

        </div>

      </div>
    `;
  });

  if (html === "") {

    html = `
      <div class="alert alert-info">
        No complaints found in this category.
      </div>
    `;
  }

  container.innerHTML = html;
}