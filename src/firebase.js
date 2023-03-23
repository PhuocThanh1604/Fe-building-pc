
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzGarNJlYNvqk7_WweOmiVgZPrsw5jGKA',
  authDomain: 'web-build-pc-362d8.firebaseapp.com',
  projectId: 'web-build-pc-362d8',
  storageBucket: 'web-build-pc-362d8.appspot.com',
  messagingSenderId: '551994962017',
  appId: '1:551994962017:web:1ad1369378fee899133a20',
  measurementId: 'G-3LQ21KKZ15',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);
export const auth = getAuth(app)
