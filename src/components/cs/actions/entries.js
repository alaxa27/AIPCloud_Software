
import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  DELETE_ENTRY,
  CREATE_ENTRY
} from './types';

import db from '../firebase-app'

export function fetchEntries() {
  return dispatch => {
    db.collection("entries").get().then((snapshot) => {
      let payload = []
      snapshot.forEach((doc) => {
        payload.push(doc.data())
        payload[payload.length - 1].id = doc.id
      })
      dispatch({
        type: FETCH_ENTRIES_FULFILLED,
        payload: payload
      })
    })

  };
}
