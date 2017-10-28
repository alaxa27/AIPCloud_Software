"use strict";


var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);
var _path = require("path");var _path2 = _interopRequireDefault(_path);

var _guid = require("./guid");var _guid2 = _interopRequireDefault(_guid);
var _firebase = require("firebase");var _firebase2 = _interopRequireDefault(_firebase);


var _firebaseAdmin = require("firebase-admin");var admin = _interopRequireWildcard(_firebaseAdmin);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}console.log("******************************");console.log("*Generating the population...*");console.log("******************************");var serviceAccount = require("./aipsoft-ce792-firebase-adminsdk-2i693-5743294beb.json");
// var storage = require('@google-cloud/storage')();

var gcloud = require('gcloud')({
  projectId: 'aipcloud-ce792',
  keyFilename: './aipsoft-ce792-firebase-adminsdk-2i693-5743294beb.json' });

var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://aipsoft-ce792.appspot.com/' });

var db = admin.firestore(app);
// const bucket = app.storage().bucket()
var storage = gcloud.storage();
var bucket = storage.bucket('aipsoft-ce792.appspot.com');

function createEntry(data) {

  var Guid = (0, _guid2.default)();
  var fileName = Guid + '.' + data.file_name.split('.').pop();
  var files = bucket.file("entries/conversations/" + data.file_name);

  var localReadStream = _fs2.default.createReadStream(data.file_path);
  var remoteWriteStream = bucket.file('entries/conversations/' + fileName).createWriteStream({
    metadata: {
      contentType: 'audio/mp3' } });


  localReadStream.pipe(remoteWriteStream).
  on('finish', function () {
    console.log("File uploaded.");
    db.collection("entries").add({
      customer: {
        first_name: data.customerFirstName,
        last_name: data.customerLastName },

      sales: {
        first_name: data.salesFirstName,
        last_name: data.salesLastName },

      type: data.type,
      file: fileName,
      timestamp: data.timestamp }).

    then(function (ref) {
      console.log("Document stored", ref.id);
    });
  });
}


var names = [
'Alain',
'Abdon',
'Abel',
'Basile',
'Baptiste',
'Blaise',
'Bouchard',
'Bruno',
'Cassien',
'Camilien',
'Charlemagne',
'Christophe',
'Clotaire',
'Constance',
'Cyprien',
'Cyriaque',
'Cyrille',
'Damien',
'Didier',
'Denis',
'Dove',
'Dimitri',
'Eustache',
'Fabien',
'Firmin'];

//- 1e6 -> -1e10
var timestamp = new Date();
var customer = {};
var sales = {};
for (var i = 0; i <= 17; i++) {
  var data = {};
  data.timestamp = new Date(Date.now() - 1e10 * Math.random());
  data.customerFirstName = names[Math.floor(Math.random() * names.length)];
  data.customerLastName = names[Math.floor(Math.random() * names.length)];
  data.salesFirstName = names[Math.floor(Math.random() * names.length)];
  data.salesLastName = names[Math.floor(Math.random() * names.length)];
  data.type = 'conversation';
  var j = i % 18;
  data.file_path = _path2.default.join(__dirname, 'data', j + '.mp3');
  data.file_name = j + '.mp3';
  // console.log(data);
  console.log(data);
  console.log("--------------------------");
  createEntry(data);
}