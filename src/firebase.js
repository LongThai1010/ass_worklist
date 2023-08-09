import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBPyGkiruIj7rrmTTKMnb7bxV3xb9MUkkY",
    authDomain: "asm-worklist.firebaseapp.com",
    databaseURL: "https://asm-worklist-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "asm-worklist",
    storageBucket: "asm-worklist.appspot.com",
    messagingSenderId: "785593410136",
    appId: "1:785593410136:web:4a143ecb0de3df381a602d"
};

firebase.initializeApp(firebaseConfig)

export default firebase;