import { authSlice, login, logout, checkingCredentials } from '../../../src/store/auth'
import { authTypes } from '../../../src/store/types'
import { demoUser, initialState, authenticatedState, notAuthenticatedState } from '../../fixtures/authFictures'

describe('Pruebas de authSlice', () => {
  test('should return the initial state and the slice name must be auth', () => {
    //1. probamos que el nombre del slice coincida
    //el slice es un objeto de js por lo que podemos acceder a sus propiedades y metodos como se hace con cualquier otro objeto
    //para ver que contiene podemos hacer un console.log
    //console.log(authSlice)
    expect( authSlice.name ).toBe('auth')

    //2. probamos el estado inicial
    const state = authSlice.reducer( initialState, {})
    //para verificar como queda el estado despues de inicializarlo hacemos un clg
    //console.log(state)

    expect( state ).toEqual( initialState )

  })

  test('should auth the user', () => {
    //para probar una accion del reducer usamos la action creation functions retornadas del slice
    //1 enviamos la accion correspondiente
    const state = authSlice.reducer( initialState, login( demoUser ) )
    //2 hacemos la comparacion del nuevo estado despues del login
    expect( state ).toEqual({
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoUrl: demoUser.photoUrl,
      status: authTypes.auth,
      errorMessage: null,
    })
  })

  test('the user must not be authenticated after the logout', () => {
    //para probar una accion del reducer usamos la action creation functions retornadas del slice
    //1 enviamos la accion correspondiente
    const state = authSlice.reducer( authenticatedState, logout() )
    //2 hacemos la comparacion del nuevo estado despues del logout
    expect( state ).toEqual({
      uid: notAuthenticatedState.uid,
      email: notAuthenticatedState.email,
      displayName: notAuthenticatedState.displayName,
      photoUrl: notAuthenticatedState.photoUrl,
      status: authTypes.notAuth,
      errorMessage: null,
    })
  })

  test('should show an error on logout', () => {
    const errorMessage = 'Invalid credentials'
    //para probar una accion del reducer usamos la action creation functions retornadas del slice
    //1 enviamos la accion correspondiente
    const state = authSlice.reducer( authenticatedState, logout(errorMessage) )
    //2 hacemos la comparacion del nuevo estado despues del logout
    expect( state.errorMessage ).toBe( errorMessage )
  })

  test('should change the status to checking', () => {
    const state = authSlice.reducer( authenticatedState, checkingCredentials() )
    expect( state.status ).toBe( authTypes.check )
  })


})