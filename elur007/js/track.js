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

document
.getElementById("searchBtn")
.addEventListener("click", async () => {

    const searchId =
        document
        .getElementById("complaintId")
        .value
        .trim();

    const snapshot =
        await getDocs(
            collection(db, "complaints")
        );

    let found = false;

    snapshot.forEach((doc) => {

        const data = doc.data();

        if (data.complaintId === searchId) {

            found = true;

            document.getElementById("result").innerHTML = `
                <div class="card p-3">

                    <h5>${data.complaintId}</h5>

                    <p>
                    <strong>Category:</strong>
                    ${data.category}
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
            `;
        }

    });

    if (!found) {

        document.getElementById("result").innerHTML = `
            <div class="alert alert-danger">
                Complaint Not Found
            </div>
        `;
    }

});