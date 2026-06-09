import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* =========================
   Firebase Config
   ========================= */

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

/* =========================
   Global Data
   ========================= */

let allComplaints = [];

/* =========================
   Initial Load
   ========================= */

loadPublicComplaints();

document
  .getElementById("categoryFilter")
  ?.addEventListener("change", renderComplaints);

/* =========================
   Load Complaints
   ========================= */

async function loadPublicComplaints() {

  try {

    const snapshot = await getDocs(
      collection(db, "complaints")
    );

    allComplaints = [];

    snapshot.forEach((doc) => {
      allComplaints.push(doc.data());
    });

    renderComplaints();

  } catch (error) {

    console.error(error);

    document.getElementById(
      "publicComplaints"
    ).innerHTML = `
      <div class="alert alert-danger">
        Failed to load complaints.
      </div>
    `;
  }
}

/* =========================
   Render Complaints
   ========================= */

function renderComplaints() {

  const selectedCategory =
    document.getElementById("categoryFilter")?.value || "All";

  const container =
    document.getElementById("publicComplaints");

  if (!container) return;

  const sortedComplaints = [...allComplaints];

  sortedComplaints.sort((a, b) => {

    const statusOrder = {
      "Pending": 1,
      "In Progress": 2,
      "Resolved": 3
    };

    const statusCompare =
      statusOrder[a.status] -
      statusOrder[b.status];

    if (statusCompare !== 0) {
      return statusCompare;
    }

    return (
      new Date(b.createdAt) -
      new Date(a.createdAt)
    );

  });

  let html = "";

  sortedComplaints.forEach((data) => {

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

    let icon = "📋";

    switch (data.category) {

      case "Street Light":
        icon = "💡";
        break;

      case "Water Supply":
        icon = "💧";
        break;

      case "Road Damage":
        icon = "🛣️";
        break;

      case "Garbage":
        icon = "🗑️";
        break;
    }

    html += `
      <div class="card mb-3 shadow-sm">

        <div class="card-body">

          <h5 class="card-title">
            ${icon} ${data.category}
          </h5>

          <p class="mb-2">
            <strong>Street:</strong>
            ${data.street}
          </p>

          <p class="mb-2">
            ${data.description}
          </p>

          <p class="mb-2">
            <small class="text-muted">
              Submitted:
              ${
                data.createdAt
                  ? new Date(
                      data.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            </small>
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