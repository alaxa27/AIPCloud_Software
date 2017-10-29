"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.analyseEntry = exports.checkEntry = exports.analyseNewEntry = undefined;var _firebaseFunctions = require("firebase-functions");var functions = _interopRequireWildcard(_firebaseFunctions);
var _firebaseAdmin = require("firebase-admin");var admin = _interopRequireWildcard(_firebaseAdmin);


var _analyze_entry = require("./analyze_entry");var _analyze_entry2 = _interopRequireDefault(_analyze_entry);
var _check_entry = require("./check_entry");var _check_entry2 = _interopRequireDefault(_check_entry);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}var cors = require('cors')({ origin: '*' });

var app = admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore(app);
var bucket = admin.storage().bucket();

var analyseNewEntry = exports.analyseNewEntry = functions.firestore.
document('entries/{entryID}').
onCreate(function (event) {
  return (0, _analyze_entry2.default)(bucket, event.data);

});

var checkEntry = exports.checkEntry = functions.firestore.
document('entries/{entryID}/analysis/{anId}').
onCreate(function (event) {
  return (0, _check_entry2.default)(firestore, event);
});

var analyseEntry = exports.analyseEntry = functions.https.
onRequest(function (req, res) {
  cors(req, res, function () {
    var id = req.body.id;

    return firestore.collection("entries").doc(id).get().
    then(function (snap) {
      return (0, _analyze_entry2.default)(bucket, snap).
      then(function (values) {
        res.status(200).send("Analysis completed.");
      }).
      catch(function (e) {
        res.status(500).send("Error analyzing. Try again later.");
      });
    });
  });
});