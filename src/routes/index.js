import express from 'express';
import RouterExpense from './RouterExpense.js';

var router = express.Router();

router.post('/abc', ()=>{console.log("aqui chegou")})

router.use('/expense', RouterExpense);

export default router;