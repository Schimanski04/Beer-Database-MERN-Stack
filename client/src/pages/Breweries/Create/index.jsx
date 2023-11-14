import axios from "axios"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import useDocumentTitle from "../../../hooks/useDocumentTitle"

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

export const Create = () => {
    useDocumentTitle("New brewery | Prazdroj")
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = (data) => {
        const brewery = {
            name: data.name,
            address: data.address,
            phoneNumber: data.phoneNumber,
            email: data.email
        }

        axios
            .post("http://localhost:5000/breweries", brewery)
            .then(() => {
                enqueueSnackbar("Brewery created successfully", { variant: "success" })
                navigate("/breweries")
            })
            .catch((error) => {
                enqueueSnackbar("Error", { variant: "error" })
                console.log(error)
            })
    }

    return (
        <main>
            <h1>Create Brewery</h1>

            <form onSubmit={ handleSubmit(onSubmit) }>
                <div>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
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
                                placeholder="Enter brewery email"
                            />
                        )}
                    />
                    {errors.email && <span>This field is required</span>}
                </div>

                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default Create
