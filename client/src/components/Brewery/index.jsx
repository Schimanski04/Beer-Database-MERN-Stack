import { Link } from "react-router-dom"
import "./brewery.scss"

const Brewery = ({ brewery }) => {
    return (
        <div className="brewery">
            <p>{brewery.name}</p>
            <p>{brewery.address}</p>

            <Link to={`/breweries/details/${brewery._id}`}>Details</Link>
            <Link to={`/breweries/edit/${brewery._id}`}>Edit</Link>
            <Link to={`/breweries/delete/${brewery._id}`}>Delete</Link>
        </div>
    )
}

export default Brewery
