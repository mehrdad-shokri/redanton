import merge from 'lodash/fp/merge'

import { alertMessage } from '../lib/uiActions'

function __mergeAuthData(state, authData) {
  return merge(state, {
    jwt: authData && authData.jwt,
    exp: authData && authData.exp,
    currentUser: authData && authData.user,
    initialStateLoaded: true
  })
}

function __clearCreds(state) {
  return merge(state, {
    jwt: null,
    exp: null,
    currentUser: null,
    initialStateLoaded: true
  })
}

function __mergeUserData(state, userData) {
  return merge(state, {
    currentUser: userData
  })
}

// ==================
// ==================
//      REDUCER
// ==================
// ==================

const defaultState = {
  exp: null,
  initialStateLoaded: false,
  jwt: null,
  currentUser: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
  case 'ADD_AUTH':
    return __mergeAuthData(state, action.payload)
  case 'LOAD_INITIAL_AUTH':
    return __mergeAuthData(state, action.payload)
  case 'SIGN_OUT':
    return __clearCreds(state)
  case 'UPDATE_CURRENT_USER':
    return __mergeUserData(state, action.payload)
  default:
    return state
  }
}

// ==================
// ==================
//      ACTIONS
// ==================
// ==================

export const authActions = {
  addAuth: (userData) => {
    return {
      type: 'ADD_AUTH',
      payload: userData,
      asyncData: { userData }
    }
  },

  loadInitialAuth: (userData) => {
    return {
      type: 'LOAD_INITIAL_AUTH',
      payload: userData
    }
  },

  signOut: () => ({
    type: 'SIGN_OUT',
    asyncData: {userData: null}
  }),

  updateCurrentUser: (userData) => ({
    type: 'UPDATE_CURRENT_USER',
    payload: userData
  }),

  onSignInFailure: () => {
    alert('there was an issue signing in. try again.')
  },

  onSignUpFailure: () => {
    alert('there was an issue signing up. try again.')
  }
}

// =================
// =================
//   ASYNC ACTIONS
// =================
// =================

export const loadInitialAuth = () => {
  return {
    type: 'GET_INITIAL_AUTH',
    withAsyncData: authActions.loadInitialAuth,
    asyncKey: 'userData'
  }
}

export const signIn = (userInfo) => {
  return {
    type: 'SIGN_IN',
    call: {
      action: 'POST',
      endpoint: '/api_auth/v1/login',
      params: {
        email: userInfo.email,
        password: userInfo.password
      },
      opts: {
        useNonApi: true
      },
      successActionCreator: authActions.addAuth,
      errorActionCreator: authActions.onSignInFailure
    }
  }
}

export const signUp = (userInfo) => {
  return {
    type: 'SIGN_UP',
    call: {
      action: 'POST',
      endpoint: '/api_auth/v1/sign_up',
      params: {
        email: userInfo.email,
        name: userInfo.name,
        password: userInfo.password,
        password_confirmation: userInfo.passwordConfirmation
      },
      opts: {
        useNonApi: true
      },
      successActionCreator: authActions.addAuth,
      errorActionCreator: authActions.onSignUpFailure
    }
  }
}