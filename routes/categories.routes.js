import  express  from "express";
import categoryController from "../controllers/categories.controller.js";



const router = express.Router();


router.route('/').get(categoryController.getAll)
router.route('/').post(categoryController.createCategory)
router.route('/:id').delete(categoryController.deleteCategory)
router.route('/:id').put(categoryController.updateCategory)




export default router;