
/////FIREBASE INIT
import firebase from 'firebase'
import 'firebase/firestore' // add this to use Firestore
firebase.initializeApp({
  apiKey: 'AIzaSyBJWKYDNd0NrYf0oyCO-NCubjqdMjj8kdc',
  authDomain: 'aipsoft-ce792.firebaseapp.com',
  projectId: 'aipsoft-ce792',
  storageBucket: 'gs://aipsoft-ce792.appspot.com/'
});
const db = firebase.firestore();

export default db
