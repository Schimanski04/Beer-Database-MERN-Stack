import Brewery from "../../../components/Brewery"
import axios from "axios"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useDocumentTitle from "../../../hooks/useDocumentTitle"
import "./index.scss"

export const Index = () => {
    useDocumentTitle("Breweries | Prazdroj")
    const [breweries, setBreweries] = useState([])
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() =>{
        axios
            .get("http://localhost:5000/breweries/")
            .then((response) => {
                setBreweries(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const deleteBrewery = (id) => {
        axios
            .delete(`http://localhost:5000/breweries/${id}`)
            .then(() => {
                enqueueSnackbar("Brewery and all its beers deleted successfully", { variant: "success" })
                navigate("/")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main className="breweries">
            <h1>Our brands</h1>
            <p>The brands of Plzeňský Prazdroj are an integral part of the national heritage and Czech beer culture. Our beers and other beverages are brewed according to original recipes and, like our ancestors, we care for their highest quality. Our goal is to bring joy and pleasure to beer lovers in the Czech Republic and around the world through our beverages.</p>
            <Link to="/breweries/create" className="link-btn">Create</Link>

            {
                breweries.map((brewery, index) => {
                    return (
                        <Brewery key={index} brewery={brewery} index={index} deleteBrewery={deleteBrewery} />
                    )
                })
            }
        </main>
    )
}

export default Index
