import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
const cors = require('cors')({origin: '*'});

import analyze_entry from './analyze_entry';
import check_entry from './check_entry';

const app = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(app)
const bucket = admin.storage().bucket()

export let analyseNewEntry = functions.firestore
  .document('entries/{entryID}')
  .onCreate(event => {
    return analyze_entry(bucket, event.data);

  });

export let checkEntry = functions.firestore
  .document('entries/{entryID}/analysis/{anId}')
  .onCreate(event => {
    return check_entry(firestore, event);
  });

export let analyseEntry = functions.https
  .onRequest((req, res) => {
    cors(req, res, () => {
      const id = req.body.id;

      return firestore.collection("entries").doc(id).get()
      .then(snap => {
        return analyze_entry(bucket, snap)
      })
      .then((values) => {
        res.status(200).send("Analysis completed.");
      })
      .catch(e => {
        res.status(500).send("Error analyzing. Try again later.");
      })
    })
  });
