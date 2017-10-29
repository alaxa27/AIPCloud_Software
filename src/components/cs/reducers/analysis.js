import {
  FETCH_ANALYSIS,
  FETCH_ANALYSIS_FULFILLED,
  FETCH_ANALYSIS_REJECTED
} from '../actions/types';

export default function(state = {
    analyzing: false
  }, action) {
  switch (action.type) {
    case FETCH_ANALYSIS:
      return { ...state,
        analyzing: true
      };
    case FETCH_ANALYSIS_FULFILLED:
      action.payload.loaded = true
      return { ...state,
        analyzing: false
      };
    case FETCH_ANALYSIS_REJECTED:
      return { ...state,
        analyzing: false
      }
  }

  return state;
}
