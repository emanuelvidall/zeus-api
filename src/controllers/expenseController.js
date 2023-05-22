import Expense from '../models/expense.js';

const expenseController = {
    create:
        async (req, res) => {
            try {
                const createExpense = await Expense.create({
                    value: req.body.value,
                    type: req.body.type,
                    quantity: req.body.quantity,
                    desc: req.body.desc,
                    date: req.body.date,
                    month: req.body.month,
                    userId: req.body.userId,
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
    month:
        async (req, res) => {
            try {
                const userId = req.params.id
                const month = req.params.month
                const expensesPerMonth = await Expense.find({userId: userId, month: month})
                console.log("despesas do usuario no mes: ",expensesPerMonth)
                const monthTotal = expensesPerMonth.reduce((total, expense) => total + expense.value, 0);
                res.json(monthTotal);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: error.message });
            }
        },
}

export default expenseController;