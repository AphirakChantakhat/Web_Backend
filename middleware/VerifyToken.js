import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // แก้การสะกด
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) // แก้การตรวจสอบ token
        return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) 
            return res.sendStatus(403); // Forbidden
        req.email = decoded.email;
        next(); // ไปยัง middleware หรือ route handler ถัดไป
    });
};
