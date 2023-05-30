import express from "express";
import categoryController from "../controllers/categories.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/", categoryController.getAll);
router.post("/", upload.single("image"), categoryController.createCategory);
router.patch("/:id", upload.single("image"), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
