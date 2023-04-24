import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

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

export default function Home() {
	const [data, setData] = useState({ username: '', password: '', battery: '' });

	useEffect(() => {
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const db = getDatabase(app);

		const dataRef = ref(db, 'data');
		onValue(dataRef, (snapshot) => {
			const temp = snapshot.val();
			setData(temp);
		});
	}, []);

	return (
		<>
			<h1>Username: {data.username}</h1>
			<h1>Password: {data.password}</h1>
			<h1>Battery: {data.battery}</h1>
		</>
	);
}
