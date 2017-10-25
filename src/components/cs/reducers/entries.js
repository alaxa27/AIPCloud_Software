import {
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  FETCH_ENTRY_FULFILLED
} from '../actions/types';

export default function(state = {
  entries: [],
  entry: {
    customer: {
      first_name: "",
      last_name: ""
    },
    sales: {
      first_name: "",
      last_name: ""
    }
  }
}, action) {
  switch (action.type) {
    case FETCH_ENTRIES_FULFILLED:
      return { ...state,
        entries: action.payload
      };
    case FETCH_ENTRY_FULFILLED:
      return { ...state,
        entry: action.payload
      };
  }

  return state;
}
