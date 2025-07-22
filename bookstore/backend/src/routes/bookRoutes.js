import Book from "../models/Book";
import express from "express";
import cloudinary from "../config/cloudinary";
import protectRoute from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const {title, caption, image, rating} = req.body;
    if (!image || !caption || !title || !rating) {
      return res.status(400).json({ message: "Please provide all fields" })
    }

    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url

    const newBook = Book({
      title,
      caption, 
      image: imageUrl,
      rating,
      user: req.user_id
    })

    await newBook.save
    res.status(201).json(newBook)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router