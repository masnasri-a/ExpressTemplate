import express from 'express';
import controller from '../controllers/controller';
const router = express.Router();

router.get('/listNFT', controller.getListNFT);

export = router;