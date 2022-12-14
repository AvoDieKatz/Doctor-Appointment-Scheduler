import React from "react";
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

// const arr = ["suv", "sedan", 'sport'];
// const [ford,,lambo] = vehicles;

const ReportAppointmentDetail = () => {
    const { state: data } = useLocation();
    const { name, gender, age, dept, message } = data;

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
                <Typography>Name: {name}</Typography>
            </Grid>
            <Grid>
                <Typography>Gender: {gender}</Typography>
            </Grid>
            <Grid>
                <Typography>Age: {age}</Typography>
            </Grid>
            <Grid>
                <Typography>Check for: {dept}</Typography>
            </Grid>
            <Grid>
                <Typography>Message: {message}</Typography>
            </Grid>
        </Grid>
    );
};

export default ReportAppointmentDetail;
