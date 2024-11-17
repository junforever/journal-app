import { checkingCredentials } from '../../../src/store/auth/authSlice'
import { checkingAuthentication } from '../../../src/store/auth/thunks'

//si no tenemos definido el ignorepatterns para firebase en el archivo de configuración de jest
//usamos esto
//jest.mock('../../../src/firebase/providers')

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

})