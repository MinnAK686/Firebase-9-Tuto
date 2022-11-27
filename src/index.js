import { initializeApp } from "firebase/app"
// Firestore
import {
    getFirestore,collection,getDocs,getDoc,
    addDoc,doc,deleteDoc, onSnapshot,
    query,where,        // Query
    orderBy,            // OrderBy
    serverTimestamp,    // Timestamp 
    updateDoc,          // Update

} from "firebase/firestore"
// Auth
import {
    getAuth,createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKXa-dsw4hSxjxbJbAmIRyXyvnaGY8LNM",
    authDomain: "fir-9-tuto-c22b6.firebaseapp.com",
    projectId: "fir-9-tuto-c22b6",
    storageBucket: "fir-9-tuto-c22b6.appspot.com",
    messagingSenderId: "232492649667",
    appId: "1:232492649667:web:2157b1658b4820be9ea676"
};

// Init Firestore Database
initializeApp(firebaseConfig);

// Init service
const db = getFirestore();
const auth = getAuth();

// Collection Reference
const colRef = collection(db,"books");

// Query
const q = query(colRef,where("author","==", "admin"))

// OrderBy Query 
const orderBooks = query(colRef, orderBy("createdAt","desc"))

// Get Collection Data
// getDocs(colRef)
//     .then((snapshot) => {
//         let books = [];
//         snapshot.docs.forEach((doc) => {
//             books.push({...doc.data(), id: doc.id})
//         })
//         console.log(books)
//     })

// Get Real Time Data
onSnapshot(orderBooks, (snapshot) => {
    let books = [];
    snapshot.forEach(doc => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})



// Add Data to Collection
const addData = document.querySelector(".addData");
addData.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addData.title.value,
        author: addData.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addData.reset()
    })
})


// Delete Data from Collection
const deleteData = document.querySelector(".deleteData");
deleteData.addEventListener("submit", (e) => {
    e.preventDefault();

    const delDoc = doc(db,"books", deleteData.id.value);

    deleteDoc(delDoc)
        .then(() => {
            deleteData.reset();
        })

})


// Get Single Document by ID
// const docRef = doc(colRef,"EMVM6af1zeTx2FI4u33j");

// onSnapshot(docRef, (doc) => {
//     console.log(doc.data(), doc.id)
// })


// Update Doc on Realtime
const updateData = document.querySelector(".updateData");
const bookID = document.querySelector(".bookID");

updateData.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(colRef, bookID.value);

    updateDoc(docRef, {
        title: "Title Updated"
    }).then((doc) => {
        console.log(doc.data(), doc.id)
    })

})


// Signup Form
const signupForm = document.querySelector(".signupForm");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let usrEmail = signupForm.email.value
    let usePassword = signupForm.password.value

    createUserWithEmailAndPassword(auth,usrEmail,usePassword)
        .then((cred) => {
            console.log(cred.user);
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// Signin 
const signinForm = document.querySelector(".signinForm");
signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let usrEmail = signinForm.email.value;
    let usePassword = signinForm.password.value;
    signInWithEmailAndPassword(auth, usrEmail, usePassword)
        .then((cred) => {
            console.log(cred.user);
            console.log("Signinned")
            signinForm.reset();
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// Signout
let signout = document.querySelector(".signout");
signout.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("Signout Success");
    }).catch((err) => {
        console.log(err.message)
    })
})


// Auth State
onAuthStateChanged(auth, (user) => {
    console.log("User State:\n",user)
})
