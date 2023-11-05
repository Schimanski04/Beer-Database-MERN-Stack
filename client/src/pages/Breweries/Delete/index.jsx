import axios from "axios"
import { useSnackbar } from "notistack"
import { useNavigate, useParams } from "react-router-dom"

const Delete = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    const handleDeleteBrewery = () => {
        axios
            .delete(`http://localhost:5000/breweries/${id}`)
            .then(() => {
                enqueueSnackbar("Brewery deleted successfully", { variant: "success" })
                navigate("/breweries")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Delete Brewery</h1>
            <div>
                <h3>Are You Sure You want to delete this brewery?</h3>
                <button onClick={handleDeleteBrewery}>
                    Yes, Delete it
                </button>
            </div>
        </main>
    )
}

export default Delete
