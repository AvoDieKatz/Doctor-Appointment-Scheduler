import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import ReturnButton from "../../Common/ReturnButton";
import api from "../../../utils/api";
import { useParams } from "react-router-dom";

const calculateAge = (dob) => {
    var diff_ms = Date.now() - new Date(dob).getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
};

const translateGender = (code) => {
    switch (code) {
        case 0:
            return "Others";
        case 1:
            return "Male";
        case 2:
            return "Female";
        default:
            break;
    }
};

const Detail = (props) => {
    const {
        setView,
        patientName,
        patientGender,
        patientDob,
        patientContact,
        department,
        patientMessage,
        isDone,
    } = props;

    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Patient Name: {patientName}</Typography>
                </Grid>
                <Grid>
                    <Typography>
                        Gender: {translateGender(patientGender)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography>Age: {calculateAge(patientDob)}</Typography>
            </Grid>
            <Grid>
                <Typography>Check up for: {department}</Typography>
            </Grid>
            <Grid sx={{ flexGrow: 1 }}>
                <Typography>Patient's message: {patientMessage}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Contact: {patientContact}</Typography>
                </Grid>
                <Grid>
                    <Button
                        disabled={!isDone}
                        onClick={setView}
                        variant="contained"
                    >
                        Examination Report
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

const Report = ({ setView, doctor }) => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        api.get(`/api/reports/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const { createdAt, oxygen, bloodPressure, weight, message } = data;

    return (
        <>
            <Grid>
                <Typography>Examinated by doctor: {doctor}</Typography>
            </Grid>
            <Grid>
                <Typography>
                    Created at: {new Date(createdAt).toLocaleString("en-GB")}
                </Typography>
            </Grid>
            <Box component="div">
                <Divider
                    variant="middle"
                    sx={{
                        mb: "20px",
                        fontSize: "20px",
                    }}
                >
                    RESULT
                </Divider>
            </Box>
            <Grid>
                <Typography>Weight: {weight}</Typography>
            </Grid>
            <Grid>
                <Typography>Oxygen pulse: {oxygen}</Typography>
            </Grid>
            <Grid>
                <Typography>Blood pressure: {bloodPressure}</Typography>
            </Grid>
            <Grid sx={{ flexGrow: 1 }}>
                <Typography>Doctor's conclusion:</Typography>
                <Typography>{message}</Typography>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Grid>
                    <Button onClick={setView} variant="contained">
                        Appointment Detail
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

const Appointment = () => {
    const [view, setView] = useState(true);
    const [data, setData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        api.get(`/api/appointments/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleView = () => {
        setView(!view);
    };

    return (
        <>
            <Grid
                container
                direction="column"
                flex="1 1 auto"
                sx={{
                    position: "relative",
                    "& .MuiTypography-root": {
                        mb: "20px",
                    },
                }}
                justifyContent="center"
            >
                <ReturnButton />
                <Grid
                    item
                    xs={10}
                    display="flex"
                    direction="column"
                    flex="1 1 auto"
                >
                    {view ? (
                        <Detail setView={handleView} {...data} />
                    ) : (
                        <Report setView={handleView} doctor={data.doctor} />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Appointment;
