import express from "express";
import imageCarouselController from "../controllers/imageCarousel.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();

router.get("/", imageCarouselController.getAll);

router.post("/", upload.single("image"), imageCarouselController.createImage);

router.patch("/:id", upload.single("image"), imageCarouselController.updateImage);

router.delete("/:id", imageCarouselController.deleteImage);

export default router;
