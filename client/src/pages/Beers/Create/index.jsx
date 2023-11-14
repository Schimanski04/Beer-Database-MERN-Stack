import axios from "axios"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
        .required("This field is required"),
    // photo: yup
    //     .mixed()
    //     .required("You need to provide a file")
    //     .test("fileSize", "The file is too large", (file) => {
    //         return file && file.size <= 2000000
    //     })
})

export const Create = () => {
    useDocumentTitle("New beer | Prazdroj")
    const [breweries, setBreweries] = useState([])
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ resolver: yupResolver(schema) })

    useEffect(() =>{
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
        // data.preventDefault()
        // alert(JSON.stringify(data))

        const beer = {
            name: data.name,
            description: data.description,
            alcoholContent: data.alcoholContent,
            typeOfBeer: data.typeOfBeer,
            breweryId: data.breweryId,
            // photo: data.photo,
        }

        axios
            .post("http://localhost:5000/beers", beer)
            .then(() => {
                enqueueSnackbar("Beer created successfully", { variant: "success" })
                navigate("/beers")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Create Beer</h1>

            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
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
                                defaultValue={"DEFAULT"}
                            >
                                <option value="DEFAULT" disabled hidden>Select the type of beer</option>
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
                                defaultValue={"DEFAULT"}
                            >
                                <option value="DEFAULT" disabled hidden>Select a brewery</option>
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

                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Create
