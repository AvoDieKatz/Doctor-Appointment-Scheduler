import React from "react";
import { useState } from "react";
import {
    Grid,
    Button,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider,
    Box,
    TextField,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AppointmentDetail = ({ setShowExamination }) => {
    const handleViewClick = () => {
        setShowExamination(true);
    };

    return (
        <Grid
            container
            direction="column"
            flex="1 1 auto"
            sx={{
                "& .MuiTypography-root": {
                    mb: "20px",
                },
            }}
        >
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Patient Name: </Typography>
                </Grid>
                <Grid>
                    <Typography>Gender: </Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography>Age: </Typography>
            </Grid>
            <Grid>
                <Typography>Check up for: </Typography>
            </Grid>
            <Grid sx={{ flexGrow: 1 }}>
                <Typography>Patient's message: </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Contact:</Typography>
                </Grid>
                <Grid>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleViewClick}
                    >
                        Start Examination
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

const AppointmentList = () => {
    const [openToday, setOpenToday] = useState(true);

    const handleClick = () => {
        setOpenToday(!openToday);
    };

    return (
        <List component="nav" disablePadding="true">
            <ListItemButton
                onClick={handleClick}
                sx={{
                    p: 0,
                }}
            >
                <ListItemText primary="Today" />
                {openToday ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openToday} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        "& .MuiListItemButton-root": {
                            p: "0 0 0 1rem"
                        },
                    }}
                >
                    <ListItemButton>
                        <ListItemText primary="Tran Anh Tung - M - 21" />
                    </ListItemButton>
                    <ListItemButton disabled>
                        <ListItemText primary="Tran Avo Tung - F - 27" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Tran He Tung - O - 25" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
};

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

const ReportAppointmentForm = ({ setShowExamination }) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(reportSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleViewClick = () => {
        setShowExamination(false);
    };

    return (
        <Grid container justifyContent="center">
            <Grid xs={10}>
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
                    <Grid xs={12}>
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
                    <Grid xs={12}>
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
                    <Grid xs={12}>
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
                    <Grid xs={12}>
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
                            onClick={handleViewClick}
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

const ReportAppointmentDetail = () => {
    return (
        <Grid
            container
            direction="column"
            sx={{
                "& .MuiTypography-root": {
                    mb: "20px",
                },
            }}
        >
            <Grid>
                <Typography>Name: </Typography>
            </Grid>
            <Grid>
                <Typography>Gender: </Typography>
            </Grid>
            <Grid>
                <Typography>Age: </Typography>
            </Grid>
            <Grid>
                <Typography>Check for: </Typography>
            </Grid>
            <Grid>
                <Typography>Message: </Typography>
            </Grid>
        </Grid>
    );
};

const View = ({ showExamination, setShowExamination }) => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid xs={4} className="table-header">
                    {showExamination ? (
                        <Typography>PATIENT INFO</Typography>
                    ) : (
                        <Typography>APPOINTMENTS</Typography>
                    )}
                </Grid>
                <Grid xs={8} className="table-header">
                    {showExamination ? (
                        <Typography>EXAMINATION REPORT</Typography>
                    ) : (
                        <Typography>DETAIL</Typography>
                    )}
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto">
                <Grid xs={4} className="table-content table-content-side">
                    {showExamination ? (
                        <ReportAppointmentDetail />
                    ) : (
                        <AppointmentList />
                    )}
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid xs={8} className="table-content table-content-main">
                    {showExamination ? (
                        <ReportAppointmentForm
                            setShowExamination={setShowExamination}
                        />
                    ) : (
                        <AppointmentDetail
                            setShowExamination={setShowExamination}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

const DoctorAppointment = () => {
    const [showExamination, setShowExamination] = useState(false);

    return (
        <Grid
            container
            flexDirection="column"
            sx={{
                padding: "5vh",
                "& .table-header": {
                    backgroundColor: "primary.main",
                },
                "& .table-header .MuiTypography-root": {
                    m: "16px 0",
                    textAlign: "center",
                    color: "primary.text",
                },
                "& .table-content": {
                    padding: "16px",
                },
                "& .table-content.table-content-main": {
                    display: "flex",
                    flexDirection: "column",
                    flex: "1 1 auto",
                },
            }}
        >
            <View
                showExamination={showExamination}
                setShowExamination={setShowExamination}
            />
        </Grid>
    );
};

export default DoctorAppointment;
