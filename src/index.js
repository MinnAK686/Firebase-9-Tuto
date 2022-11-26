import { initializeApp } from "firebase/app"
import {
    getFirestore,collection,getDocs,
    addDoc,doc,deleteDoc, onSnapshot
} from "firebase/firestore"

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

const colRef = collection(db,"books");

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
onSnapshot(colRef, (snapshot) => {
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
        author: addData.author.value
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

