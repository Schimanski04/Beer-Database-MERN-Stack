import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import { Link } from "react-router-dom"
import "./brewery.scss"

export const Brewery = ({ brewery, index, deleteBrewery }) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleDelete = () => {
        setOpen(false)
        deleteBrewery(brewery._id)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={`brewery ${index % 2 == 0 ? "" : "reverse"}`}>
            <img src="https://www.prazdroj.cz/cospospohzeg/uploads/2021/08/Logo-Assets_4.png" alt="" />
            <div className="brewery-info">
                <h2>{brewery.name}</h2>
                <p>{brewery.phoneNumber}</p>
                <Link to={`/breweries/edit/${brewery._id}`}>
                    <button type="button"><FontAwesomeIcon icon={faPenToSquare} /></button>
                </Link>
                <button type="button" onClick={handleClickOpen}><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Delete the brewery from the database?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the brewery from the database? This action cannot be undone.
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
    )
}

export default Brewery
