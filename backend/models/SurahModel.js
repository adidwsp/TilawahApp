import {Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Users from './UserModel.js';

const { DataTypes } = Sequelize;

const Surah = db.define('surah', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    ayat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Users.hasMany(Surah);
Surah.belongsTo(Users, {foreignKey: 'userId'});

export default Surah;