import express from 'express';
import bodyParser from 'body-parser';
import auth from '../controllers/auth.js';

var jsonParser = bodyParser.json()

var router = express.Router();

router.post('/create', jsonParser, auth.create);
router.post('/login', jsonParser, auth.login);


export default router;