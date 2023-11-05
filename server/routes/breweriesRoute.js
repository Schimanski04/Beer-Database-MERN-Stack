import express from "express"
import { Beer } from "../models/beerModel.js"
import { Brewery } from "../models/breweryModel.js"

const router = express.Router()

router.get("/", async (request, response) => {
    try {
        const breweries = await Brewery.find({})
        return response.status(200).json({
            count: breweries.length,
            data: breweries
        })
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const brewery = await Brewery.findById(id)
        return response.status(200).json(brewery)
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

router.post("/", async (request, response) => {
    try {
        if (!request.body.name || !request.body.address || !request.body.phoneNumber || !request.body.email) {
            return response.status(400).send({ message: "Send all required fields: name, address, phoneNumber, email" })
        } else {
            const newBrewery = {
                name: request.body.name,
                address: request.body.address,
                phoneNumber: request.body.phoneNumber,
                email: request.body.email 
            }

            const brewery = await Brewery.create(newBrewery)
            return response.status(201).send(brewery)
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

router.patch("/:id", async (request, response) => {
    try {
        if (!request.body.name || !request.body.address || !request.body.phoneNumber || !request.body.email) {
            return response.status(400).send({ message: "Send all required fields: name, address, phoneNumber, email" })
        } else {
            const { id } = request.params
            const result = await Brewery.findByIdAndUpdate(id, request.body)

            if (!result) {
                return response.status(404).json({ message: "Brewery not found" })
            } else {
                return response.status(200).json({ message: "Brewery updated successfully" })
            }
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const result = await Brewery.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: "Brewery not found" })
        } else {
            await Beer.deleteMany({ breweryId: id }) // this line will remove all the author"s books
            return response.status(200).json({ message: "Brewery and its beers deleted successfully" })
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

export default router
