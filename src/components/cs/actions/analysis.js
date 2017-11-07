import {
  FETCH_S2T,
  FETCH_S2T_FULFILLED,
  FETCH_S2T_REJECTED,
  FETCH_EMOTION,
  FETCH_EMOTION_FULFILLED,
  FETCH_EMOTION_REJECTED
} from './types';

import firebase from 'firebase'
import db from '../firebase-app'


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
