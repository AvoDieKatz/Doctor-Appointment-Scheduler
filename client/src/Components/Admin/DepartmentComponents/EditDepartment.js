import React from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReturnButton } from "../index";
import { useLocation, useNavigate } from "react-router-dom";

const departmentSchema = yup.object({
    department_name: yup
        .string()
        .required("Please provide a name for this department"),
});

const AddDepartment = ({ handleView }) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        resolver: yupResolver(departmentSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
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
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <TextField
                                    {...field}
                                    defaultValue={
                                        location.state.department_name
                                    }
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

export default AddDepartment;
