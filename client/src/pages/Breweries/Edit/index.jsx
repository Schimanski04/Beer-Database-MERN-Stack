import axios from "axios"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
    name: yup
        .string()
        .required("This field is required"),
    address: yup
        .string()
        .required("This field is required"),
    phoneNumber: yup
        .string()
        .required("This field is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("This field is required")
})

const Edit = () => {
    const [brewery, setBrewery] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()
    const { enqueueSnackbar } = useSnackbar()

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        axios
            .get(`http://localhost:5000/breweries/${id}`)
            .then((response) => {
                setBrewery({
                    name: response.data.name,
                    address: response.data.address,
                    phoneNumber: response.data.phoneNumber,
                    email: response.data.email
                })
            })
            .catch((error) => {
                alert("An error happened. Please check console")
                console.log(error)
            })
    }, [])

    const onSubmit = (data) => {
        const brewery = {
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
            email: data.email
        }

        axios
            .patch(`http://localhost:5000/breweries/${id}`, brewery)
            .then(() => {
                enqueueSnackbar("Brewery edited successfully", { variant: "success" })
                navigate(`/breweries/${id}`)
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Edit Book</h1>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                value={brewery.name}
                                placeholder="Enter brewery name"
                            />
                        )}
                    />
                    {errors.name && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                value={brewery.address}
                                placeholder="Enter brewery address"
                            />
                        )}
                    />
                    {errors.address && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                value={brewery.phoneNumber}
                                placeholder="Enter brewery phone number"
                            />
                        )}
                    />
                    {errors.phoneNumber && <span>This field is required</span>}
                </div>
                <div>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                value={brewery.email}
                                placeholder="Enter brewery email"
                            />
                        )}
                    />
                    {errors.email && <span>This field is required</span>}
                </div>

                <button type="submit">Save</button>
            </form>
        </main>
    )
}

export default Edit
