import { ActionReducer, Action } from '@ngrx/store';

export interface AppState {
    loginCounter: number;
}

export const INCREMENT = 'INCREMENT';
export const RESET = 'RESET';

export function LoginCounterReducer(state: number = 0, action: Action) {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        
        case RESET:
            return 0;

        default:
            return state;
    }
}