
/////FIREBASE INIT
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
firebase.initializeApp({
  apiKey: 'AIzaSyBJWKYDNd0NrYf0oyCO-NCubjqdMjj8kdc',
  authDomain: 'aipsoft-ce792.firebaseapp.com',
  projectId: 'aipsoft-ce792'
});
const db = firebase.firestore();

export default db
