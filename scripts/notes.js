import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, db } from '../firebaseConfig.js';

const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNote');
const notesList = document.getElementById('notesList');
const folderSelect = document.getElementById('folderSelect');
const folderViewSelect = document.getElementById('filterFolder');
// 1. Helper function to get sanitized collection name
function getCollectionName(email) {
    // Input email: user@example.com
    // After replacement: notes_user_example_com
    return `notes_${email.replace(/[.@]/g, '_')}`;
}
let allNotes = [];


async function addNote() {
    if (!noteInput.value.trim()) return;

    try {
        const user = auth.currentUser;
        if (!user) return;

        const userCollection = collection(db, getCollectionName(user.email));

        await addDoc(userCollection, {
            content: noteInput.value,
            createdAt: serverTimestamp(),
            folder: folderSelect.value || "Folder 1", // Default to "Folder 1" if no folder selected
        });

        noteInput.value = '';
    } catch (error) {
        console.error("Error adding note: ", error);
    }
}

// Given because the logic closely resembles the code above
// Delete note from Firestore
async function deleteNote(docId) {
    try {
        const user = auth.currentUser;
        if (!user) return;

        const userCollection = getCollectionName(user.email);
        await deleteDoc(doc(db, userCollection, docId));
    } catch (error) {
        console.error("Error deleting note: ", error);
    }
}

// // 5. Display notes in real-time
// function setupNotesListener() {
//     // 5a. Get current user object
//     const user = auth.currentUser;
//     if (!user) return;

//     // 6a. Get user collection object
//     const userCollection = collection(db, getCollectionName(user.email));

//     // 6b. Get notes query object
//     const notesQuery = query(userCollection, orderBy('createdAt', 'desc'));
    

//     // Listen to notes query object in real-time
//     onSnapshot(notesQuery, (snapshot) => {
//         // Clear notes list 
//         notesList.innerHTML = '';
//         // Loop through notes and display them 
//         snapshot.forEach((doc) => { 

//             // Get note object
//             const note = doc.data();
            
//             // Create note element
//             const noteElement = document.createElement('div');
//             noteElement.className = 'note-element';
//             console.log(folderViewSelect.value);
//             //if the folder the note is in is selected, display it or if all folders are selected, display all notes
//             if (folderViewSelect.value === note.folder || folderViewSelect.value === "All Folders") {
                
//                 // Create content element
//                 const contentElement = document.createElement('div');
//                 contentElement.className = 'note-content';
//                 contentElement.textContent = note.content;
                
//                 // Create delete button
//                 const deleteButton = document.createElement('button');
//                 deleteButton.className = 'delete-button';
//                 deleteButton.textContent = '🗑️';
//                 deleteButton.onclick = () => deleteNote(doc.id);
                
//                 // Append elements
//                 noteElement.appendChild(contentElement);
//                 noteElement.appendChild(deleteButton);
//                 notesList.appendChild(noteElement);
//             }

//         });
//     });
// }
function setupNotesListener() {
    const user = auth.currentUser;
    if (!user) return;

    const userCollection = collection(db, getCollectionName(user.email));
    const notesQuery = query(userCollection, orderBy('createdAt', 'desc'));

    onSnapshot(notesQuery, (snapshot) => {
        // Convert snapshot to a plain array of note objects
        allNotes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        // Now render based on the latest folder selection
        renderNotes();
    });
}
function renderNotes() {
    // Clear the notes list
    notesList.innerHTML = '';

    // Loop through allNotes array
    allNotes.forEach((note) => {
        // Check if folder matches or "All Folders" is selected
        if (folderViewSelect.value === note.folder || folderViewSelect.value === "All") {
            const noteElement = document.createElement('div');
            noteElement.className = 'note-element';

            // Note content
            const contentElement = document.createElement('div');
            contentElement.className = 'note-content';
            contentElement.textContent = note.content;

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = '🗑️';
            deleteButton.onclick = () => deleteNote(note.id);

            // Append elements
            noteElement.appendChild(contentElement);
            noteElement.appendChild(deleteButton);

            notesList.appendChild(noteElement);
        }
    });
}
folderViewSelect.addEventListener('change', renderNotes);

// Add note event listener
addNoteButton.addEventListener('click', addNote);

// Only display notes if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        setupNotesListener();
    } else {
        notesList.innerHTML = '';
    }
});
