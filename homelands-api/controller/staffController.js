import express from 'express';
import { Staff } from '../models/staff.js';

export const staffController = express.Router();

// Middleware til at parse JSON og form-data
staffController.use(express.json());
staffController.use(express.urlencoded({ extended: true }));

// 🔹 Hent alle ansatte (GET /staff)
staffController.get('/staff', async (req, res) => {
    try {
        const employees = await Staff.findAll();
        console.log("📋 Medarbejdere hentet fra databasen:", employees);

        if (!employees || employees.length === 0) {
            return res.status(200).json({ message: "Ingen medarbejdere fundet", employees: [] });
        }

        res.json(employees);
    } catch (error) {
        console.error("❌ Fejl ved hentning af ansatte:", error);
        res.status(500).json({ error: "Kunne ikke hente medarbejdere" });
    }
});

// 🔹 Hent en specifik ansat (GET /staff/:id)
staffController.get('/staff/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Ugyldigt ID. ID skal være et tal." });
        }

        const employee = await Staff.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: "Medarbejder ikke fundet" });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Opret en ny ansat (POST /staff)
staffController.post('/staff', async (req, res) => {
    try {

          // Udpakker nødvendige data fra request body
        let { firstname, lastname, position, image, phone, email } = req.body;

        // if (phone) {
        //     phone = phone.replace(/\D/g, "");
        // }

        // if (!firstname || !image || !lastname || !position || !phone || !email) {
        //     return res.status(400).json({ error: "Alle felter er påkrævede" });
        // }
        // Fjel finde hver datatype
        // Validering: Tjekker om alle felter er udfyldt

        if (!firstname) {
            return res.status(400).json({ error: "Fornavn er påkrævede" });
        }
        if (!image ) {
            return res.status(400).json({ error: "Img er påkrævede" });
        }
        if (!lastname) {
            return res.status(400).json({ error: "Efternavn er påkrævede" });
        }
        if (!position) {
            return res.status(400).json({ error: "Job er påkrævede" });
        }
        if ( !phone) {
            return res.status(400).json({ error: "Tlf er påkrævede" });
        }
        if (!email) {
            return res.status(400).json({ error: "Email er påkrævede" });
        }

        console.log('Opretter ny medarbejder...');

        const employee = await Staff.create({ firstname, lastname, position, image, phone, email });
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Opdater en ansat (PUT /staff/:id)
staffController.put('/staff/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        // Tjekker om ID'et er gyldigt
        if (isNaN(id)) {
            return res.status(400).json({ error: "Ugyldigt ID. ID skal være et tal." });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Ingen data sendt til opdatering" });
        }

        let { firstname, lastname, position, image, phone, email } = req.body;
        if (phone) {
            phone = phone.replace(/\D/g, "");
        }

         // Finder medarbejderen i databasen
        const employee = await Staff.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: "Medarbejder ikke fundet" });
        }

        // Opdaterer medarbejderens oplysninger
        await employee.update({ firstname, lastname, position, image, phone, email });
        // Returnerer bekræftelse og de opdaterede oplysninger
        res.json({ message: '✅ Medarbejder opdateret', employee });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Slet en ansat (DELETE /staff/:id)
staffController.delete('/staff/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Ugyldigt ID. ID skal være et tal." });
        }

        const employee = await Staff.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: "Medarbejder ikke fundet" });
        }

        await employee.destroy();
        // Sletter medarbejderen
        res.json({ message: '🗑️ Medarbejder slettet' });
    } catch (error) {
        res.status(500).json({ error: "Kunne ikke slette medarbejderen" });
    }
});
