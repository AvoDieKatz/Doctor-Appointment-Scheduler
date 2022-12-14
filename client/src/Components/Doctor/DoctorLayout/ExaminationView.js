import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import { ReportAppointmentDetail, ReportForm } from "../DoctorIndex";

const ExaminationView = () => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid item xs={4} className="table-header">
                    <Typography>PATIENT INFO</Typography>
                </Grid>
                <Grid item xs={8} className="table-header">
                    <Typography>EXAMINATION REPORT</Typography>
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto">
                <Grid item xs={4} className="table-content table-content-side">
                    <ReportAppointmentDetail />
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={8} className="table-content table-content-main">
                    <ReportForm />
                </Grid>
            </Grid>
        </>
    );
};

export default ExaminationView;
