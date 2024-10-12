import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";
import User from "./UserModel.js"; // โมเดล Users ที่อ้างอิง
import Devices from "./DeviceModel.js"; // โมเดล Devices ที่อ้างอิง

const { DataTypes } = Sequelize;

const Historys = db.define('history', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    fk_device_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    longtitude: {  // Note: Correct spelling from 'longtitude'
        type: DataTypes.STRING,
        allowNull: true,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
}, {
    freezeTableName: true,  // ห้ามเปลี่ยนชื่อ table เป็นพหูพจน์
});

// สร้างความสัมพันธ์กับ Users และ Devices
User.hasMany(Historys, { foreignKey: 'userId' });
Historys.belongsTo(User, { foreignKey: 'userId' });

Devices.hasMany(Historys, { foreignKey: 'fk_device_id' });
Historys.belongsTo(Devices, { foreignKey: 'fk_device_id' });

export default Historys;
