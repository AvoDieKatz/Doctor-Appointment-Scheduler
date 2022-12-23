import React from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReturnButton } from "../../Common/CommonIndex";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";
import { useAlert } from "../../../context/AlertContext";

const departmentSchema = yup.object({
    department_name: yup
        .string()
        .required("Please provide a name for this department"),
});

const EditDepartment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        resolver: yupResolver(departmentSchema),
    });

    const onSubmit = async (data) => {
        const request = { name: data.department_name };
        await api
            .put(`/api/departments/${id}`, request)
            .then((res) => {
                setMessage(`Department ${id} has been updated!`);
                handleSuccess();
            })
            .catch((err) => {
                setMessage(`Can't update department at the momemnt!`);
                handleFailure();
            });
        navigate("/admin/departments");
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
                            name="department_name"
                            defaultValue={location.state.department_name}
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
                                    label="Department Name"
                                    required
                                />
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

export default EditDepartment;
