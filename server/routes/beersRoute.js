import express from "express"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import { Beer } from "../models/beerModel.js"

const router = express.Router()

// #region file upload settings
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./images")
//     },
//     filename: function(req, file, cb) {   
//         cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"]
//     if (allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }

// let upload = multer({ storage, fileFilter })
// #endregion

// #region HTTP requests
router.get("/", async (request, response) => {
    try {
        const beers = await Beer.find({})
        return response.status(200).json({
            count: beers.length,
            data: beers
        })
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params
        const beer = await Beer.findById(id)
        return response.status(200).json(beer)
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

router.post("/", async (request, response) => {
    try {
        if (!request.body.name || !request.body.description || !request.body.alcoholContent || !request.body.typeOfBeer || !request.body.breweryId) {
            return response.status(400).send({ message: "Send all required fields: name, description, alcoholContent, typeOfBeer, breweryId" })
        } else {
            const newBeer = {
                name: request.body.name,
                description: request.body.description,
                alcoholContent: request.body.alcoholContent,
                typeOfBeer: request.body.typeOfBeer,
                breweryId: request.body.breweryId
            }

            const beer = await Beer.create(newBeer)
            return response.status(201).send(beer)
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})

router.patch("/:id", async (request, response) => {
    try {
        if (!request.body.name || !request.body.description || !request.body.alcoholContent || !request.body.typeOfBeer || !request.body.breweryId) {
            return response.status(400).send({ message: "Send all required fields: name, description, alcoholContent, typeOfBeer, breweryId" })
        } else {
            const { id } = request.params
            const result = await Beer.findByIdAndUpdate(id, request.body)

            if (!result) {
                return response.status(404).json({ message: "Beer not found" })
            } else {
                return response.status(200).json({ message: "Beer updated successfully" })
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
        const result = await Beer.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({ message: "Beer not found" })
        } else {
            return response.status(200).json({ message: "Beer deleted successfully" })
        }
    } catch (error) {
        console.log(error.message)
        return response.status(500).send({ message: error.message })
    }
})
// #endregion

export default router
