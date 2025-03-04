import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();
// Importerer databaseforbindelse og controllers
import { sequelize } from './homelands-api/config/sequelizeConfig.js';
import { dbController } from './homelands-api/controller/dbController.js';
import { cityController } from './homelands-api/controller/cityController.js';
import { staffController } from './homelands-api/controller/staffController.js';

// Bruger port fra miljøvariabler eller standard 4000
const port = process.env.PORT || 4000;

// Opsætter ruter til controllers
app.use('/', dbController);
app.use('/city', cityController);
app.use('/staff', staffController);

// En simpel route for at teste om serveren kører
app.get('/', (req, res) => {
    res.json({ message: "Server is running!" });
});

// Forbinder til databasen og starter serveren
sequelize.authenticate()
    .then(() => {
        console.log("✅ Databaseforbindelse OK");
        sequelize.sync()// Synkroniserer databasen (opretter tabeller hvis de ikke findes)
            .then(() => {
                console.log("✅ Database synkroniseret");
                app.listen(port, () => {
                    console.log(`✅ Server kører på port ${port}`);
                });
            })
            .catch(err => {
                console.error("❌ Database sync fejl:", err);
            });
    })
    .catch(err => {
        console.error("❌ Databaseforbindelse fejlede:", err);
    });
