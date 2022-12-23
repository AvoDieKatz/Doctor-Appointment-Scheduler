import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
    Box,
    Button,
    Typography,
    TextField,
    MenuItem,
    FormControl,
    FormControlLabel,
    FormLabel,
    FormHelperText,
    RadioGroup,
    Radio,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../utils/api";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    fullname: yup.string().required("Field is required"),
    dob: yup
        .date()
        .max(new Date(), "Can't be after today")
        .nullable()
        .typeError("Invalid Date")
        .required("Field is required"),
    gender: yup.string().required("Field is required"),
    phone_number: yup
        .string()
        .matches(
            /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
            "Invalid phone number"
        )
        .required("Field is required"),
    department: yup.string().required("Field is required"),
    doctor: yup.string().required("Field is required"),
    appointment_date: yup
        .date()
        .min(new Date(), "Can't be before today")
        .nullable()
        .typeError("Invalid Date")
        .required("Field is required"),
});

const PatientForm = () => {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState();
    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState,
        // formState: { isSubmitSuccessful },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullname: "",
            dob: null,
            gender: "",
            appointment_date: null,
            message: "",
            phone_number: "",
            department: null,
            doctor: null,
        },
    });

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset]);

    useEffect(() => {
        api.get("/api/departments")
            .then((res) => {
                setDepartments(res.data);
            })
            .catch((error) => {
                setMessage("Error!");
                handleFailure();
            });
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            api.get(`/api/departments/${selectedDepartment}/doctors`)
                .then((res) => {
                    setDoctors(res.data);
                })
                .catch((error) => {
                    setMessage("Error!");
                    handleFailure();
                });
        }
    }, [selectedDepartment]);

    const onSubmit = async (data) => {
        const request = {
            patientName: data.fullname,
            dob: new Date(data.dob).toLocaleDateString(),
            gender: data.gender,
            appointedDate: new Date(data.appointment_date).toLocaleDateString(),
            patientMessage: data.message,
            departmentId: parseInt(data.department),
            doctorId: parseInt(data.doctor),
            patientContact: data.phone_number,
        };
        await api
            .post("/api/appointments/create", request)
            .then((res) => {
                setMessage("You have successfully schedule an appointment!");
                handleSuccess();
            })
            .catch((error) => {
                setMessage("Error");
                handleFailure();
            });
        navigate("/");
    };

    return (
        <Container>
            <Grid container>
                <Grid
                    item
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        component="div"
                        sx={{ minWidth: "30vw", maxWidth: "30vw" }}
                    >
                        <Typography
                            variant="h5"
                            align="center"
                            sx={{ color: "primary.main", mb: "16px" }}
                        >
                            Schedule an appointment
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                "& .MuiTextField-root": {
                                    m: "8px 0px",
                                    width: "100%",
                                },
                                "& .MuiButton-root": {
                                    width: "100%",
                                },
                            }}
                            noValidate
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="fullname"
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
                                            label="Name"
                                            placeholder="Your fullname"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="dob"
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <LocalizationProvider
                                            dateAdapter={AdapterMoment}
                                        >
                                            <DatePicker
                                                {...field}
                                                value={field.value}
                                                onChange={field.onChange}
                                                label="Date of Birth"
                                                inputFormat="DD/MM/YYYY"
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={invalid}
                                                        helperText={
                                                            error?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="gender"
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <FormControl error={invalid}>
                                            <FormLabel id="gender-radio-group">
                                                Gender
                                            </FormLabel>
                                            <RadioGroup
                                                {...field}
                                                value={field.value}
                                                onChange={field.onChange}
                                                row
                                                aria-labelledby="gender-radio-group"
                                            >
                                                <FormControlLabel
                                                    value={2}
                                                    control={<Radio />}
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    value={1}
                                                    control={<Radio />}
                                                    label="Male"
                                                />
                                                <FormControlLabel
                                                    value={0}
                                                    control={<Radio />}
                                                    label="Other"
                                                />
                                            </RadioGroup>
                                            <FormHelperText>
                                                {error?.message}
                                            </FormHelperText>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="phone_number"
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
                                            label="Phone Number"
                                            placeholder="Phone Number"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="department"
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            value={field.value}
                                            onChange={(value) => {
                                                field.onChange(value);
                                                setSelectedDepartment(
                                                    value.target.value
                                                );
                                            }}
                                            error={invalid}
                                            helperText={error?.message}
                                            required
                                            select
                                            label="Department"
                                            defaultValue=""
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
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="doctor"
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
                                            select
                                            disabled={!watch("department")}
                                            label="Doctor"
                                            defaultValue=""
                                        >
                                            {doctors?.map((option) => (
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
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="appointment_date"
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <LocalizationProvider
                                            dateAdapter={AdapterMoment}
                                        >
                                            <DatePicker
                                                {...field}
                                                value={field.value}
                                                onChange={field.onChange}
                                                label="Appointment Date"
                                                inputFormat="DD/MM/YYYY"
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        error={invalid}
                                                        helperText={
                                                            error?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name="message"
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            value={field.value}
                                            onChange={field.onChange}
                                            multiline
                                            rows={4}
                                            label="Current Condition"
                                            placeholder="Briefly describe how you feeling"
                                        />
                                    )}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: "16px" }}
                            >
                                SUBMIT
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PatientForm;
