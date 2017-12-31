import {
  CREATE_ENTRY,
  CREATE_ENTRY_FULFILLED,
  FETCH_ENTRIES,
  FETCH_ENTRIES_FULFILLED,
  FETCH_ENTRIES_REJECTED,
  FETCH_ENTRY,
  FETCH_ENTRY_FULFILLED,
  FETCH_ENTRY_REJECTED,
  DELETE_ENTRY,
  DELETE_ENTRY_FULFILLED,
  DELETE_ENTRY_REJECTED
} from '../../actions/cs/types';

const entry = {
  loading: false,
  checked: null,
  deleting_entry: true,
  customer: {
    first_name: "",
    last_name: ""
  },
  sales: {
    first_name: "",
    last_name: ""
  },
  timestamp: new Date(),
  file: ""
};


export default function(state = {
    add_modal: false,
    loading: false,
    entries: [
      entry
    ],
    entry: entry
  }, action) {
  switch (action.type) {
    case FETCH_ENTRIES:
      return {
        ...state,
        loading: true
      }
    case FETCH_ENTRIES_FULFILLED:
      return {
        ...state,
        entries: action.payload,
        loading: false
      };
    case FETCH_ENTRIES_REJECTED:
      return {
        ...state,
        loading: false
      }
    case FETCH_ENTRY:
      state.entry.loading = true;
      return state
    case FETCH_ENTRY_FULFILLED:
      action.payload.loading = false;
      return { ...state,
        entry: action.payload,
      };
    case FETCH_ENTRY_REJECTED:
      state.entry.loading = false;
      return state;
    case DELETE_ENTRY:
      return {
        ...state,
        deleting_entry: true
      }
    case DELETE_ENTRY_FULFILLED:
      return {
        ...state,
        deleting_entry: false
      }
    case DELETE_ENTRY_REJECTED:
      return {
        ...state,
        deleting_entry: false
      }
  }

  return state;
}
