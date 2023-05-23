import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const auth = {
    create: 
        async (req, res) => {
            try {
                const createUser = await User.create({
                    name: req.body.name,
                    dog: req.body.dog,
                    email: req.body.email,
                    password: req.body.password,
                });
                return res.status(201).json(createUser);
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
        },
        validate:
            async (req, res, next) => {
                try {        
                const authHeader = req.headers.authorization;
            
                if (!authHeader) {
                    res.status(401).json({ err: "No token provided" });
                    return; // Return early to prevent further execution
                }
            
                const token = authHeader;
            
                jwt.verify(token, process.env.SECRET, (err, decoded) => {
                    if (err) {
                    res.status(401).json({ err: "Token inválido" });
                    return; // Return early to prevent further execution
                    }
            
                    req.userId = decoded.id;
                    next();
                });
                } catch (err) {
                res.status(400).json({ err: err.message });
                }
            }
    }

export default auth;