import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import axios from 'axios'
import path from 'path'
import os from 'os'
import fs from 'fs'
import FormData from 'form-data'
import Promise from 'bluebird'

import fetchTextSentiment from './text_sentiment'
import fetchSoundEmotion from './sound_emotion'
import fetchSpeech2text from './speech_2_text'
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

          return bucket.file(filePath).download({
              destination: tempFilePath
            })
            .then(() => {
              //Array of promises (needed to do multiple modification to firestore)
              let promises = [];

              promises.push(fetchSoundEmotion(tempFilePath, entry.file)
                .then(res => {
                  const data = res.data
                  return entryRef.set({
                    analyzed: true,
                    analysis: {
                      sound: {
                        emotion: data
                      }
                    }
                  }, {
                    merge: true
                  })

                  //Get promise and return promise

                }))

              promises.push(fetchSpeech2text(tempFilePath, entry.file)
                .then(res => {
                  const results = res.data.results;
                  let proms = [];
                  for (var i = 0; i < results.length; i++) {
                    proms.push(fetchTextSentiment(results[i].transcript))
                  }
                  proms.push(results)
                  return Promise.all(proms)
                })
                .then(promsData => {
                  let results = promsData[promsData.length - 1]
                  for (var i = 0; i < results.length; i++) {
                    results[i].sentiment = promsData[i].data
                  }
                  return entryRef.set({
                    analyzed: true,
                    analysis: {
                      sound: {
                        speech_2_text: results
                      }
                    }
                  }, {
                    merge: true
                  })
                }))
              //for res in results
              //for each transcript fetchTextSentiment
              //save result as res.sentiment = data
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
