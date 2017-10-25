import {
  FETCH_ENTRY,
  FETCH_ENTRY_FULFILLED,
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  DELETE_ENTRY,
  CREATE_ENTRY,
  CREATE_ENTRY_FULFILLED,
  CREATE_ENTRY_REJECTED,
  UPLOAD_STATE_CHANGED
} from './types';
import guid from '../guid'

import firebase from 'firebase'
import db from '../firebase-app'

export function fetchEntries() {
  return dispatch => {
    db.collection("entries").get().then((snapshot) => {
      let payload = []
      snapshot.forEach((doc) => {
        console.log(doc.data());
        payload.push(doc.data())
        payload[payload.length - 1].id = doc.id
      })
      console.log(payload);
      dispatch({
        type: FETCH_ENTRIES_FULFILLED,
        payload: payload
      })
    })

  };
}

export function fetchEntry(id) {
  return dispatch => {
    db.collection("entries").doc(id).get().then(snap => {
      let payload = snap.data()
      payload.id = snap.id
      dispatch({
        type: FETCH_ENTRY_FULFILLED,
        payload: payload
      })
    })
  }
}

export function createEntry(data) {
  return dispatch => {
    const storageRef = firebase.storage().ref();
    const Guid = guid()
    const fileName = Guid + '.' + data.file.name.split('.').pop();
    const ref = 'entries/conversations/' + fileName;
    const uploadTask = storageRef.child(ref).put(data.file);
    dispatch({
      type: UPLOAD_STATE_CHANGED,
      payload: 1
    })

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 74 + 1;
        dispatch({
          type: UPLOAD_STATE_CHANGED,
          payload: progress
        })
      },
      (err) => {
        console.log(err);
        dispatch({
          type: UPLOAD_STATE_CHANGED,
          payload: -1
        })
        dispatch({
          type: CREATE_ENTRY_REJECTED,
          payload: err
        })
      },
      () => {
        db.collection("entries").add({
          customer: {
            first_name: data.customerFirstName,
            last_name: data.customerLastName
          },
          sales: {
            first_name: data.salesFirstName,
            last_name: data.salesLastName
          },
          type: data.type,
          file: fileName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          dispatch({
            type: CREATE_ENTRY_FULFILLED
          })
          dispatch({
            type: UPLOAD_STATE_CHANGED,
            payload: 100
          })
        }).catch((err) => {
          dispatch({
            type: CREATE_ENTRY_REJECTED,
            payload: err
          })
        })
      })
  }
}
