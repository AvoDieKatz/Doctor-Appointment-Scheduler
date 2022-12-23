import React, { useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReturnButton } from "../../Common/CommonIndex";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { PasswordField } from "../../Authentication/LoginForm";
import { useAlert } from "../../../context/AlertContext";

const doctorSchema = yup.object({
    doctor_name: yup.string().required("Please provide doctor name"),
    doctor_username: yup.string().required("Please provide doctor username"),
    doctor_password: yup
        .string()
        .min(8, "Must be atleast 8 characters")
        .required("Please provide doctor password"),
    doctor_department: yup
        .string()
        .required("Please select a department for this doctor"),
});

const AddDoctor = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        resolver: yupResolver(doctorSchema),
        defaultValues: {
            doctor_name: "",
            doctor_username: "",
            doctor_password: "",
            doctor_department: "",
        },
    });

    useEffect(() => {
        api.get("/api/departments")
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }, []);

    const onSubmit = async (data) => {
        const request = {
            name: data.doctor_name,
            username: data.doctor_username,
            password: data.doctor_password,
            departmentId: data.doctor_department,
        };
        console.log(request);
        await api
            .post("/api/doctors/create", request)
            .then((res) => {
                setMessage("Successfully created a new doctor!");
                handleSuccess();
                console.log("add request sent ");
            })
            .catch((error) => {
                console.log(error);
                setMessage("Can't create new doctor at this moment!");
                handleFailure();
            });
        navigate("/admin/doctors");
    };

    return (
        <Grid
            container
            justifyContent="center"
            sx={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >
            <ReturnButton />
            <Grid
                item
                display="flex"
                justifyContent="center"
                alignContent="center"
                xs={8}
            >
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{
                        width: "100%",
                        "& .MuiTextField-root": {
                            mt: 2,
                        },
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack>
                        <Controller
                            control={control}
                            name="doctor_name"
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <TextField
                                    {...field}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={invalid}
                                    helperText={error?.message}
                                    label="Doctor Name"
                                    required
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="doctor_username"
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <TextField
                                    {...field}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={invalid}
                                    helperText={error?.message}
                                    label="Username"
                                    required
                                />
                            )}
                        />

                        <Controller
                            name="doctor_password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <PasswordField
                                    fieldState={fieldState}
                                    field={field}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="doctor_department"
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <TextField
                                    {...field}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={invalid}
                                    helperText={error?.message}
                                    required
                                    label="Department"
                                    select
                                >
                                    {departments.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={!isDirty}
                            variant="filled"
                            sx={{ mt: 3 }}
                        >
                            Add New Doctor
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AddDoctor;
