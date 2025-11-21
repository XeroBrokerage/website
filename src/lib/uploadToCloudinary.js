import cloudinary from '@/lib/cloudinary'

export const uploadToCloudinary = async buffer => {
  try {
    console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME)
    console.log('Buffer Size:', buffer.length, 'bytes')

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
        .end(buffer)
    })
    return uploadResult
  } catch (error) {
    throw error
  }
}
