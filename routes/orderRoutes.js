import express from 'express';

import { creatAnOrder, deleteAllOrders, deleteAnOrder, getAllOrders, getAnOrder, updateAnOrder, orderStatus, userOrder } from '../controllers/orderController.js';

const router = express.Router();


router.get('/', getAllOrders)
router.get('/:id', getAnOrder)
router.get('/user/:id', userOrder)

router.put('/:id', updateAnOrder)
router.delete('/:id', deleteAnOrder)
router.delete('/', deleteAllOrders)
router.patch('/:id', orderStatus)

router.post('/', creatAnOrder)

export default router;