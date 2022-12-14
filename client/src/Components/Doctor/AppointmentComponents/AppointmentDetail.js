import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const AppointmentDetail = () => {
    const { state: data } = useLocation();
    const { name, gender, age, contact, dept, message } = data;

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
                    <Button
                        component={Link}
                        to="examination"
                        state={data}
                        variant="contained"
                        size="small"
                    >
                        Start Examination
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AppointmentDetail;
