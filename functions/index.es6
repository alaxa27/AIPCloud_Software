import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import axios from 'axios'
import path from 'path'
import os from 'os'
import fs from 'fs'
import FormData from 'form-data'

import fetchTextSentiment from './text_sentiment'
import fetchSoundEmotion from './sound_emotion'
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
          //Array of promises (needed to do multiple modification to firestore)
          let promises = [];

          const filePath = '/entries/conversations/' + entry.file
          const tempFilePath = path.join(os.tmpdir(), entry.file);

          bucket.file(filePath).download({
            destination: tempFilePath
          })
          .then(() => {
            promises.push(fetchSoundEmotion(tempFilePath, entry.file)
              .then(res => {
                const data = res.data
                //Save data
                // return entryRef.update({
                //   analyzed: true,
                //   analysis: {
                //     sound: {
                //       emotion: res.data
                //     }
                //   }
                // })
                return entryRef.set({
                  analysis: {
                    sound: {
                      emotion: res.data
                    }
                  }
                }, {
                  merge: true
                })

                //Get promise and return promise

              }))
            promises.push(fetchTextSentiment("Je suis super content!")
              .then(res => {
                const data = res.data
                //Save data
                return entryRef.set({
                  analyzed: true,
                  analysis: {
                    text: {
                      sentiment: res.data
                    }
                  }
                }, {
                  merge: true
                })
                return entryRef.update(analysis.text.sentiment = res.data, firestore.createIfMissingOption(true))
                //Get promise and return promise

              }))
            // return soundAnalysisRef.set(res)
            return Promise.all(promises)
          })
        }
    }
  });
//   .then(res => {
//     //Save analysis result
//     // We'll only update if the name has changed.
//     // This is crucial to prevent infinite loops.
//     console.log(entryRef);
//     if (entry.analyzed) return;
//
//     // const soundAnalysisRef = entryRef.collection('analysis').doc('sound')
//   })
//   .then(res => {
//
//   })
// }
// perform desired operations ...
