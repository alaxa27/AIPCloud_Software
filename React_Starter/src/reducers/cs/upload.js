import {
  UPLOAD_STATE_CHANGED
} from '../../actions/cs/types';

export default function(state = {
  progress: -1
}, action) {
  switch (action.type) {
    case UPLOAD_STATE_CHANGED:
      return {...state, progress: action.payload};
  }

  return state;
}
