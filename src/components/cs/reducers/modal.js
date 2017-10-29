import {
  TOGGLE_ADD_MODAL
} from '../actions/types';

export default function(state = {
  add_modal: false
}, action) {
  switch (action.type) {
    case TOGGLE_ADD_MODAL:
      return {...state, add_modal: !state.add_modal};
  }

  return state;
}
