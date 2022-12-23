import React from "react";
import { Grid, Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";
import { useAlert } from "../../../context/AlertContext";

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
    const { id } = useParams();
    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(reportSchema),
    });

    const onSubmit = async (data) => {
        const request = {
            appointmentId: id,
            bloodPressure: data.blood,
            oxygen: data.oxygen,
            weight: data.weight,
            message: data.conclusion,
        };
        await api
            .post("/api/reports/create", request)
            .then((res) => {
                setMessage("An appointment report has been submitted!");
                handleSuccess();
            })
            .catch((error) => {
                setMessage("Can't not submit report at the moment!");
                handleFailure();
            });
        navigate("/doctor");
    };

    const handleReturn = () => {
        navigate(-1);
    };

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
