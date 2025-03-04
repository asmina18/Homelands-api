import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Opretter en ny databaseforbindelse med Sequelize
export const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASSWD,
    {
        host: process.env.DBHOST,
        port: process.env.DBPORT || 3306,
        dialect: 'mysql',
        logging: console.log
    }
);

// Tester forbindelsen til databasen
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Database connection error:', err));
