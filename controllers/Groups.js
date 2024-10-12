import Group from "../models/GroupModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getGroups = async(req, res) =>{
    try {
        let response;

        response = await Group.findAll({
            attributes: ['id', 'createdAt', 'updatedAt', 'group_line', 'line_token', 'active_status', 'group_lineId']
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getGroupById = async(req, res) =>{
    try {
        const groups = await Group.findOne({
            where:{
                id: req.params.id
            }
        })
        let response;
        response = await Group.findOne({
            attributes: ['id', 'createdAt', 'updatedAt', 'group_line', 'line_token', 'active_status', 'group_lineId'],
            where:{
                id: groups.id
            }
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createGroup = async(req, res) =>{
    const { group_line, line_token, group_lineId } = req.body;
    try {
        await Group.create({
            group_line: group_line,
            line_token: line_token,
            group_lineId: group_lineId,
            id: req.id
        });
        res.status(201).json({msg: "Group Created!!!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateGroup = async(req, res) =>{
    try {
        const groups = await Group.findOne({
            where:{
                id: req.params.id
            }
        })
        let { group_line, line_token, group_lineId } = req.body;
        await Group.update({group_line, line_token, group_lineId}, {
            where: {
                id: req.params.id
            }
        });
        
        res.status(200).json({msg: "Group Updated."});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteGroup = async(req, res) =>{
    try {
        await Group.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.status(200).json({msg: "Group Deleted."});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}