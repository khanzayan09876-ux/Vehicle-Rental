
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name:"h8nbp9p7",
//   api_key:"211431377753247",
//   api_secret:"ESU2uhkE1UMzZDScTonX6V95CbE",
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: "uploads",
//   },
// });

// const upload = multer({ storage });

//  export default upload;


import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:"h8nbp9p7",
  api_key:"p641576197373726",
  api_secret:"ESU2uhkE1UMzZDScTonX6V95CbE"   ,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage: storage,
});

export default upload;