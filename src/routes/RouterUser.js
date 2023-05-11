import userController from '../controllers/userController.js';
import express from 'express';
import bodyParser from 'body-parser';
import auth from '../controllers/auth.js';

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

export default router;