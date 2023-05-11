import User from '../models/user.js';

const userController = {
    create: 
        async (req, res) => {
            console.log('incoming request body: ', req.body);
            try {
                const createUser = await User.create({
                    name: req.body.name,
                    password: req.body.password,
                });
                return res.status(201).json(createUser);
            } catch (err) {
                return res.status(400).json({ err: err.message });
            }       
    }   
}

export default userController;