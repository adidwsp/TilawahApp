import express from "express"; 
import {
    getSurah,
    getSurahById,
    createSurah,
    updateSurah,
    deleteSurah
} from '../controllers/Surah.js';
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/surah', verifyUser, getSurah);
router.post('/surah/', verifyUser, createSurah);
router.get('/surah/:id', verifyUser, getSurahById);
router.patch('/surah/:id', verifyUser, updateSurah);
router.delete('/surah/:id', verifyUser, deleteSurah);


export default router;