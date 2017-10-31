'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _path = require('path');var _path2 = _interopRequireDefault(_path);
var _os = require('os');var _os2 = _interopRequireDefault(_os);
var _bluebird = require('bluebird');var _bluebird2 = _interopRequireDefault(_bluebird);

var _text_sentiment = require('./text_sentiment');var _text_sentiment2 = _interopRequireDefault(_text_sentiment);
var _sound_emotion = require('./sound_emotion');var _sound_emotion2 = _interopRequireDefault(_sound_emotion);
var _speech_2_text = require('./speech_2_text');var _speech_2_text2 = _interopRequireDefault(_speech_2_text);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =


function (bucket, data) {
  var entryRef = data.ref;
  var entry = data.data();

  if (entry.analyzing || entry.checked) {
    return true;
  }
  entryRef.set({
    analyzing: true },
  {
    merge: true });

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

          }).
          catch(function (e) {
            entryRef.set({
              analyzing: false },
            {
              merge: true });

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

          }).
          catch(function (e) {
            entryRef.set({
              analyzing: false },
            {
              merge: true });

          }));
          //for res in results
          //for each transcript fetchTextSentiment
          //save result as res.sentiment = data
          return _bluebird2.default.all(promises);
        });
      }}

};