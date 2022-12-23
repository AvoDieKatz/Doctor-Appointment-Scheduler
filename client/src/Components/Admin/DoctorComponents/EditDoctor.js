import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReturnButton } from "../../Common/CommonIndex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../context/AlertContext";
import api from "../../../utils/api";

const doctorSchema = yup.object({
    doctor_name: yup.string().required("Required field"),
});

const EditDoctor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const [departments, setDepartments] = useState([]);

    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        resolver: yupResolver(doctorSchema),
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
            departmentId: data.doctor_department,
        };
        await api
            .put(`/api/doctors/${id}`, request)
            .then((res) => {
                setMessage(`Doctor ${id} has been updated!`);
                handleSuccess();
            })
            .catch((error) => {
                setMessage("Can't update doctor at the moment");
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
                    sx={{ width: "100%" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack>
                        <Controller
                            control={control}
                            name="doctor_name"
                            defaultValue={location.state.doctor_name}
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
                            name="doctor_department"
                            defaultValue={location.state.doctor_departmentId}
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <Select
                                    {...field}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={invalid}
                                    helperText={error?.message}
                                    required
                                    label="Department"
                                    sx={{ mt: 2 }}
                                >
                                    {departments.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={!isDirty}
                            variant="filled"
                            sx={{ mt: 3 }}
                        >
                            Update
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default EditDoctor;
