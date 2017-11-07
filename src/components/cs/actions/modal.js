import {
  TOGGLE_ADD_MODAL,
  TOGGLE_DELETE_MODAL
} from './types';

export function toggleAddModal() {
  return dispatch => {
    dispatch({
      type: TOGGLE_ADD_MODAL
    })
  }
}

export function toggleDeleteModal() {
  return dispatch => {
    dispatch({
      type: TOGGLE_DELETE_MODAL
    })
  }
}
