// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAN5AxEKvhLV7Oe1DaqR4f-8q3O01d3e94",
  authDomain: "lowpan-6c3a4.firebaseapp.com",
  projectId: "lowpan-6c3a4",
  storageBucket: "lowpan-6c3a4.appspot.com",
  messagingSenderId: "204225718178",
  appId: "1:204225718178:web:243ed024c550894fd934fb",
  measurementId: "G-K719XP2PD9",
  databaseURL: "https://lowpan-6c3a4-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function writeData() {
  set(ref(database, 'data'), {
    username: "pi",
    password: "sneaky2118",
    battery : "80%"
  });
}

export default function handler(req, res) {
  writeData();
  res.status(200).json({ status: 'Data Written Successfully' })
}
