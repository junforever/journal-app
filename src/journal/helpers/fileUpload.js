export const fileUpload = async( file ) => {
  try {
    if(!file) return null //throw new Error( 'No hay ningún archivo' )
    const cloudUrl = 'https://api.cloudinary.com/v1_1/junforever/upload'
    const formData =  new FormData()
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData
    })

    if( !resp.ok ) throw new Error( 'Error al subir el archivo' )

    const cloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (error) {
    //throw new Error( error )
    console.log(error)
    return null
  }

}
