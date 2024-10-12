import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js"; // โมเดล Users ที่อ้างอิง

const { DataTypes } = Sequelize;

const Devices = db.define('devices', {

    device_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    device_id:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    active_status:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate:{
            notEmpty: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true  // ห้ามเปลี่ยนชื่อ table เป็นพหูพจน์
});

// สร้างความสัมพันธ์กับ Users
Users.hasMany(Devices);
Devices.belongsTo(Users, { foreignKey: 'userId' });



export default Devices;
