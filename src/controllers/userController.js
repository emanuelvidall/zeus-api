import User from '../models/user.js';

const userController = {
    list:
    async (req, res) => {
        try {
            const users = await User.find();
            const listusers = users.map(expense => expense);
            res.json(listusers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
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

export default userController;