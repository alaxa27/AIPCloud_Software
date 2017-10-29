import {
  TOGGLE_ADD_MODAL
} from './types';

export function toggleAddModal() {
  return dispatch => {
    dispatch({
      type: TOGGLE_ADD_MODAL
    })
  }
}
