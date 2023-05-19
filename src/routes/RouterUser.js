import userController from '../controllers/userController.js';
import express from 'express';
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json();

var router = express.Router();

router.get('/list', jsonParser, userController.list);
router.delete('/delete/:id', jsonParser, userController.delete);

export default router;