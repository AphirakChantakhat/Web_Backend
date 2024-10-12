import Device from "../models/DeviceModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getDevices = async(req, res) =>{
    try {
        let response;
        const user = await User.findOne({
            where:{
                id: req.params.userId
            }
        })
        if(!user)
            return res.status(404).json({msg: "Role not found."});

        if(user.role == 2){ //if user
            response = await Device.findAll({
                attributes: ['id', 'device_name', 'device_id','active_status', 'createdAt'],
                where:{
                    userId: user.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        }else{
            response = await Device.findAll({
                attributes: ['id', 'device_name', 'device_id', 'active_status', 'createdAt'],
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        }
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getDeviceById = async(req, res) =>{
    try {
        const device = await Device.findOne({
            where:{
                id: req.params.id
            }
        })
        if(!device)
            return res.status(404).json({msg: "No Data of Device."});
        let response;
        
            response = await Device.findOne({
                attributes: ['id', 'device_name', 'device_id', 'active_status', 'createdAt', 'userId'],
                where:{
                    id: device.id
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createDevice = async(req, res) =>{
    const { device_name, device_id, userId } = req.body;
    try {
        await Device.create({
            device_name: device_name,
            device_id: device_id,
            userId: userId
        });
        res.status(201).json({msg: "Device Created!!!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDevice = async(req, res) =>{
    try {
        const { device_name, device_id, userId } = req.body;
        await Device.update({
            device_name: device_name,
            device_id: device_id,
            userId: userId
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(201).json({msg: "Device Upadated!!!"});
       
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteDevice = async(req, res) =>{
    try {      
        await Device.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.status(200).json({msg: "Device Deleted."});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}