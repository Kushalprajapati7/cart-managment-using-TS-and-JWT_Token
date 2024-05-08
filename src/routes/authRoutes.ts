import { signUp, login } from "../controllers/authContoller";
import  express from "express";
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;