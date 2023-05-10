import expenseController from '../controllers/expenseController.js';
import express from 'express';
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var router = express.Router();

router.post('/create', jsonParser, expenseController.create);

export default router;