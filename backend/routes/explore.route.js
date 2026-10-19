// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import explore from "../model/explore.model.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const route = express.Router();





// // ==========================
// // MULTER (uploads folder = backend root / uploads)
// // ==========================

// const uploadsDir = path.join(__dirname, "..", "uploads");

// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadsDir),
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueName + path.extname(file.originalname).toLowerCase());
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowed = ["image/jpeg", "image/png", "image/webp"];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only JPG, PNG and WEBP images are allowed"));
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// // ==========================
// // CREATE EXPLORE
// // ==========================

// route.post("/exploreCreate", upload.single("ImageURL"), async function (req, res) {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     if (!req.file) {
//       return res.json({
//         success: false,
//         message: "Image is required",
//       });
//     }

//     const createdata = await explore.create({
//       name: req.body.name,
//       category: req.body.category,
//       rating: Number(req.body.rating),

//       // saaf path: uploads/123456-789.jpg
//       imageUrl: `uploads/${req.file.filename}`,

//       engine: req.body.engine,
//       transmission: req.body.transmission,
//       fuelType: req.body.fuelType,
//       seats: Number(req.body.seats),
//       acceleration: Number(req.body.acceleration),
//       price: Number(req.body.price),
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Explore created successfully",
//       data: createdata,
//     });
//   } catch (error) {
//     console.log("CREATE ERROR:", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // ==========================
// // GET EXPLORE
// // ==========================

// route.get("/getexplore", async function (req, res) {
//   try {
//     const exploredata = await explore.find();

//     return res.json({
//       success: true,
//       message: "Get API is successfully running",
//       data: exploredata,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while getting explores",
//     });
//   }
// });

// // ==========================
// // DELETE EXPLORE
// // ==========================

// route.post("/deleteapi", async function (req, res) {
//   try {
//     const deletedata = await explore.findOneAndDelete({
//       _id: req.body.id,
//     });

//     if (deletedata) {
//       // image file bhi delete kar do
//       if (deletedata.imageUrl) {
//         const filePath = path.join(__dirname, "..", deletedata.imageUrl);
//         fs.unlink(filePath, () => {});
//       }

//       return res.json({
//         success: true,
//         message: "Explore deleted successfully",
//       });
//     }

//     return res.json({
//       success: false,
//       message: "Explore not found",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while deleting explore",
//     });
//   }
// });

// // ==========================
// // UPDATE EXPLORE
// // ==========================

// route.post("/updateExplore", async function (req, res) {
//   try {
//     const exploreData = await explore.findOneAndUpdate(
//       { _id: req.body.id },
//       {
//         name: req.body.name,
//         category: req.body.category,
//         rating: Number(req.body.rating),
//         engine: req.body.engine,
//         transmission: req.body.transmission,
//         fuelType: req.body.fuelType,
//         seats: Number(req.body.seats),
//         acceleration: Number(req.body.acceleration),
//         price: Number(req.body.price),
//       },
//       { new: true }
//     );

//     if (exploreData) {
//       return res.json({
//         success: true,
//         message: "The explore is updated successfully",
//         data: exploreData,
//       });
//     }

//     return res.json({
//       success: false,
//       message: "Failed to update explore",
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while updating explore",
//     });
//   }

  
// });

// export default route;



import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import explore from "../model/explore.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const route = express.Router();

// ==========================
// MULTER (uploads folder = backend root / uploads)
// ==========================

const uploadsDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname).toLowerCase());
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and WEBP images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ==========================
// CREATE EXPLORE
// ==========================

route.post("/exploreCreate", upload.single("ImageURL"), async function (req, res) {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const createdata = await explore.create({
      name: req.body.name,
      category: req.body.category,
      rating: Number(req.body.rating),

      // saaf path: uploads/123456-789.jpg
      imageUrl: `uploads/${req.file.filename}`,

      engine: req.body.engine,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      seats: Number(req.body.seats),
      acceleration: Number(req.body.acceleration),
      price: Number(req.body.price),
    });

    return res.status(201).json({
      success: true,
      message: "Explore created successfully",
      data: createdata,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// ==========================
// GET EXPLORE
// ==========================

route.get("/getexplore", async function (req, res) {
  try {
    const exploredata = await explore.find();

    return res.json({
      success: true,
      message: "Get API is successfully running",
      data: exploredata,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while getting explores",
    });
  }
});

// ==========================
// DELETE EXPLORE
// ==========================

route.post("/deleteapi", async function (req, res) {
  try {
    const deletedata = await explore.findOneAndDelete({
      _id: req.body.id,
    });

    if (deletedata) {
      // image file bhi delete kar do
      if (deletedata.imageUrl) {
        const filePath = path.join(__dirname, "..", deletedata.imageUrl);
        fs.unlink(filePath, () => {});
      }

      return res.json({
        success: true,
        message: "Explore deleted successfully",
      });
    }

    return res.json({
      success: false,
      message: "Explore not found",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting explore",
    });
  }
});

// ==========================
// UPDATE EXPLORE
// ==========================

route.post("/updateExplore", upload.single("ImageURL"), async function (req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Explore id is required",
      });
    }

    const existing = await explore.findById(id);

    if (!existing) {
      return res.json({
        success: false,
        message: "Explore not found",
      });
    }

    const updateFields = {};

    // text fields
    ["name", "category", "engine", "transmission", "fuelType"].forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updateFields[key] = req.body[key];
      }
    });

    // number fields
    ["rating", "seats", "acceleration", "price"].forEach((key) => {
      if (req.body[key] !== undefined && req.body[key] !== "") {
        updateFields[key] = Number(req.body[key]);
      }
    });

    // nayi image aayi to purani delete karo
    if (req.file) {
      if (existing.imageUrl) {
        const oldPath = path.join(__dirname, "..", existing.imageUrl);
        fs.unlink(oldPath, () => {});
      }
      updateFields.imageUrl = `uploads/${req.file.filename}`;
    }

    const exploreData = await explore.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return res.json({
      success: true,
      message: "The explore is updated successfully",
      data: exploreData,
    });
  } catch (error) {
    console.log("UPDATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while updating explore",
    });
  }
});

export default route;