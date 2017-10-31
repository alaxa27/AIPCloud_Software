"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = function (firestore, event) {
  var promises = [];
  var entryRef = firestore.collection("entries").doc(event.params.entryID);
  var anCol = entryRef.collection("analysis");
  promises.push(anCol.doc("emotion").get().
  then(function (doc) {
    return doc.exists;
  }));
  promises.push(anCol.doc("speech_2_text").get().
  then(function (doc) {
    return doc.exists;
  }));
  promises.push(entryRef.get().
  then(function (doc) {
    return doc.data().analyzing;
  }));
  return Promise.all(promises).
  then(function (values) {
    var proms = [];
    var checked = false;
    if (values[0] === true && values[1] === true) {
      checked = true;
      proms.push(entryRef.set({
        analyzing: false },
      {
        merge: true }));


      proms.push(entryRef.
      set({
        checked: checked },
      {
        merge: true }));

      return Promise.all(proms);
    }
  });
};