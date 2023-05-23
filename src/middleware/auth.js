import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ err: "No token provided" });

    const token = authHeader;

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ err: "Token inválido" });

        req.userId = decoded.id;

        return next();
    });
}

export default authMiddleware;