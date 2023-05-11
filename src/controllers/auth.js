import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const auth = {
    create: 
        async (req, res) => {
            console.log('incoming request body: ', req.body);
            try {
                const createUser = await User.create({
                    email: req.body.email,
                    password: req.body.password,
                });
                return res.status(201).json(createUser);
                console.log('usuario criado!')
            } catch (err) {
                return res.status(400).json({ err: err.message });
            }       
    },
    login:
        async(req, res) => {
            const { email , password } = req.body;
            try{
                
                if (!email) {
                    return res.status(422).json({ err: "Email is required!"});
                }
                
                if (!password) {
                    return res.status(422).json({ err: "Password is required!"});
                }

                const user = await User.findOne({ email }).select("+password");

                if (!user) {
                    return res.status(400).json({ err: "Incorrect email and/or password!"});
                }
                
                if (!(await bcrypt.compare(password, user.password))) {
                    return res.status(400).json({ err: "Incorrect email and/or password!"})
                }
                user.password = undefined;

                res.status(200).json({
                    user,
                    token: jwt.sign({id: user.id }, process.env.SECRET, {
                        expiresIn: '24h',
                    })
                });
            } catch (err) {
                res.status(400).json({ err: err.message });
            }
        }   
}

export default auth;