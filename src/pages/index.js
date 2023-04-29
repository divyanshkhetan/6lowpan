import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from 'react';

import styles from '../styles/index.module.css';

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
	const [boardData, setBoardData] = useState({
		'cpu-on-time': 0,
		'deep-lpm': 0,
		'lpm': 0,
		'radio-listen': 0,
		'radio-off': 0,
		'radio-transmit': 0,
		'total-time': 0
	});
	const [cmdData, setCmdData] = useState({});
	const [statusData, setStatusData] = useState({});

	useEffect(() => {
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const db = getDatabase(app);

		const boardDataRef = ref(db, 'board_data');
		const cmdDataRef = ref(db, 'cmd');
		const statusRef = ref(db, 'status');

		onValue(boardDataRef, (snapshot) => {
			const temp = snapshot.val();
			setBoardData(temp);
			console.log("Board Data: ", boardData);
		});
		
		onValue(cmdDataRef, (snapshot) => {
			const temp = snapshot.val();
			setCmdData(temp);
			console.log("Cmd: ", cmdData);
		});
		
		onValue(statusRef, (snapshot) => {
			const temp = snapshot.val();
			setStatusData(temp);
			console.log("Status: ", statusData);
		});

	}, []);

	return (
		<>
			<div className={styles.header}>Gateway to Raspberry Pi 3</div>
			<div className={styles.boardData}>
				<div className={styles.gridRow4}>
					<div className={styles.gridItem}>
						<div>CPU-on-Time</div>
						<div>{boardData['cpu-on-time']}s</div>
					</div>				
					<div className={styles.gridItem}>
						<div>Deep-LPM</div>
						<div>{boardData['deep-lpm']}s</div>
					</div>				
					<div className={styles.gridItem}>
						<div>LPM</div>
						<div>{boardData['lpm']}s</div>
					</div>				
					<div className={styles.gridItem}>
						<div>Total Time</div>
						<div>{boardData['total-time']}s</div>
					</div>				
				</div>
				<div className={styles.gridRow3}>
					<div className={styles.gridItem}>
						<div>Radio Listen</div>
						<div>{boardData['radio-listen']}s</div>
					</div>				
					<div className={styles.gridItem}>
						<div>Radio Transmit</div>
						<div>{boardData['radio-transmit']}s</div>
					</div>				
					<div className={styles.gridItem}>
						<div>Radio Off</div>
						<div>{boardData['radio-off']}s</div>
					</div>				
				</div>
			</div>
			
		</>
	);
}
