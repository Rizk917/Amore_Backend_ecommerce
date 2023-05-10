import express from "express";
import {
  addPopularProduct,
  getAllPopularProducts,
  deletePopularProduct,
} from "../controllers/PopularProductController.js";

const router = express.Router();

// Route to add a new popular product
router.post("/", addPopularProduct);

// Route to get all popular products
router.get("/", getAllPopularProducts);

// Route to delete a popular product by ID
router.delete("/:id", deletePopularProduct);

export default router;
