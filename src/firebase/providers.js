import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
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
    console.log('llega:',{email, password, displayName})
    const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
    const { uid, photoUrl } = resp.user

    console.log(resp)
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