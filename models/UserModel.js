import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Group from "./GroupModel.js";

const { DataTypes } = Sequelize;

const Users = db.define('user', {
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Group, // อ้างอิงไปที่โมเดล User
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    
},{
    freezeTableName: true
});
Users.hasMany(Group);
Users.belongsTo(Group, { foreignKey: 'group_id' });

export default Users;