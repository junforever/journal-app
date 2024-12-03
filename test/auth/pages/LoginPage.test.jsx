import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '../../../src/store/auth/authSlice'
import { MemoryRouter } from 'react-router-dom'
import { notAuthenticatedState } from '../../fixtures/authFictures'

const mockStartGoogleSignIn =  jest.fn()
const mockStartLoginWithEmailPassword =  jest.fn()
const email='test@gmail.com'
const password='123456'

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password}) => {
    return () => mockStartLoginWithEmailPassword({ email, password})
  }
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

describe('Testing LoginPage.jsx', () => {
  beforeEach( () => jest.clearAllMocks() )
  test('should show the component correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />

        </MemoryRouter>
      </Provider>
    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('google button should call startGoogleSignin', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />

        </MemoryRouter>
      </Provider>
    )

    //estado antes de dar click
    //console.log(store.getState())
    const googleBtn = screen.getByLabelText('google-btn')
    fireEvent.click(googleBtn)
    //estado despues de dar clic
    //console.log(store.getState())

    expect(mockStartGoogleSignIn).toHaveBeenCalled()


  })

  test('submit should call startLoginWithEmailPassword', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />

        </MemoryRouter>
      </Provider>
    )

    const emailField =  screen.getByRole('textbox', {name: 'Correo'})
    fireEvent.change(emailField, {target: {name: 'email', value: email}})

    const passField =  screen.getByTestId('Contraseña')
    fireEvent.change(passField, {target: {name: 'password', value: password}})

    const form =  screen.getByLabelText('submit-form')
    fireEvent.submit(form)

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email, password})

  })

})