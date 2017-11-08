import {
  FETCH_ENTRY,
  FETCH_ENTRY_FULFILLED,
  FETCH_ENTRY_REJECTED,
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  FETCH_ENTRIES_REJECTED,
  CREATE_ENTRY,
  CREATE_ENTRY_FULFILLED,
  CREATE_ENTRY_REJECTED,
  UPLOAD_STATE_CHANGED,
  FETCH_ANALYSIS,
  FETCH_ANALYSIS_FULFILLED,
  FETCH_ANALYSIS_REJECTED,
  TOGGLE_ADD_MODAL,
  DELETE_ENTRY,
  DELETE_ENTRY_FULFILLED,
  DELETE_ENTRY_REJECTED
} from './types';
import guid from '../guid'
import axios from 'axios'

import firebase from 'firebase'
import db from '../firebase-app'

import {
  fetchS2T,
  fetchEmotion
} from './analysis'

export function fetchEntries() {
  return dispatch => {
    dispatch({
      type: FETCH_ENTRIES
    })
    db.collection("entries")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let payload = []
        snapshot.forEach((doc) => {
          payload.push(doc.data())
          payload[payload.length - 1].id = doc.id
        })
        dispatch({
          type: FETCH_ENTRIES_FULFILLED,
          payload: payload
        })
      }, (e) => {
        dispatch({
          type: FETCH_ENTRIES_REJECTED,
          payload: e
        })
      })

  };
}

export function fetchEntry(id) {
  return dispatch => {
    dispatch({
      type: FETCH_ENTRY
    })
    db.collection("entries").doc(id)
      .onSnapshot(snap => {
        if (snap.exists) {
          let payload = snap.data()
          payload.id = snap.id

          dispatch(fetchS2T(id));
          dispatch(fetchEmotion(id));
          dispatch({
            type: FETCH_ENTRY_FULFILLED,
            payload: payload
          })
        }
      }, e => {
        dispatch({
          type: FETCH_ENTRY_REJECTED,
          payload: e
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
        }).then((entryRef) => {
          dispatch({
            type: UPLOAD_STATE_CHANGED,
            payload: 100
          })
          setTimeout(() => {
            dispatch({
              type: TOGGLE_ADD_MODAL
            })
          }, 1000)
        }).catch((err) => {
          dispatch({
            type: CREATE_ENTRY_REJECTED,
            payload: err
          })
        })
      })
  }
}

export function deleteEntry(id) {
  return dispatch => {
    dispatch({
      type: DELETE_ENTRY
    })
    db.collection("entries").doc(id).delete()
      .then(function() {
        console.log("Document successfully deleted!");
        dispatch({
          type: DELETE_ENTRY_FULFILLED
        })
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
        dispatch({
          type: DELETE_ENTRY_REJECTED
        })
      });
  }
}

export function analyzeEntry(id) {
  return dispatch => {
    dispatch({
      type: FETCH_ANALYSIS
    })
    return axios('https://us-central1-aipsoft-ce792.cloudfunctions.net/analyseEntry', {
        method: 'post',
        data: {
          id: id
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_ANALYSIS_FULFILLED,
          payload: res.data
        })
      })
      .catch(e => {
        dispatch({
          type: FETCH_ANALYSIS_REJECTED,
          payload: e
        })
      })
  }
}
