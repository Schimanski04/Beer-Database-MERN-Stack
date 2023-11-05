import { Link } from "react-router-dom"
import "./beer.scss"

const Beer = ({ beer }) => {
    return (
        <div className="beer">
            <p>{beer.name}</p>
            <p>{beer.alcoholContent}</p>

            <Link to={`/beers/details/${beer._id}`}>Details</Link>
            <Link to={`/beers/edit/${beer._id}`}>Edit</Link>
            <Link to={`/beers/delete/${beer._id}`}>Delete</Link>
        </div>
    )
}

export default Beer
