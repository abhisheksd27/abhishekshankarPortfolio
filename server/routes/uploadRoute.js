import express from "express";
import multer from "multer";

const router = express.Router();

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// upload route
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    imageUrl: `http://localhost:5001/uploads/${req.file.filename}`
  });
});

export default router;