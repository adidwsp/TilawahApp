import express from "express"; 
import {
    getSurah,
    getSurahById
} from '../controllers/Surah.js';

const router = express.Router();

router.get('/surah', getSurah);
router.get('/surah/:id', getSurahById);

export default router;