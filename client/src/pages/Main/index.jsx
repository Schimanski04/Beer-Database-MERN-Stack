import { Link } from "react-router-dom"
import useDocumentTitle from "../../hooks/useDocumentTitle"

export const Main = () => {
    useDocumentTitle("Home | Prazdroj")

    return (
        <main>
            <h1>Beer Database</h1>
            <Link to="/beers/create">Create</Link>
        </main>
    )
}

export default Main
