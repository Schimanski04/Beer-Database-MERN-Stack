import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useDocumentTitle from "../../../hooks/useDocumentTitle"

const Details = () => {
    useDocumentTitle("Bookstoria. – Details page")
    const [brewery, setBrewery] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/breweries/${id}`)
            .then((response) => {
                setBrewery(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main>
            <div>
                <div>
                    <span>Id: {brewery._id}</span>
                </div>
                <div>
                    <span>Name: {brewery.name}</span>
                </div>
                <div>
                    <span>Address: {brewery.address}</span>
                </div>
                <div>
                    <span>Phone number: {brewery.phoneNumber}</span>
                </div>
                <div>
                    <span>Email: {brewery.email}</span>
                </div>
            </div>
        </main>
    )
}

export default Details
