import { combineReducers } from 'redux';

import entries from './entries';
import upload from './upload';
import analysis from './analysis';
import modal from './modal';

export default combineReducers({
  entries,
  upload,
  analysis,
  modal
})
