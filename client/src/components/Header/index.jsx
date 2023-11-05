import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { Link, useLocation } from "react-router-dom"
import "./header.scss"

const Header = () => {
    const location = useLocation()

    return (
        <header className="header">
            <Link to="/" className="logo">Beer Database</Link>

            <nav className="navbar">
                {
                    location.pathname == "/" ? <Link to="/" className="active">Home</Link> : <Link to="/">Home</Link>
                }
                {
                    location.pathname == "/beers" ? <Link to="/beers" className="active">Beers</Link> : <Link to="/beers">Beers</Link>
                }
                {
                    location.pathname == "/breweries" ? <Link to="/breweries" className="active">Breweries</Link> : <Link to="/breweries">Breweries</Link>
                }
            </nav>

            <div className="social-media">
                <a href="https://www.facebook.com/PilsnerUrquellCzech" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
                <a href="https://www.instagram.com/pilsner.urquell/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
        </header>
    )
}

export default Header
