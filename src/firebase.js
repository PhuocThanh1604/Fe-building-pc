// // Import the functions you need from the SDKs you need
// import { initializeApp, firebase } from 'firebase/app'
// import { getMessaging, getToken, onMessage } from 'firebase/messaging'
// import '@firebase/messaging'
// import { getAnalytics } from 'firebase/analytics'
// import { getAuth } from 'firebase/auth'

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyAzGarNJlYNvqk7_WweOmiVgZPrsw5jGKA',
//   authDomain: 'web-build-pc-362d8.firebaseapp.com',
//   projectId: 'web-build-pc-362d8',
//   storageBucket: 'web-build-pc-362d8.appspot.com',
//   messagingSenderId: '551994962017',
//   appId: '1:551994962017:web:1ad1369378fee899133a20',
//   measurementId: 'G-3LQ21KKZ15',
// }
// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       resolve(payload)
//     })
//   })
// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
// const firebaseApp = initializeApp(firebaseConfig)
// const messaging = getMessaging(firebaseApp)
// const auth = getAuth(app)

// const config = {
//   messagingSenderId: '<your-app-messaging-sender-id>',
// }

// firebase.initializeApp(config)

// // we need to check if messaging is supported by the browser
// if (firebase.messaging.isSupported()) {
//   messaging = firebase.messaging()
// }

// export { messaging }

// Import the functions you need from the SDKs you need
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
