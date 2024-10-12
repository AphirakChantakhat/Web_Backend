import { Sequelize } from "sequelize";
const db = new Sequelize('accident_bot', 'root', '1234',{
    host: "localhost",
    dialect: "mysql"
});

export default db;