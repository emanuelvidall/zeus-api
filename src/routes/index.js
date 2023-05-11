import express from 'express';
import RouterExpense from './RouterExpense.js';
import RouterUser from './RouterUser.js';

var router = express.Router();

router.post('/abc', ()=>{console.log("aqui chegou")})

router.use('/expenses', RouterExpense);
router.use('/users', RouterUser)

export default router;