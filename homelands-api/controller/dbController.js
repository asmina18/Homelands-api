import express from 'express';
import { sequelize } from '../config/sequelizeConfig.js';

export const dbController = express.Router();

// 🔹 Route til at synkronisere databasen manuelt
dbController.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        res.json({ message: "Database successfully synchronized" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
