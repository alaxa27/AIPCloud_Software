'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _axios = require('axios');var _axios2 = _interopRequireDefault(_axios);
var _formData = require('form-data');var _formData2 = _interopRequireDefault(_formData);
var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (path, name) {
  //Call analysis
  var formData = new _formData2.default();
  formData.append('file', _fs2.default.createReadStream(path), name);
  return _axios2.default.post('https://api.aipcloud.io/analyze/sound/speech2text',
  formData, {
    headers: formData.getHeaders(),
    auth: {
      username: 'test1@jdc.fr',
      password: 'dfgdfg1.' } });


};