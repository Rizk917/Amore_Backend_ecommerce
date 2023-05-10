import express from "express";
import contactusController from "../controllers/contactUS.js";

const router = express.Router();

router.route("/")
  .get(contactusController.getcontactus)
  .post(contactusController.postcontactus);

router.route("/:id")
  .delete(contactusController.contUs);

export default router;
