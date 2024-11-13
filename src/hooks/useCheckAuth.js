import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../store/auth'
import { FirebaseAuth } from '../firebase'
import { startLoadingNotes } from '../store/journal/thunks'

export const useCheckAuth = () => {
  const { status } = useSelector( state => state.auth )
  const dispatch =  useDispatch()

  useEffect( () => {
    onAuthStateChanged( FirebaseAuth, async( user ) => {
      if ( !user ) return dispatch( logout() )

      const { uid, email, photoUrl, displayName } = user

      dispatch( login({ uid, email, photoUrl, displayName }) )
      dispatch( startLoadingNotes() )
    } )

  }, [])

  return {
    status
  }
}