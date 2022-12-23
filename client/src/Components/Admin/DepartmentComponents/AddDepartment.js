import React from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReturnButton } from "../../Common/CommonIndex";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import { useAlert } from "../../../context/AlertContext";

const departmentSchema = yup.object({
    department_name: yup
        .string()
        .required("Please provide a name for this department"),
});

const AddDepartment = () => {
    const navigate = useNavigate();
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
            .post("/api/departments/create", request)
            .then((res) => {
                setMessage("Successfully created a new department");
                handleSuccess();
            })
            .catch((error) => {
                setMessage("Can't create new department at this moment!");
                handleFailure();
            });
        navigate("/admin/departments");
    };

    return (
        <>
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
                                Add New
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default AddDepartment;
