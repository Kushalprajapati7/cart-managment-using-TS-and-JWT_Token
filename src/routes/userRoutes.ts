import {getAllUsers, getUserById, updateUserById, deleteUserById, createUser} from '../controllers/userController'
import express from 'express';

import verifyToken from '../middlewares/authMiddleware'
const router = express.Router();


router.put('/users/:id',verifyToken, updateUserById);
router.get('/users', verifyToken,getAllUsers);
router.delete('/users/:id', verifyToken,deleteUserById);
router.post('/users', createUser);
router.get('/users/:id', getUserById);

export default router;