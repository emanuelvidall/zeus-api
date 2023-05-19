import User from '../models/user.js';

const userController = {
    list:
        async (req, res) => {
            try {
                const users = await User.find();
                const listusers = users.map(user => user);
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
    delete:
        async (req, res) => {
            try {
                const id = req.params.id;
                const user = await User.findById(id);

                if (!user) {
                    return res.status(404).send({
                        message: 'User not found',
                    });
                }

                await User.deleteOne({ _id: id });

                return res.status(200).send({
                    message: 'User ' + id + ' deleted successfully'
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send({
                    message: 'Internal server error',
                });
            }
        },
}

export default userController;