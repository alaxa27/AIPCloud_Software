import path from 'path'
import os from 'os'
import Promise from 'bluebird'

import fetchTextSentiment from './text_sentiment'
import fetchSoundEmotion from './sound_emotion'
import fetchSpeech2text from './speech_2_text'


export default (bucket, data) => {
  const entryRef = data.ref;
  let entry = data.data();

  if (entry.analyzing || entry.checked) {
    return true;
  }
  entryRef.set({
    analyzing: true
  }, {
    merge: true
  })
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
                  return entryRef.collection("analysis").doc("emotion").set({
                    results: data.emotion
                  })

                  //Get promise and return promise

                })
                .catch(e => {
                  entryRef.set({
                    analyzing: false
                  }, {
                    merge: true
                  })
                }))

                promises.push(fetchSpeech2text(tempFilePath, entry.file)
                  .then(res => {
                    const results = res.data.results;
                    let proms = [];
                    //Modify results to be an array of sentences
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
                    return entryRef.collection("analysis").doc("speech_2_text").set({
                      results: results
                    })
                  })
                  .catch(e => {
                    entryRef.set({
                      analyzing: false
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
  }
