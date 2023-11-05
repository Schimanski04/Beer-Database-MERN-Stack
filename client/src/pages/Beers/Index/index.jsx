import Beer from "../../../components/Beer"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./index.scss"

const Index = () => {
    const [beers, setBeers] = useState([])

    useEffect(() =>{
        axios
            .get("http://localhost:5000/beers/")
            .then((response) => {
                setBeers(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main>
            <h1>List of all beers</h1>
            <Link to="/beers/create" className="link">Create</Link>

            <div className="beers">
                {
                    beers.map((beer, index) => {
                        return (
                            <Beer key={index} beer={beer} />
                        )
                    })
                }
            </div>
        </main>
    )
}

export default Index
