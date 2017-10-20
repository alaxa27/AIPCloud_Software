import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED
} from '../actions/types';

export default function(state = {
  entries: []
}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_FULFILLED:
      return {...state, entries: action.payload};
  }

  return state;
}
