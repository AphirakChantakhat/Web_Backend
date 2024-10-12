import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import Users from "./UserModel.js"; // โมเดล Users ที่อ้างอิง

const { DataTypes } = Sequelize;

const Group = db.define('tbl_group', {
    /* userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        /* references: {
            model: User, // อ้างอิงไปที่โมเดล User
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE' 
    }, */
    createdAt: {
        type: DataTypes.DATE,  // ใช้ DataTypes.DATE แทน TIMESTAMP
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,  // ใช้ DataTypes.DATE แทน TIMESTAMP
        defaultValue: Sequelize.NOW
    },
    group_line: {
        type: DataTypes.STRING,
        allowNull: true
    },
    group_lineId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    line_token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    active_status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true  // ห้ามเปลี่ยนชื่อ table เป็นพหูพจน์
});

// สร้างความสัมพันธ์กับ Users
/* Users.hasMany(Group); */
/* Group.belongsTo(Users, { foreignKey: 'group_id' }); */

export default Group;
