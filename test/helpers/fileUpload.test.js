import { fileUpload } from '../../src/journal/helpers'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'junforever',
  api_key: '375699648565723',
  api_secret: 'bct1rPO68-uRj8YgNUnYqfc3dxs',
  secure: true
})

describe('FileUpload testing', () => {
  test('image file should be upload to cloudinary', async() => {
    const imageURL = 'https://i.imgur.com/PMjMBQj.png'
    const resp = await fetch( imageURL )
    const blob = await resp.blob()
    const file = new File([ blob ], 'anime.png')

    const url = await fileUpload( file )
    expect( typeof url ).toBe('string')

    const segments = url.split('/')
    const imageId = segments[ segments.length - 1].replace('.png', '')

    //anteponer el nombre de la carpeta si no funciona con el id
    //const cr = await cloudinary.api.delete_resources([ `journal-app/${imageId}` ], {
    await cloudinary.api.delete_resources([ imageId ], {
      resource_type: 'image'
    })
  })

  test('fileUpload should return null', async() => {
    const url = await fileUpload( '' )
    expect( url ).toBeNull()
  })

})