console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

import {
  FETCH_ENTRY,
  FETCH_ENTRY_FULFILLED,
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  DELETE_ENTRY,
  CREATE_ENTRY,
  CREATE_ENTRY_FULFILLED,
  CREATE_ENTRY_REJECTED,
  UPLOAD_STATE_CHANGED
} from './types';
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
    console.log("finish");
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
  })

  // bucket.upload(data.file_path, function(err, file) {
  //   console.log("err", err);
  // })


  // files.createWriteStream({
  //     metadata: {
  //       contentType: 'audio/mp3'
  //     }
  //   })
  //   .on("error", (err) => {
  //     // console.error(err);
  //   })
  //   .end(fs.createReadStream('./data/0.mp3'))
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
  'Firmin'
]
//- 1e6 -> -1e10
let timestamp = new Date();
let customer = {};
let sales = {};
console.log("********************************************");
for (var i = 0; i <= 17; i++) {
  let data = {};
  data.timestamp = new Date(Date.now() - 1e10 * Math.random())
  data.customerFirstName = names[Math.floor(Math.random() * names.length)];
  data.customerLastName = names[Math.floor(Math.random() * names.length)];
  data.salesFirstName = names[Math.floor(Math.random() * names.length)];
  data.salesLastName = names[Math.floor(Math.random() * names.length)];
  data.type = 'conversation';
  let j = i%18
  data.file_path = path.join(__dirname, 'data', j + '.mp3');
  data.file_name = j + '.mp3'
  // console.log(data);
  console.log(j);
  createEntry(data)
}
