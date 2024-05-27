import {getAllUsers, getUserById, updateUserById, deleteUserById} from '../controllers/userController'
import express from 'express';

import verifyToken from '../middlewares/authMiddleware'
const router = express.Router();


router.put('/users/:id',verifyToken, updateUserById);
router.get('/users', verifyToken,getAllUsers);
router.delete('/users/:id', verifyToken,deleteUserById);
router.get('/users/:id', verifyToken,getUserById);

export default router;