import expenseController from '../controllers/expenseController.js';
import express from 'express';
import bodyParser from 'body-parser';

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var router = express.Router();

router.get('/list', jsonParser, expenseController.list);
router.get('/view/:id', jsonParser, expenseController.view);
router.get('/month/:id/:month', jsonParser, expenseController.month);
router.get('/month/:id/:month/:type', jsonParser, expenseController.type)
router.get('/:id/:month/list', jsonParser, expenseController.monthlist)
router.post('/create', jsonParser, expenseController.create);
router.put('/update/:id', jsonParser, expenseController.update);
router.delete('/delete/:id', jsonParser, expenseController.delete);


export default router;