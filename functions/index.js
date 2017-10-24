"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.analyseNewEntry = undefined;var _firebaseFunctions = require("firebase-functions");var functions = _interopRequireWildcard(_firebaseFunctions);
var _firebaseAdmin = require("firebase-admin");var admin = _interopRequireWildcard(_firebaseAdmin);
var _axios = require("axios");var _axios2 = _interopRequireDefault(_axios);
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _os = require("os");var _os2 = _interopRequireDefault(_os);
var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);
var _formData = require("form-data");var _formData2 = _interopRequireDefault(_formData);

var _text_sentiment = require("./text_sentiment");var _text_sentiment2 = _interopRequireDefault(_text_sentiment);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}
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

        bucket.file(filePath).download({
          destination: tempFilePath }).

        then(function () {
          //Call analysis
          var formData = new _formData2.default();
          formData.append('file', _fs2.default.createReadStream(tempFilePath), entry.file);
          _axios2.default.post('https://api.aipcloud.io/analyze/sound/emotion',
          formData, {
            headers: formData.getHeaders(),
            auth: {
              username: 'test1@jdc.fr',
              password: 'dfgdfg1.' } }).


          then(function (res) {
            //Save analysis result
            // We'll only update if the name has changed.
            // This is crucial to prevent infinite loops.
            console.log(entryRef);
            if (entry.analyzed) return;

            // const soundAnalysisRef = entryRef.collection('analysis').doc('sound')
            return entryRef.update({
              analyzed: true,
              analysis: res.data });

            // return soundAnalysisRef.set(res)

          });

        });
      }}

  // perform desired operations ...
});