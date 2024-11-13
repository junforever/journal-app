import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../firebase'
import { clearNotesLogout } from '../journal'
import { checkingCredentials, logout, login } from './'

export const checkingAuthentication = ( email, password ) => {
  return async( dispatch ) => {
    console.log(email, password)
    dispatch( checkingCredentials() )
  }
}

export const startGoogleSignIn = () => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() )

    const result = await singInWithGoogle()
    if ( !result.ok ) dispatch( logout( result.errorMessage ) )

    dispatch( login( result ))
  }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() )
    const { ok, uid, photoUrl, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

    if( !ok ) return dispatch( logout(errorMessage) )

    dispatch( login({ uid, email, photoUrl, displayName }) )
  }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async( dispatch) => {
    dispatch( checkingCredentials() )
    const { ok, uid, photoUrl, errorMessage, displayName } = await loginUserWithEmailPassword({ email, password })

    if( !ok ) return dispatch( logout(errorMessage) )

    dispatch( login({ uid, email, photoUrl, displayName }) )

  }
}

export const startLogout = ( ) => {
  return async( dispatch ) => {
    await logoutFirebase()
    dispatch( clearNotesLogout() )
    dispatch( logout() )
  }
}