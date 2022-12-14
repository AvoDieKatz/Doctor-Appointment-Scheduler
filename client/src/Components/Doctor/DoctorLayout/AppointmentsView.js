import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import { AppointmentList } from "../DoctorIndex";
import { Outlet } from "react-router-dom";

const AppointmentsView = () => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid item xs={4} className="table-header">
                    <Typography>APPOINTMENTS</Typography>
                </Grid>
                <Grid item xs={8} className="table-header">
                    <Typography>DETAIL</Typography>
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto">
                <Grid item xs={4} className="table-content table-content-side">
                    <AppointmentList />
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={8} className="table-content table-content-main">
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
};

export default AppointmentsView;
