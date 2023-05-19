import expenseController from '../controllers/expenseController.js';
import express from 'express';
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var router = express.Router();

router.post('/create', jsonParser, expenseController.create);
router.get('/list', jsonParser, expenseController.list);
router.get('/view/:id', jsonParser, expenseController.view);
router.delete('/delete/:id', jsonParser, expenseController.delete);
router.put('/update/:id', jsonParser, expenseController.update);

export default router;