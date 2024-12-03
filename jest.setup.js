/* eslint-disable */
import 'whatwg-fetch'

require('dotenv').config({
  path: '.env.test'
})

jest.mock('./src/journal/helpers/getEnvironments', () => ({
  getEnvironments: () => ({...process.env})
}))