import express from 'express';
import { accessTo, protectedRoutes } from '../middleware/protectedRoutes.js';
import { initiatePayment, listPayments, verifyPayment } from '../controller/payment.controller.js';
const router = express.Router();

router.get('/', protectedRoutes, accessTo("ADMIN"), listPayments);
router.post('/initiate', protectedRoutes, initiatePayment);
router.post('/verify', protectedRoutes, verifyPayment);

export default router;