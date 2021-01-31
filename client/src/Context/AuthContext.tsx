import React from 'react';

export interface iAuthState {
  email: string;
  token: string | null;
  loading: boolean;
  signedIn: boolean;
  membershipStatus: boolean;
}

export const InitialState: iAuthState = {
  email: 'none',
  token: null,
  loading: false,
  signedIn: false,
  membershipStatus: false,
};

export type Action =
  | {type: 'TOKEN'; payload: string | null}
  | {type: 'EMAIL'; payload: string}
  | {type: 'LOADING'; payload: boolean}
  | {type: 'MEMBERSHIP_STATUS'; payload: boolean}
  | {type: 'SIGNED_IN'; payload: boolean};

export const authReducer = (
  state = InitialState,
  action: Action,
): iAuthState => {
  switch (action.type) {
    case 'TOKEN':
      return {...state, token: action.payload};
    case 'MEMBERSHIP_STATUS':
      return {...state, membershipStatus: action.payload};
    case 'EMAIL':
      return {...state, email: action.payload};
    case 'LOADING':
      return {...state, loading: action.payload};
    case 'SIGNED_IN':
      return {...state, signedIn: action.payload};

    default:
      return state;
  }
};

export const AuthContext = React.createContext<any>(InitialState);
