import Historys from "../models/HistoryModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getHistorys = async(req, res) =>{
    try {
        let response;
            response = await Historys.findAll({
                attributes: ['userId', 'createdAt', 'fk_device_id', 'latitude', 'longtitude', 'level'],
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

export const getHistorysById = async(req, res) =>{
    try {
        console.log("If get history by id.")
        const history = await Historys.findOne({
            where:{
                userId: req.params.id
            }
        })
        /* if(!history)
            return res.status(404).json({msg: "No Data in List."}) */
        let response;
        
            response = await Historys.findAll({
                attributes: ['userId', 'createdAt', 'fk_device_id', 'latitude', 'longtitude', 'level'],
                where: {
                    userId: req.params.id
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