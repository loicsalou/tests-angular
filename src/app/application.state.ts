import {Action, ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../environments/environment';

export namespace AppStateQuery {
  export const getAppState = (state: ApplicationState) => {
    return state.state;
  };
  // State1
  export const getState1 = createSelector(getAppState, (sub) => {
    const ret = sub.state1;
    return ret;
  });
  export const getState1Data1 = createSelector(getState1, sub => {
    const ret = sub.data1;
    return ret;
  });
  export const getState1Data2 = createSelector(getState1, sub => {
    const ret = sub.data2;
    return ret;
  });

  // State2
  export const getState2 = createSelector(getAppState, (sub) => {
    const ret = sub.state2;
    return ret;
  });
  export const getState2Data1 = createSelector(getState2, sub => {
    const ret = sub.data1;
    return ret;
  });
  export const getState2Data2 = createSelector(getState2, sub => {
    const ret = sub.data2;
    return ret;
  });
}

export interface AppState {
  state1: {
    data1: string;
    data2: string;
  };
  state2: {
    data1: string;
    data2: string;
  };
}

export interface ApplicationState {
  state: AppState;
}

export const INITIAL_STATE = {
  state1: {
    data1: 'state1 data1 initial',
    data2: 'state1 initial'
  },
  state2: {
    data1: 'state2 data1 initial',
    data2: 'state2 data2 initial'
  }
};

export const ROOT_REDUCERS: ActionReducerMap<ApplicationState> = {
  state: applicationStateReducer
};

/**
 * en dev on utilise le storeFreeze pour s'assurer du respect de l'immutabilité + un logger
 */
export const META_REDUCERS: MetaReducer<any>[] = environment.production ? [] : [ storeFreeze, logReducer ];

function logReducer(reducer) {
  return (state, action) => {
    console.log(action.type);
    const newState = reducer(state, action);
    return newState;
  };
}

export enum ApplicationActionType {
  SetAllActionType = '[shared] - change whole state',
  S1d1ActionType = '[shared] - change state 1 data 1',
  S1d2ActionType = '[shared] - change state 1 data 2',
  S2d1ActionType = '[shared] - change state 2 data 1',
  S2d2ActionType = '[shared] - change state 2 data 2',
}

export type ApplicationAction =
  | SetAllAction
  | S1d1
  | S1d2
  | S2d1
  | S2d2
  ;

export class SetAllAction implements Action {
  readonly type = ApplicationActionType.SetAllActionType;

  constructor(public s1d1: string, public s1d2: string, public s2d1: string, public s2d2: string) {
  }
}

export class S1d1 implements Action {
  readonly type = ApplicationActionType.S1d1ActionType;

  constructor(public value: string) {
  }
}

export class S1d2 implements Action {
  readonly type = ApplicationActionType.S1d2ActionType;

  constructor(public value: string) {
  }
}

export class S2d1 implements Action {
  readonly type = ApplicationActionType.S2d1ActionType;

  constructor(public value: string) {
  }
}

export class S2d2 implements Action {
  readonly type = ApplicationActionType.S2d2ActionType;

  constructor(public value: string) {
  }
}

export function applicationStateReducer(state: AppState = INITIAL_STATE, action: ApplicationAction): AppState {
  switch (action.type) {

    case ApplicationActionType.SetAllActionType: {
      return {
        state1: {
          data1: action.s1d1,
          data2: action.s1d2
        },
        state2: {
          data1: action.s2d1,
          data2: action.s2d2
        }
      };
    }

    case ApplicationActionType.S1d1ActionType: {
      return {
        ...state,
        state1: {
          ...state.state1,
          data1: action.value
        }
      };
    }

    case ApplicationActionType.S1d2ActionType: {
      return {
        ...state,
        state1: {
          ...state.state1,
          data2: action.value
        }
      };
    }

    case ApplicationActionType.S2d1ActionType: {
      return {
        ...state,
        state2: {
          ...state.state2,
          data1: action.value
        }
      };
    }

    case ApplicationActionType.S2d2ActionType: {
      return {
        ...state,
        state2: {
          ...state.state2,
          data2: action.value
        }
      };
    }

    default:
      return state;
  }
}
