import Expense from '../models/expense.js';

const expenseController = {
    create: 
        async (req, res) => {
            console.log('incoming request body: ', req.body);
            try {
                const createExpense = await Expense.create({
                    value: req.body.value,
                    type: req.body.type,
                    quantity: req.body.quantity,
                    desc: req.body.desc,
                    date: req.body.date,
                });
                return res.status(201).json(createExpense);
            } catch (err) {
                return res.status(400).json({ err: err.message });
            }       
    },
    list:
        async (req, res) => {
            try {
                const expenses = await Expense.find();
                const listexpenses = expenses.map(expense => expense);
                res.json(listexpenses);
            } catch (error) {
                console.error(error);
                res.status(500).json({error: 'Internal server error'});
            }
        },
    view:
        async (req, res) => {
            try {
                const id = req.params.id;
                const result = await Expense.findById(id);
                res.json(result);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).send('Server Error');
            }
        }
    }

export default expenseController;

// getExpensesByUser
// getAllExpenses



// app.get('/users', async (req1, res1) => {
//     try {
//       const users = await User.find();
//       const userNames = users.map(user => user);
//       res1.json(userNames);
//     } catch (error) {
//       console.error(error);
//       res1.status(500).json({error: 'Internal server error'});
//     }
//   });
  
//   app.get('/todoscustos', async (req2, res2) => {
//     try {
//       const custos = await Cost.find();
//       const todosCustos = custos.map(custo => custo);
//       res2.json(todosCustos);
//     } catch (error) {
//       console.error(error);
//       res2.status(500).json({error: 'Internal server error'});
//     }
//   });
  
//   app.get('/todoscustos/:id', async (req, res) => {
//     try {
//       const id = req.params.id;
//       const result = await Cost.findById(id);
//       res.json(result);
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).send('Server Error');
//     }
//   });
  
//   app.delete('/costs/:id', async (req, res) => {
//     const id = req.params.id;
  
//     try {
//       const cost = await Cost.findById(id);
  
//       if (!cost) {
//         return res.status(404).send({
//           message: 'Cost not found',
//         });
//       }
  
//       await Cost.deleteOne({_id: id});
  
//       return res.status(200).send({
//         message: 'Cost deleted successfully',
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({
//         message: 'Internal server error',
//       });
//     }
//   });
  
//   app.put('/todoscustos/editar/:id', async (req, res) => {
//     try {
//       const id = req.params.id;
//       const data = {
//         valor: req.body.valor,
//         ti: req.body.tipo,
//         quantidade: req.body.quantidade,
//         desc: req.body.desc,
//         data: req.body.data,
//       };
//       const result = await Cost.findByIdAndUpdate({_id: id}, data, { new: true });
//       res.json(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  