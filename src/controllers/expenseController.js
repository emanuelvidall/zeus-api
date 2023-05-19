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
                res.status(500).json({ error: 'Internal server error' });
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
        },
    delete:
        async (req, res) => {
            try {
                const id = req.params.id;
                const expense = await Expense.findById(id);

                if (!expense) {
                    return res.status(404).send({
                        message: 'Expense not found',
                    });
                }

                await Expense.deleteOne({ _id: id });

                return res.status(200).send({
                    message: 'expense ' + id + 'deleted successfully'
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send({
                    message: 'Internal server error',
                });
            }
        },
    update:
        async (req, res) => {
            console.log('incoming request body: ', req.body);
            try {
                const id = req.params.id;
                const data = {
                    value: req.body.value,
                    type: req.body.type,
                    quantity: req.body.quantity,
                    desc: req.body.desc,
                    date: req.body.date,
                };
                const result = await Expense.findByIdAndUpdate({ _id: id }, data, { new: true });
                res.json(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        },
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