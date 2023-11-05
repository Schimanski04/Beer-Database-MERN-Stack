import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDocumentTitle from "../../../hooks/useDocumentTitle"

const Details = () => {
    useDocumentTitle("Bookstoria. – Details page")
    const [beer, setBeer] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/beers/${id}`)
            .then((response) => {
                setBeer(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main>
            <div>
                <div>
                    <span>Id: {beer._id}</span>
                </div>
                <div>
                    <span>Name: {beer.name}</span>
                </div>
                <div>
                    <span>Description: {beer.description}</span>
                </div>
                <div>
                    <span>Alcohol content: {beer.alcoholContent}</span>
                </div>
                <div>
                    <span>Type Of Beer: {beer.typeOfBeer}</span>
                </div>
                <div>
                    <span>Brewery: {beer.breweryId}</span>
                </div>
            </div>
        </main>
    )
}

export default Details
