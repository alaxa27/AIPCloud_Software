"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.analyseNewEntry = undefined;var _firebaseFunctions = require("firebase-functions");var functions = _interopRequireWildcard(_firebaseFunctions);
var _firebaseAdmin = require("firebase-admin");var admin = _interopRequireWildcard(_firebaseAdmin);
var _axios = require("axios");var _axios2 = _interopRequireDefault(_axios);
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _os = require("os");var _os2 = _interopRequireDefault(_os);
var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);
var _formData = require("form-data");var _formData2 = _interopRequireDefault(_formData);
var _bluebird = require("bluebird");var _bluebird2 = _interopRequireDefault(_bluebird);

var _text_sentiment = require("./text_sentiment");var _text_sentiment2 = _interopRequireDefault(_text_sentiment);
var _sound_emotion = require("./sound_emotion");var _sound_emotion2 = _interopRequireDefault(_sound_emotion);
var _speech_2_text = require("./speech_2_text");var _speech_2_text2 = _interopRequireDefault(_speech_2_text);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}
// import { bucket } from "@google-cloud/storage"

var app = admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore(app);
var bucket = admin.storage().bucket();

var analyseNewEntry = exports.analyseNewEntry = functions.firestore.
document('entries/{entryID}').
onCreate(function (event) {
  // Get an object representing the document
  // e.g. {'name': 'Marie', 'age': 66}
  var entryRef = event.data.ref;
  var entry = event.data.data();
  switch (entry.type) {
    case 'conversation':
      {

        var filePath = '/entries/conversations/' + entry.file;
        var tempFilePath = _path2.default.join(_os2.default.tmpdir(), entry.file);

        return bucket.file(filePath).download({
          destination: tempFilePath }).

        then(function () {
          //Array of promises (needed to do multiple modification to firestore)
          var promises = [];

          promises.push((0, _sound_emotion2.default)(tempFilePath, entry.file).
          then(function (res) {
            var data = res.data;
            return entryRef.collection("analysis").doc("emotion").set({
              results: [data] },
            {
              merge: true });


            //Get promise and return promise

          }));

          promises.push((0, _speech_2_text2.default)(tempFilePath, entry.file).
          then(function (res) {
            var results = res.data.results;
            var proms = [];
            for (var i = 0; i < results.length; i++) {
              proms.push((0, _text_sentiment2.default)(results[i].transcript));
            }
            proms.push(results);
            return _bluebird2.default.all(proms);
          }).
          then(function (promsData) {
            var results = promsData[promsData.length - 1];
            for (var i = 0; i < results.length; i++) {
              results[i].sentiment = promsData[i].data;
            }
            return entryRef.collection("analysis").doc("speech_2_text").set({
              results: results },
            {
              merge: true });

          }));
          //for res in results
          //for each transcript fetchTextSentiment
          //save result as res.sentiment = data
          return _bluebird2.default.all(promises);
        });
      }}

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