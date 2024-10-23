import { createSlice } from '@reduxjs/toolkit'
import { authTypes } from '../types'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: authTypes.check, //checking, not-authenticated, authenticated
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null,
  },
  reducers: {
    login: ( state, { payload } ) => {
      state.status= authTypes.auth
      state.uid= payload.uid
      state.email= payload.email
      state.displayName= payload.displayName
      state.photoUrl= payload.photoUrl
      state.errorMessage= null
    },

    logout: ( state, { payload } ) => {
      state.status= authTypes.notAuth
      state.uid= null
      state.email= null
      state.displayName= null
      state.photoUrl= null
      state.errorMessage= payload
    },

    checkingCredentials: (state) => {
      state.status = authTypes.check
    }
  },
})

//action creator functions
export const { login, logout, checkingCredentials } = authSlice.actions