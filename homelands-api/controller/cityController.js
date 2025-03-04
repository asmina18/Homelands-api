import express from 'express'
import {City} from '../models/City.js'


export const cityController = express.Router();

// 🔹 Hent alle byer
cityController.get('/cities', async (req, res) => {
    try {
        const cities = await City.findAll();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Opret en ny by
cityController.post('/cities', async (req, res) => {
    try {
        console.log("🔥 DEBUGGING - Request body modtaget:", req.body);

        let { name, zipcode,city_id } = req.body;

        if (!name || !zipcode) {
            console.log("❌ Fejl: name eller zipcode mangler!");
            return res.status(400).json({ error: "Name and zipcode are required" });
        }

        const city = await City.create({ name, zipcode,city_id });
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

        //0pdate
cityController.put('/cities/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, zipcode, city_id } = req.body;

        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }

        //  Tjek om city_id er et tal (hvis det skal være det)
        if (!city_id ) {
            return res.status(400).json({ error: "city_id must be a number" });
        }

        //  Opdater felterne
        await city.update({ name, zipcode, city_id });

        res.json({ message: "City updated", city });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


cityController.delete('/cities/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const city = await City.findByPk(id);
        if (!city) {
            return res.status(404).json({ error: "City not found" });
        }
        await city.destroy({ where: { id } });
        res.json({ message: 'City deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

