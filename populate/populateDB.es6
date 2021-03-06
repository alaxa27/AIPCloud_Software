console.log("******************************");
console.log("*Generating the population...*");
console.log("******************************");
import fs from 'fs'
import path from 'path'

import guid from './guid'
import firebase from 'firebase'

var serviceAccount = require("./aipsoft-ce792-firebase-adminsdk-2i693-5743294beb.json");
import * as admin from "firebase-admin"
// var storage = require('@google-cloud/storage')();

var gcloud = require('gcloud')({
  projectId: 'aipcloud-ce792',
  keyFilename: './aipsoft-ce792-firebase-adminsdk-2i693-5743294beb.json'
});
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://aipsoft-ce792.appspot.com/'
});
const db = admin.firestore(app)
// const bucket = app.storage().bucket()
var storage = gcloud.storage();
const bucket = storage.bucket('aipsoft-ce792.appspot.com');

function createEntry(data) {

  const Guid = guid()
  const fileName = Guid + '.' + data.file_name.split('.').pop();
  const files = bucket.file("entries/conversations/" + data.file_name)

  var localReadStream = fs.createReadStream(data.file_path);
  var remoteWriteStream = bucket.file('entries/conversations/' + fileName).createWriteStream({
    metadata: {
      contentType: 'audio/mp3'
    }
  });
  localReadStream.pipe(remoteWriteStream)
    .on('finish', () => {
      console.log("File uploaded.");
      db.collection("entries").add({
          customer: {
            first_name: data.customerFirstName,
            last_name: data.customerLastName
          },
          sales: {
            first_name: data.salesFirstName,
            last_name: data.salesLastName
          },
          type: data.type,
          file: fileName,
          timestamp: data.timestamp
        })
        .then((ref) => {
          console.log("Document stored", ref.id);
        })
    })
}


const names = [
  'Alain',
  'Abdon',
  'Abel',
  'Basile',
  'Baptiste',
  'Blaise',
  'Bouchard',
  'Bruno',
  'Cassien',
  'Camilien',
  'Charlemagne',
  'Christophe',
  'Clotaire',
  'Constance',
  'Cyprien',
  'Cyriaque',
  'Cyrille',
  'Damien',
  'Didier',
  'Denis',
  'Dove',
  'Dimitri',
  'Eustache',
  'Fabien',
  'Firmin',
  'Benjamin',
  'Pierre',
  'Maxime',
  'Taqiyeddine'
]
//- 1e6 -> -1e10
let timestamp = new Date();
let customer = {};
let sales = {};
const N = 17
let j;
for (var i = 0; i <= N; i++) {
  let data = {};
  data.timestamp = new Date(Date.now() - 1e10 * Math.random())
  data.customerFirstName = names[Math.floor(Math.random() * names.length)];
  data.customerLastName = names[Math.floor(Math.random() * names.length)];
  data.salesFirstName = names[Math.floor(Math.random() * names.length)];
  data.salesLastName = names[Math.floor(Math.random() * names.length)];
  data.type = 'conversation';
  j = Math.round(N * Math.random())
  data.file_path = path.join(__dirname, 'data', j + '.mp3');
  data.file_name = j + '.mp3'
  // console.log(data);
  console.log(data);
  console.log("--------------------------")
  createEntry(data)
}
