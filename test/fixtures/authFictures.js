import { authTypes } from '../../src/store/types';

export const initialState = {
  status: authTypes.check,
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
}

export const demoUser = {
  uid: '12345',
  email: 'test@gmail.com',
  displayName: 'Demo user',
  photoUrl: 'https://demo.jpg',
}

export const authenticatedState = {
  ...demoUser,
  status: authTypes.auth,
  errorMessage: null,
}

export const notAuthenticatedState = {
  status: authTypes.notAuth,
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
  errorMessage: null,
}