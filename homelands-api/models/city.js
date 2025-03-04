import { sequelize } from '../config/sequelizeConfig.js';
import { DataTypes, Model } from 'sequelize';

export class City extends Model {}

City.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zipcode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    city_id:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
}, {
    sequelize,
    modelName: "city",
    timestamps: false
});