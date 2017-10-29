export default (firestore, event) => {
  let promises = []
  const anCol = firestore.collection("entries").doc(event.params.entryID).collection("analysis")
  promises.push(anCol.doc("emotion").get()
    .then(doc => {
      return doc.exists
    }))
  promises.push(anCol.doc("speech_2_text").get()
    .then(doc => {
      return doc.exists
    }))
  return Promise.all(promises)
    .then(values => {
      let checked = false;
      if (values[0] === true && values[1] === true) {
        checked = true;
      }
      return firestore.collection("entries").doc(event.params.entryID).set({
        checked: checked
      }, {
        merge: true
      })
    })
}
