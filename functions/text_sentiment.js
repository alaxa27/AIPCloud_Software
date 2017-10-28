"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _axios = require("axios");var _axios2 = _interopRequireDefault(_axios);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

function (text) {
  //Need AJAX Here. If it works I think I need to dispatch another action.
  // Let's say GET_TEXT_SENTIMENT_FULFILLED...
  var textType = void 0;
  if (text.split(/[;!?.]+/g).length > 2 && text.length > 66) {
    textType = "text";
  } else {
    textType = "sentence";
  }

  return (0, _axios2.default)("https://api.aipcloud.io/analyze/" + textType, {
    method: 'post',
    data: {
      text: text,
      sentence: text },

    auth: {
      username: 'test1@jdc.fr',
      password: 'dfgdfg1.' } });



};