import express  from 'express';
const router = express.Router();
import upload from '../middleware/upload.middleware.js'
import { getAbout, setAbout, updateAbout, deleteAbout,getAboutById} from '../controllers/aboutController.js';




router.route('/').get(getAbout)
router.route('/:id').get(getAboutById)
router.route('/').post(upload.single("aboutImage"),setAbout)
router.route('/:id').put(upload.single("aboutImage"),updateAbout)
router.route('/:id').delete(deleteAbout)

export default router;