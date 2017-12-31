import {
  FETCH_S2T,
  FETCH_S2T_FULFILLED,
  FETCH_S2T_REJECTED,
  FETCH_EMOTION,
  FETCH_EMOTION_FULFILLED,
  FETCH_EMOTION_REJECTED,
  UPDATE_SELECTED_ENTRIES,
  RESET_SELECTED_ENTRIES
} from './types';

import firebase from 'firebase'
import db from '../../utils/firebase-app'


export function fetchS2T(id) {
  return dispatch => {
    dispatch({
      type: FETCH_S2T
    })
    db.collection("entries").doc(id).collection("analysis").doc("speech_2_text")
      .onSnapshot(snap => {
        if (snap.exists) {
          let payload = snap.data()
          dispatch({
            type: FETCH_S2T_FULFILLED,
            payload: payload
          })
        }
      }, e => {
        dispatch({
          type: FETCH_S2T_REJECTED,
          payload: e
        })
      })
  }
}

export function fetchEmotion(id) {
  return dispatch => {
    dispatch({
      type: FETCH_EMOTION
    })
    db.collection("entries").doc(id).collection("analysis").doc("emotion")
      .onSnapshot(snap => {
        if (snap.exists) {
          let payload = snap.data()
          dispatch({
            type: FETCH_EMOTION_FULFILLED,
            payload: payload
          })
        }
      }, e => {
        dispatch({
          type: FETCH_EMOTION_REJECTED,
          payload: e
        })
      })
  }
}

export function updateSelectedEntries(entries, selectedEntries) {
  let payload = [];
  if (selectedEntries === "all") {
    payload = entries.map((entry, key) => {
      return entry.id
    })
  } else {
    payload = selectedEntries.map((selection, key) => {
      return entries[selection].id
    })
  }
  return dispatch => {
    dispatch({
      type: UPDATE_SELECTED_ENTRIES,
      payload: payload
    })
  }
}

export function resetSelectedEntries() {
  return dispatch => {
    dispatch({
      type: RESET_SELECTED_ENTRIES
    })
  }
}
