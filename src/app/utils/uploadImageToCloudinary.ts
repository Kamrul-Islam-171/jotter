import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';


export const sendFiletoCloudinary = async (
  fileName: string,
  path: string,
) => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dtp5fwvg9',
    api_key: '592791113848874',
    api_secret: '61C-JnIo59kLnXhJXHtd6G3cjmU',
  });


  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: fileName,
      resource_type: 'auto' //Allows both image and PDF
    })
    .catch((error) => {
      console.log(error);
    });


  // delete file asynchronously  
  fs.unlink(path, (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('File deleted successfully!');
    }
  });

  return uploadResult;


};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    // console.log(file);
    const extension = file?.mimetype.split('/')[1];
    // console.log(ext)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  },
});



export const upload = multer({ storage: storage });

