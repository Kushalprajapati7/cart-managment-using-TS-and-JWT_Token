import { profileCreate,showAllProfiles,deleteProfile,updateProfile, showAllProfileById} from "../controllers/profileController";
import express from 'express'
import verifyToken from "../middlewares/authMiddleware";

const router = express.Router();

// router.post('/profile',verifyToken ,profileCreate);
router.post('/profile', profileCreate);
router.get('/profile', showAllProfiles);
router.delete('/profile/:id',deleteProfile);
router.put('/profile/:id',updateProfile);
router.get('/profileById/:id', showAllProfileById)

export default router;