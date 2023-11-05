import Brewery from "../../../components/Brewery"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./index.scss"

const Index = () => {
    const [breweries, setBreweries] = useState([])

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

    return (
        <main>
            <h1>List of all breweries</h1>
            <Link to="/breweries/create" className="link">Create</Link>

            <div className="breweries">
                {
                    breweries.map((brewery, index) => {
                        return (
                            <Brewery key={index} brewery={brewery} />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Index
