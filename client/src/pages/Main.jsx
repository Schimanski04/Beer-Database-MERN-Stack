import { Link } from "react-router-dom"

const Main = () => {
    return (
        <main>
            <h1>Beer Database</h1>
            <Link to="/beers/create">Create</Link>
        </main>
    )
}

export default Main
