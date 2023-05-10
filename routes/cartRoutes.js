import express from "express";
import { addToCart, removeFromCart, AllCarts, deleteAllCarts,Acart, deleteACart} from "../controllers/cartController.js"

const router = express.Router();

router.post("/addtocart", addToCart);
router.post("/removefromcart", removeFromCart);
router.get("/allcarts", AllCarts);
router.delete("/deletecarts", deleteAllCarts);
router.get("/:id", Acart);
router.delete("/:id", deleteACart);





export default router