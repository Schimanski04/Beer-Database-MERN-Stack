import axios from "axios"
import { useSnackbar } from "notistack"
import { useNavigate, useParams } from "react-router-dom"
import useDocumentTitle from "../../../hooks/useDocumentTitle"

export const Delete = () => {
    useDocumentTitle("Delete beer | Prazdroj")
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    const handleDeleteBeer = () => {
        axios
            .delete(`http://localhost:5000/beers/${id}`)
            .then(() => {
                enqueueSnackbar("Beer deleted successfully", { variant: "success" })
                navigate("/beers")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Delete Beer</h1>
            <div>
                <h3>Are You Sure You want to delete this beer?</h3>
                <button onClick={handleDeleteBeer}>
                    Yes, Delete it
                </button>
            </div>
        </main>
    )
}

export default Delete
