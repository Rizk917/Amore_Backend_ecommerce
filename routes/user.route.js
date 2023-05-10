import  express  from "express";
import userController from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";
const router = express.Router();



router.route('/').post(userController.registerUser);
router.route('/login').post(userController.loginUser);
router.route('/').get(userController.getUsers);

router.route('/me').get(protect,userController.getMe);
router.route('/:id').get(userController.getUserById);

router.route('/edit/:id').put(userController.editUser);
router.route('/:id').delete(userController.deleteUser);



export default router;