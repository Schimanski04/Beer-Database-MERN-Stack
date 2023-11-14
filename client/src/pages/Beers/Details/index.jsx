import axios from "axios"
import { useState, useEffect } from "react"
import { useSnackbar } from "notistack"
import { Link, useParams, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import useDocumentTitle from "../../../hooks/useDocumentTitle"
import "./details.scss"

export const Details = () => {
    useDocumentTitle("Beer details | Prazdroj")
    const [beer, setBeer] = useState({})
    // const [brewery, setBrewery] = useState({})
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/beers/${id}`)
            .then((response) => {
                setBeer(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        // axios
        //     .get(`http://localhost:5000/breweries/${beer.breweryId}`)
        //     .then((response) => {
        //         setBrewery(response.data)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }, [])

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleDelete = () => {
        setOpen(false)
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

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <main>
            <div className="beer">
                <img src="/pilsner-urquell-logo.png" alt="" />
                <div className="beer-info">
                    <h2>{beer.name}</h2>
                    {/* <p>{brewery.name}</p> */}
                    <p>{beer.description}</p>
                    <p>Alkohol: {beer.alcoholContent}%</p>
                    <Link to={`/beers/edit/${beer._id}`}>
                        <button type="button"><FontAwesomeIcon icon={faPenToSquare} /></button>
                    </Link>
                    <button type="button" onClick={handleClickOpen}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Delete the beer from the database?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you really want to delete the beer from the database? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </main>
    )
}

export default Details
