import * as Actions from './actions';

export type Action = Actions.All;

export interface AppState {
  view: any;
}

const defaultState = {
  viewOnly: true,
  editView: false,
  addView: false,
  deleteView: false
}

const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function appReducer(state = defaultState, action: Action) {
  console.log(action.type, state)

  switch (action.type) {
    case Actions.EDIT_MODE:
      return newState(
        state,
        {
          viewOnly: false,
          editView: true,
          addView: false,
          deleteView: false
        }
      )

    case Actions.ADD_MODE:
      return newState(
        state,
        {
          viewOnly: false,
          editView: false,
          addView: true,
          deleteView: false
        }
      )

    case Actions.DELETE_MODE:
      return newState(
        state,
        {
          viewOnly: false,
          editView: false,
          addView: false,
          deleteView: true
        }
      )

    case Actions.VIEW_MODE:
      return defaultState;

    default:
      return state;
  }
}
