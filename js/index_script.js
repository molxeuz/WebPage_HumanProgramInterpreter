import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyACwgkG2MRieLB3QCJdHF4nIrZJGVvx3Pw",
    authDomain: "humanprograminterpreter.firebaseapp.com",
    projectId: "humanprograminterpreter",
    storageBucket: "humanprograminterpreter.appspot.com",
    messagingSenderId: "127925229010",
    appId: "1:127925229010:web:fe28a79d821ebaf829a40b",
    measurementId: "G-BVZR63CLHL"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
document.addEventListener('DOMContentLoaded', function() {
    const commentList = document.getElementById('comment-list');
    const commentText = document.getElementById('comment-text');
    const nameInput = document.getElementById('name-input');
    const submitComment = document.getElementById('submit-comment');
    const toggleComments = document.getElementById('toggle-comments');
    const commentsRef = collection(db, 'comments');
    let commentsLoaded = false;
    let commentsData = [];
    function loadComments() {
        const q = query(commentsRef, orderBy('timestamp', 'desc'));
        onSnapshot(q, (snapshot) => {
            commentsData = [];
            snapshot.forEach((doc) => {
                const commentData = doc.data();
                commentsData.push({
                    name: commentData.name,
                    text: commentData.text,
                    timestamp: new Date(commentData.timestamp?.toDate()).toLocaleString()
                });
            });
            commentsLoaded = true;
        });
    }
    submitComment.addEventListener('click', function() {
        const newComment = commentText.value;
        const name = nameInput.value;
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'none';
        if (newComment.trim() !== "" && name.trim() !== "") {
            addDoc(commentsRef, {
                name: name,
                text: newComment,
                timestamp: serverTimestamp()
            }).then(() => {
                commentText.value = '';
                nameInput.value = '';
                messageDiv.textContent = 'Comment successfully submitted.';
                messageDiv.className = 'message success';
                messageDiv.style.display = 'block';
                loadComments();
            }).catch((error) => {
                console.error("Error adding comment: ", error);
            });
        } else {
            messageDiv.textContent = 'You must complete both fields.';
            messageDiv.className = 'message error';
            messageDiv.style.display = 'block';
        }
    });
    toggleComments.addEventListener('click', function() {
        if (!commentsLoaded) return;
        commentList.innerHTML = '';
        if (toggleComments.textContent === 'View Comments') {
            commentsData.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment-item');
                commentDiv.style.textAlign = 'left';
                commentDiv.innerHTML = `
                    <p><strong>${comment.name}:</strong> ${comment.text}</p>
                    <small>${comment.timestamp}</small>
                `;
                commentList.appendChild(commentDiv);
            });
            toggleComments.textContent = 'Hide Comments';
        } else {
            commentList.innerHTML = '';
            toggleComments.textContent = 'View Comments';
        }
    });

    loadComments();
});