import express from 'express'
import { Vehicle } from '../models/vehicleModel.js'; 
const router = express.Router();

// Route to save a new vehicle
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.vehicleType ||
            !request.body.manufacturer ||
            !request.body.model ||
            !request.body.releaseYear ||
            !request.body.price ||
            !request.body.milleage
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Vehicle Type, Manufacturer, Model, Release Year, Price, Mileage'
            })
        } 

        const newVehicle = {
            vehicleType: request.body.vehicleType,
            manufacturer: request.body.manufacturer,
            model: request.body.model,
            releaseYear: request.body.releaseYear,
            price: request.body.price,
            milleage: request.body.milleage
        }

        const vehicle = await Vehicle.create(newVehicle);
        return response.status(201).send(vehicle)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

// Route to get all vehicles
router.get('/', async (request, response) => {
    try {
        const vehicles = await Vehicle.find({});
        return response.status(200).json({
            count: vehicles.length,
            data: vehicles
    })
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message})
    }
})

// Route to get one vehicle by ID
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const vehicle = await Vehicle.findById(id);
        return response.status(200).json(vehicle)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message})
    }
})

// Route to update one vehicle by ID
router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.vehicleType ||
            !request.body.manufacturer ||
            !request.body.model ||
            !request.body.releaseYear ||
            !request.body.price ||
            !request.body.milleage
        ) {
            return response.status(400).send({
                message: 'Send all required fields: Vehicle Type, Manufacturer, Model, Release Year, Price, Mileage'
            })
        }

        const  { id } =  request.params;
        const result = await Vehicle.findByIdAndUpdate(id, request.body)

        if(!result) {
            return response.status(404).json({ message: 'Vehicle not found'})
        }

        return response.status(200).send({ message: 'Vehicle updated successfully!'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ error: error.message})
    }
})

// Route to delete one vehicle by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Vehicle.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Vehicle not found' })
        }

        return response.status(200).send({ message: 'Vehicle deleted successfully'})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})

export default router
