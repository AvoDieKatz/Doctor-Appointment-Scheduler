import React from "react";
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

const schema = yup.object({
    fullname: yup.string().required(),
    dob: yup.date().required(),
    gender: yup.string().required(),
    phone_number: yup.number().required(),
    department: yup.string().required(),
    appointment_date: yup.date().required(),
});

const PatientForm = () => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            dob: null,
            appointment_date: null,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Container>
            <Grid container>
                <Grid
                    xs={12}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        component="div"
                        sx={{ m: "16px 0", minWidth: "30vw", maxWidth: "30vw" }}
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
                            <Grid xs={12}>
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
                            <Grid xs={12}>
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
                            <Grid xs={12}>
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
                                                    value="female"
                                                    control={<Radio />}
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio />}
                                                    label="Male"
                                                />
                                                <FormControlLabel
                                                    value="other"
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
                            <Grid xs={12}>
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
                            <Grid xs={12}>
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
                                            onChange={field.onChange}
                                            error={invalid}
                                            helperText={error?.message}
                                            required
                                            select
                                            label="Department"
                                            defaultValue=""
                                        >
                                            <MenuItem value="bone">
                                                Bone
                                            </MenuItem>
                                            <MenuItem value="organs">
                                                Organs
                                            </MenuItem>
                                            <MenuItem value="eyes">
                                                Eyes
                                            </MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>
                            <Grid xs={12}>
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
                            <Grid xs={12}>
                                <TextField
                                    multiline
                                    rows={4}
                                    label="Current Condition"
                                    placeholder="Briefly describe how you feeling"
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
