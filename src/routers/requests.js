const { auth } = require("../middleware/auth");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { uploadRequest } = require("../controllers/requests");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Cake Requests", // Folder name in Cloudinary
    allowed_formats: ["jpeg", "png", "jpg"], // Accepted file types
  },
});

const upload = multer({ storage });

const router = require("express").Router();

router.post("/form", auth, upload.single("image"), uploadRequest);

module.exports = router;
