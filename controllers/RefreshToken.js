import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) 
            return res.sendStatus(401); // แก้การสะกด
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        if (!user[0]) 
            return res.sendStatus(403); // แก้การสะกด
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) 
                return res.sendStatus(403); // แก้การสะกด
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const role = user[0].role;
            const accessToken = jwt.sign(
                { userId, name, email, role }, 
                process.env.ACCESS_TOKEN_SECRET, // แก้การสะกด secret key
                { expiresIn: '15s' }
            );
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
};
