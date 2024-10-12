import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async(req, res) => {
    const { name, email, password, confPassword, group_id } = req.body;
    if(password !== confPassword)
        return res.status(400).json({msg: "Password not match Confirm password"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            group_id: group_id
        });
        res.json({msg: " Register success."});
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match)
            return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;
        const accessToken = jwt.sign({userId, name, email, role}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, name, email, role}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken}, {
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({msg:"Email not list."})
    }
}

export const Logout = async(req, res) =>{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) 
        return res.sendStatus(204); // แก้การสะกด
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) 
        return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const deleteUser = async(req, res) =>{
    const user = await Users.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "Can't delete user!"});
    try{
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    }catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) =>{
    const user = await Users.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User not List."});
    const {name, email, password, confPassword, group_id} = req.body;

    let hashPassword;
    if(password === "" || password === null){
        hashPassword = user.password
    }else{
        const salt = await bcrypt.genSalt();
        hashPassword = await bcrypt.hash(password, salt);
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password don't Confirm Password!"});
    try{
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            group_id: group_id
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    }catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const getUsersById = async(req, res) =>{
    try{
        const response = await Users.findOne({
            attributes: ['id', 'name', 'email', 'group_id'],
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({msg: error.message});
    }
}