import React, { useState } from "react";
import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import ReturnButton from "../../Common/ReturnButton";

const Detail = ({ setView }) => {
    const [data, setData] = useState({
        name: "Tung",
        gender: 1,
        age: 21,
        contact: "09123182748",
        dept: "Cardiology",
        message: "I dont feel good",
    });
    const { name, gender, age, contact, dept, message } = data;

    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Patient Name: {name}</Typography>
                </Grid>
                <Grid>
                    <Typography>Gender: {gender}</Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography>Age: {age}</Typography>
            </Grid>
            <Grid>
                <Typography>Check up for: {dept}</Typography>
            </Grid>
            <Grid sx={{ flexGrow: 1 }}>
                <Typography>Patient's message: {message}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Contact: {contact}</Typography>
                </Grid>
                <Grid>
                    <Button onClick={setView} variant="contained">
                        Examination Report
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

const Report = ({ setView }) => {
    const [data, setData] = useState({
        doctorName: "Tran Van B",
        startTime: new Date(new Date("2022-03-25")).toLocaleDateString(),
        oxygen: 90,
        bloodPressure: 90,
        weight: 70,
        conclusion: "You are pretty good just need a few rest",
    });
    const {
        doctorName,
        startTime,
        endTime,
        oxygen,
        bloodPressure,
        weight,
        conclusion,
    } = data;

    return (
        <>
            <Grid>
                <Typography>Examinated by doctor: {doctorName}</Typography>
            </Grid>
            <Grid>
                <Typography>Time start examination: {startTime}</Typography>
            </Grid>
            <Grid>
                <Typography>Time end examination: {endTime}</Typography>
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
                <Typography>{conclusion}</Typography>
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
                        <Detail setView={handleView} />
                    ) : (
                        <Report setView={handleView} />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default Appointment;
