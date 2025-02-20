import { Sequelize } from "sequelize";

const db = new Sequelize('tilawah_app', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;