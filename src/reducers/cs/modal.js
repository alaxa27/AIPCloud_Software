import {
  TOGGLE_ADD_MODAL,
  TOGGLE_DELETE_MODAL
} from '../../actions/cs/types';

export default function(state = {
  add_modal: false,
  delete_modal: false
}, action) {
  switch (action.type) {
    case TOGGLE_ADD_MODAL:
      return {...state, add_modal: !state.add_modal};
    case TOGGLE_DELETE_MODAL:
      return {...state, delete_modal: !state.delete_modal};
  }

  return state;
}
