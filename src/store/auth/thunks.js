import { registerUserWithEmailPassword, singInWithGoogle } from '../../firebase'
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

export const startCreatingUserWithEmailPassword = async({ email, password, displayName }) => {
  return async( dispatch ) => {
    dispatch( checkingCredentials() )
    const resp = await registerUserWithEmailPassword({ email, password, displayName })

    console.log(resp)
  }
}