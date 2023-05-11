import express from "express";
import cartController from "../controllers/newCartController";

const router = express.Router();

// Get all items in cart
router.get("/", cartController.getAll);

// Add item to cart
router.post("/", cartController.addItem);

// Update quantity of an item in cart
router.put("/:id", cartController.updateQuantity);

// Remove item from cart
router.delete("/:id", cartController.removeItem);

// Clear all items from cart
router.delete("/", cartController.clearCart);

export default router;
