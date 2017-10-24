import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import axios from 'axios'
import path from 'path'
import os from 'os'
import fs from 'fs'
import FormData from 'form-data'

import fetchTextSentiment from './text_sentiment'
// import { bucket } from "@google-cloud/storage"

const app = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(app)
const bucket = admin.storage().bucket()

export let analyseNewEntry = functions.firestore
  .document('entries/{entryID}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const entryRef = event.data.ref;
    let entry = event.data.data();
    switch (entry.type) {
      case 'conversation':
        {
          const filePath = '/entries/conversations/' + entry.file
          const tempFilePath = path.join(os.tmpdir(), entry.file);

          bucket.file(filePath).download({
            destination: tempFilePath
          })
          .then(() => {
            //Call analysis
            const formData = new FormData();
            formData.append('file', fs.createReadStream(tempFilePath), entry.file)
            axios.post('https://api.aipcloud.io/analyze/sound/emotion',
                formData, {
                  headers: formData.getHeaders(),
                  auth: {
                    username: 'test1@jdc.fr',
                    password: 'dfgdfg1.'
                  }
                })
              .then(res => {
                //Save analysis result
                // We'll only update if the name has changed.
                // This is crucial to prevent infinite loops.
                console.log(entryRef);
                if (entry.analyzed) return;

                // const soundAnalysisRef = entryRef.collection('analysis').doc('sound')
                return entryRef.update({
                  analyzed: true,
                  analysis: res.data
                })
                // return soundAnalysisRef.set(res)

              })

          })
        }
    }
    // perform desired operations ...
  });
