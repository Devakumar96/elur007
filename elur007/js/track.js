import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    query,
    where,
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

document
    .getElementById("searchBtn")
    .addEventListener("click", trackComplaint);

async function trackComplaint() {

    const complaintId =
        document.getElementById("complaintId")
        .value
        .trim();

    const result =
        document.getElementById("result");

    if (!complaintId) {

        result.innerHTML = `
        <div class="alert alert-warning">
            Please enter Complaint ID
        </div>
        `;

        return;
    }

    const q = query(
        collection(db, "complaints"),
        where("complaintId", "==", complaintId)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {

        result.innerHTML = `
        <div class="alert alert-danger">
            Complaint not found
        </div>
        `;

        return;
    }

    snapshot.forEach((doc) => {

        const data = doc.data();

        let statusClass = "";

        if (data.status === "Pending") {
            statusClass = "status-pending";
        }

        if (data.status === "In Progress") {
            statusClass = "status-progress";
        }

        if (data.status === "Resolved") {
            statusClass = "status-resolved";
        }

        result.innerHTML = `

        <div class="card ${statusClass} shadow-sm">

            <div class="card-body">

                <h4>${data.category}</h4>

                <p>
                    <strong>Complaint ID:</strong>
                    ${data.complaintId}
                </p>

                <p>
                    <strong>Street:</strong>
                    ${data.street}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${data.status}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${data.description}
                </p>

            </div>

        </div>

        `;
    });

}