export default (firestore, event) => {
  let promises = []
  const entryRef = firestore.collection("entries").doc(event.params.entryID)
  const anCol = entryRef.collection("analysis")
  promises.push(anCol.doc("emotion").get()
    .then(doc => {
      return doc.exists;
    }))
  promises.push(anCol.doc("speech_2_text").get()
    .then(doc => {
      return doc.exists;
    }))
  promises.push(entryRef.get()
    .then(doc => {
      return doc.data().analyzing;
    }))
  return Promise.all(promises)
    .then(values => {
      let proms = [];
      let checked = false;
      if (values[0] === true && values[1] === true) {
        checked = true;
        proms.push(entryRef.set({
          analyzing: false
        }, {
          merge: true
        }))

      proms.push(entryRef
        .set({
          checked: checked
        }, {
          merge: true
        }))
        return Promise.all(proms)
    }
  })
}
