import { loginUserWithEmailPassword, logoutFirebase, singInWithGoogle } from '../../../src/firebase'
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal'
import { demoUser } from '../../fixtures/authFictures'

//si no tenemos definido el ignorepatterns para firebase en el archivo de configuración de jest
//usamos esto y tambien para hace mock de todas las importaciones de firebase providers
jest.mock('../../../src/firebase/providers')

describe('Testing auth thunks', () => {
  //1 para probar un thunk hacemos un mock del dispatch y lo limpiamos antes de cada prueba
  const dispatch = jest.fn()
  beforeEach( () => jest.clearAllMocks() )

  test('should invoke checkingAuthentication', async() => {
    //2 definimos el test como async
    //3 llamamos la función del thunk que queremos probar enviando el mock del dispatch
    await checkingAuthentication()(dispatch)
    //4 comparamos el dispatch contra el objeto resultante de llamar la accion respectiva del reducer, en este caso el resultado de llamar checkingCredentials() es
    //{"payload": undefined, "type": "auth/checkingCredentials"}
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )

  })

  test('should call checkingCredentials and login, success case', async() => {
    const loginData = { ok: true, ...demoUser }
    //esto ya es un mock porque arriba todo lo que viene de esa ubicacion ya es un mock
    await singInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() )
    expect(dispatch).toHaveBeenCalledWith( login( loginData ) )
  })

  test('should call checkingCredentials and logout, error case', async() => {
    const loginData = { ok: false, errorMessage: 'Error in google auth' }
    //esto ya es un mock porque arriba todo lo que viene de esa ubicacion ya es un mock
    await singInWithGoogle.mockResolvedValue(loginData)
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() )
    expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ) )
  })

  test('startLoginWithEmailPassword should call checkingCredentials and login, success case', async() => {
    const loginData = { ok: true, ...demoUser  }
    const formData = { email: demoUser.email, password: '123456'  }

    //esto ya es un mock porque arriba todo lo que viene de esa ubicacion ya es un mock
    await loginUserWithEmailPassword.mockResolvedValue(loginData)
    await startLoginWithEmailPassword(formData)(dispatch)
    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() )
    expect(dispatch).toHaveBeenCalledWith( login( demoUser ) )
  })

  test('startLogout should call logoutFirebase,clearNote and logout', async() => {
    //esto ya es un mock porque arriba todo lo que viene de esa ubicacion ya es un mock
    await startLogout()(dispatch)
    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })

})