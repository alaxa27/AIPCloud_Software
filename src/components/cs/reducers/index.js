import { combineReducers } from 'redux';

import entries from './entries';
import upload from './upload';

export default combineReducers({
  entries,
  upload
})
