import React from "react";
import { Box, Button, Grid, MenuItem, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReturnButton } from "../../Common/CommonIndex";
import { useLocation, useNavigate } from "react-router-dom";

const doctorSchema = yup.object({
    doctor_name: yup.string().required("Required field"),
});

const EditDoctor = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        control,
        handleSubmit,
        formState: { isDirty },
    } = useForm({
        resolver: yupResolver(doctorSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        navigate("/admin/doctors");
    };

    const departments = [
        {
            value: "d1",
            label: "Dept 1",
        },
        {
            value: "d2",
            label: "Dept 2",
        },
        {
            value: "d3",
            label: "Dept 3",
        },
    ];

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
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <TextField
                                    {...field}
                                    defaultValue={location.state.doctor_name}
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
                                    defaultValue={
                                        location.state.department_name
                                    }
                                    sx={{ mt: 2 }}
                                >
                                    {departments.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
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
                            Update
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default EditDoctor;
