import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelizeConfig.js';

export class Staff extends Model {}

Staff.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     isNumeric: true
        // }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //     isEmail: true
        // }
    }
}, {
    sequelize,
    modelName: 'staff',
    freezeTableName: true,
    timestamps: true
});

