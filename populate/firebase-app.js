'use strict';Object.defineProperty(exports, "__esModule", { value: true });

var _firebase = require('firebase');var _firebase2 = _interopRequireDefault(_firebase);
require('firebase/firestore');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // add this to use Firestore
/////FIREBASE INIT
_firebase2.default.initializeApp({ apiKey: 'AIzaSyBJWKYDNd0NrYf0oyCO-NCubjqdMjj8kdc',
  authDomain: 'aipsoft-ce792.firebaseapp.com',
  projectId: 'aipsoft-ce792',
  storageBucket: 'gs://aipsoft-ce792.appspot.com/' });

var db = _firebase2.default.firestore();exports.default =

db;