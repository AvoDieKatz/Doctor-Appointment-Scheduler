import React from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const departmentSchema = yup.object({});

const DepartmentManagementForm = ({ handleView }) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(departmentSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Grid
            container
            justifyContent="center"
            sx={{
                width: "100%",
                height: "100%",
            }}
        >
            <Grid item display="flex" justifyContent="center" alignContent="center" xs={8}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ width: "100%" }}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack>
                        <Button onClick={handleView}>Back</Button>

                        <Controller
                            control={control}
                            name="name"
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

                        <Button type="submit" variant="filled">
                            Add New
                        </Button>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DepartmentManagementForm;
