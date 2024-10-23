import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseAuth } from './'

const googleProvider = new GoogleAuthProvider()

export const singInWithGoogle = async() => {
  try {
    //get google credentials and google auth/access token
    //const credentials = GoogleAuthProvider.credentialFromResult( result )
    //console.log(credentials)

    //user info, the access token in this object is a firebase generated token not google token
    const result = await signInWithPopup( FirebaseAuth, googleProvider)
    //result.user properties
    //accessToken
    //displayName
    //emailVerified
    //photoUrl
    //providerId
    //email
    //uid
    //...etc
    const { displayName, email, photoUrl, uid } = result.user

    return {
      ok: true,
      displayName, email, photoUrl, uid
    }

  } catch(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    return {
      ok: false,
      errorCode,
      errorMessage,
      email,
      credential
    }
  }
}

export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
    const { uid, photoUrl } = resp.user

    //si el usuario se crea y no hay errores, FirebaseAuth.currentUser guarda la información del usuario
    //como segundo parámetro de esta función se envia las propiedades que se quiere actualizar al usuario de firebase
    await updateProfile( FirebaseAuth.currentUser, { displayName } )
    return {
      ok: true,
      uid,
      photoUrl,
      email
    }

  } catch ( err ) {
    return {
      ok: false,
      errorMessage: err.message
    }
  }

}

export const loginUserWithEmailPassword = async({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoUrl, displayName } = resp.user
    return {
      ok: true,
      uid,
      photoUrl,
      email,
      displayName
    }
  } catch ( err ) {
    return {
      ok: false,
      errorMessage: err.message
    }
  }
}

export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut()
}