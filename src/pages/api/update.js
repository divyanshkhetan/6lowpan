// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import nextConnect from 'next-connect';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAN5AxEKvhLV7Oe1DaqR4f-8q3O01d3e94',
	authDomain: 'lowpan-6c3a4.firebaseapp.com',
	projectId: 'lowpan-6c3a4',
	storageBucket: 'lowpan-6c3a4.appspot.com',
	messagingSenderId: '204225718178',
	appId: '1:204225718178:web:243ed024c550894fd934fb',
	measurementId: 'G-K719XP2PD9',
	databaseURL:
		'https://lowpan-6c3a4-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}).post((req, res) => {
  // get data from request
  // check if username exists in request
  if (!req.body.username || !req.body.password || !req.body.battery) {
    res.status(400).json({ error: 'invalid data' });
    return;
  }
  
  // write data to firebase
  set(ref(database, 'data'), {
    username,
    password,
    battery,
  });

  // return success
  res.status(200).json({ status: 'success' });
});