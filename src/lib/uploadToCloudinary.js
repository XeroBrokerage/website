import cloudinary from "@/lib/cloudinary";

export const uploadToCloudinary = async (buffer) => {
  try {
    console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("Buffer Size:", buffer.length, "bytes");

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(buffer);
    });
    return uploadResult;
  } catch (error) {
    throw error;
  }
};

// import { Readable } from "stream";
// import cloudinary from "@/lib/cloudinary";

// export const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { resource_type: "image" },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary Upload Error:", error);
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );

//     // ♻️ Turn Buffer into a proper Readable stream
//     Readable.from(buffer).pipe(uploadStream);
//   });
// };


// import cloudinary from "@/lib/cloudinary";

// export const uploadToCloudinary = async (buffer) => {
//   try {
//     const base64String = buffer.toString('base64');
    
//     const dataUri = `data:image/jpeg;base64,${base64String}`;

//     const uploadResult = await cloudinary.uploader.upload(dataUri, {
//       resource_type: "image",
//     });

//     return uploadResult;
//   } catch (error) {
//     console.error("Cloudinary Upload Error:", error);
//     throw error;
//   }
// };
