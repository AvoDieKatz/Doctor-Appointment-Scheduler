import React from "react";
import { Grid, Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const reportSchema = yup.object({
    blood: yup
        .number()
        .positive("Can't be negative")
        .typeError("Must be a number")
        .required("Required field"),
    oxygen: yup
        .number()
        .positive("Can't be negative")
        .typeError("Must be a number")
        .required("Required field"),
    weight: yup
        .number()
        .positive("Can't be negative")
        .typeError("Must be a number")
        .required("Required field"),
    conclusion: yup.string().required("Please provide your conclusion"),
});

const ReportForm = () => {
    const navigate = useNavigate();
    
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(reportSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        navigate("/doctor")
    };

    const handleReturn = () => {
        navigate(-1);
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={10}>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": {
                            mb: "20px",
                            width: "100%",
                        },
                        "& .MuiButton-root": {
                            width: "160px",
                        },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="blood"
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
                                    label="Blood Pressure"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="oxygen"
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
                                    label="Oxygen Level"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="weight"
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
                                    label="Weight"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name="conclusion"
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
                                    multiline
                                    rows={4}
                                    label="Doctor's Conclusion"
                                />
                            )}
                        ></Controller>
                    </Grid>
                    <Grid container justifyContent="space-between" mt={3}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={handleReturn}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" size="small">
                            Submit Report
                        </Button>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ReportForm;
