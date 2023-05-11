import userController from '../controllers/userController.js';
import express from 'express';
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

router.post('/create', jsonParser, userController.create);

export default router;