import axios from "axios"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useDocumentTitle from "../../../hooks/useDocumentTitle"

const schema = yup.object().shape({
    name: yup
        .string()
        .required("This field is required"),
    description: yup
        .string()
        .required("This field is required"),
    alcoholContent: yup
        .number()
        .required("This field is required"),
    typeOfBeer: yup
        .string()
        .required("This field is required"),
    breweryId: yup
        .string()
        .required("This field is required")
})

export const Edit = () => {
    useDocumentTitle("Edit beer | Prazdroj")
    const [beer, setBeer] = useState({})
    const [breweries, setBreweries] = useState([])
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        axios
            .get(`http://localhost:5000/beers/${id}`)
            .then((response) => {
                setBeer({
                    name: response.data.name,
                    description: response.data.description,
                    alcoholContent: response.data.alcoholContent,
                    typeOfBeer: response.data.typeOfBeer,
                    breweryId: response.data.breweryId
                })
            })
            .catch((error) => {
                alert("An error happened. Please check console")
                console.log(error)
            })

        axios
            .get("http://localhost:5000/breweries/")
            .then((response) => {
                setBreweries(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const onSubmit = (data) => {
        const beer = {
            name: data.name,
            description: data.description,
            alcoholContent: data.alcoholContent,
            typeOfBeer: data.typeOfBeer,
            breweryId: data.breweryId
        }

        axios
            .patch(`http://localhost:5000/beers/${id}`, beer)
            .then(() => {
                enqueueSnackbar("Beer edited successfully", { variant: "success" })
                navigate(`/beers/${id}`)
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Edit Beer</h1>

            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                value={beer.name}
                                placeholder="Enter beer name"
                            />
                        )}
                    />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                type="text"
                                value={beer.description}
                                placeholder="Enter beer description"
                                rows={4}
                                cols={50}
                            />
                        )}
                    />
                    {errors.description && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="alcoholContent"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                step={0.1}
                                value={beer.alcoholContent}
                                placeholder="Enter the alcohol content"
                            />
                        )}
                    />
                    {errors.alcoholContent && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="typeOfBeer"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                placeholder="Select the type of beer"
                                defaultValue={beer.typeOfBeer}
                            >   
                                {/* {
                                    beer.typeOfBeer == "světlé" ? <option value="světlé" selected>světlé</option> : <option value="světlé">světlé</option>
                                }
                                {
                                    beer.typeOfBeer == "polotmavé" ? <option value="polotmavé" selected>polotmavé</option> : <option value="polotmavé">polotmavé</option>
                                }
                                {
                                    beer.typeOfBeer == "tmavé" ? <option value="tmavé" selected>tmavé</option> : <option value="tmavé">tmavé</option>
                                }
                                {
                                    beer.typeOfBeer == "řezané" ? <option value="řezané" selected>řezané</option> : <option value="řezané">řezané</option>
                                }
                                {
                                    beer.typeOfBeer == "jiný" ? <option value="jiný" selected>jiný</option> : <option value="jiný">jiný</option>
                                } */}
                                <option value="světlé">světlé</option>
                                <option value="polotmavé">polotmavé</option>
                                <option value="tmavé">tmavé</option>
                                <option value="řezané">řezané</option>
                                <option value="jiný">jiný</option>
                            </select>
                        )}
                    />
                    {errors.typeOfBeer && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="breweryId"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                placeholder="Select a brewery"
                                defaultValue={beer.breweryId}
                            >
                                {
                                    breweries.map((brewery, index) => {
                                        return (
                                            <option key={index} value={brewery._id}>{brewery.name}</option>
                                        )
                                    })
                                }
                            </select>
                        )}
                    />
                    {errors.breweryId && <span>This field is required</span>}
                </div>

                <button type="submit">Save</button>
            </form>
        </main>
    )
}

export default Edit
