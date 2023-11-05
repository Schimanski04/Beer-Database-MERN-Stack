import express from "express"
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose"
import beersRoute from "./routes/beersRoute.js"
import breweriesRoute from "./routes/breweriesRoute.js"
import cors from "cors"

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS POLICY
app.use(cors())

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome To MERN Stack Tutorial!!!")
})

app.use("/beers", beersRoute)
app.use("/breweries", breweriesRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database")
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
