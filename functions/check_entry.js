"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = function (firestore, event) {
  var promises = [];
  var anCol = firestore.collection("entries").doc(event.params.entryID).collection("analysis");
  promises.push(anCol.doc("emotion").get().
  then(function (doc) {
    return doc.exists;
  }));
  promises.push(anCol.doc("speech_2_text").get().
  then(function (doc) {
    return doc.exists;
  }));
  return Promise.all(promises).
  then(function (values) {
    var checked = false;
    if (values[0] === true && values[1] === true) {
      checked = true;
    }
    return firestore.collection("entries").doc(event.params.entryID).set({
      checked: checked },
    {
      merge: true });

  });
};