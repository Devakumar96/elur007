import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
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

loadComplaints();

async function loadComplaints() {

  const snapshot = await getDocs(
    collection(db, "complaints")
  );

  const table =
    document.getElementById("complaintsTable");

  table.innerHTML = "";

  let total = 0;
  let pending = 0;
  let progress = 0;
  let resolved = 0;

  snapshot.forEach((item) => {

    const data = item.data();

    total++;

    if (data.status === "Pending") {
      pending++;
    }

    if (data.status === "In Progress") {
      progress++;
    }

    if (data.status === "Resolved") {
      resolved++;
    }

    table.innerHTML += `
      <tr>

        <td>${data.complaintId}</td>

        <td>${data.category}</td>

        <td>${data.street}</td>

        <td>

          <select
            class="form-select"
            id="${item.id}">

            <option
              value="Pending"
              ${data.status === "Pending" ? "selected" : ""}>
              Pending
            </option>

            <option
              value="In Progress"
              ${data.status === "In Progress" ? "selected" : ""}>
              In Progress
            </option>

            <option
              value="Resolved"
              ${data.status === "Resolved" ? "selected" : ""}>
              Resolved
            </option>

          </select>

        </td>

        td>

<button
 class="btn btn-primary btn-sm me-1"
 onclick='viewComplaint(${JSON.stringify(data)})'>

 View

</button>

<button
 class="btn btn-success btn-sm"
 onclick="updateStatus('${item.id}')">

 Save

</button>

</td>

      </tr>
    `;
  });

  document.getElementById("totalCount").innerText = total;
  document.getElementById("pendingCount").innerText = pending;
  document.getElementById("progressCount").innerText = progress;
  document.getElementById("resolvedCount").innerText = resolved;
}

window.updateStatus = async function (docId) {

  const status =
    document.getElementById(docId).value;

  await updateDoc(
    doc(db, "complaints", docId),
    {
      status: status
    }
  );

  alert("Status Updated Successfully");

  loadComplaints();
};

window.viewComplaint = function(data) {

  document.getElementById(
    "modalComplaintId"
  ).innerText =
    data.complaintId || "-";

  document.getElementById(
    "modalCategory"
  ).innerText =
    data.category || "-";

  document.getElementById(
    "modalStreet"
  ).innerText =
    data.street || "-";

  document.getElementById(
    "modalMobile"
  ).innerText =
    data.mobile || "-";

  document.getElementById(
    "modalStatus"
  ).innerText =
    data.status || "-";

  document.getElementById(
    "modalDescription"
  ).innerText =
    data.description || "-";

  document.getElementById(
    "modalCreatedAt"
  ).innerText =
    data.createdAt || "-";

  const modal =
    new bootstrap.Modal(
      document.getElementById(
        "complaintModal"
      )
    );

  modal.show();
};