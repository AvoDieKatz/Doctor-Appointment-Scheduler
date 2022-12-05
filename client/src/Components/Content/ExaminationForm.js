import { Grid, Button, Typography, Divider } from "@mui/material";
import React from "react";

const PatientInfo = () => {
    return (
        <Grid container>
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

const ExaminationForm = () => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid xs={4} className="table-header">
                    <Typography>Patient Info</Typography>
                </Grid>
                <Grid xs={8} className="table-header">
                    <Typography>Examination Report</Typography>
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto" >
                <Grid xs={4} className="table-content">
                    <PatientInfo />
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid xs={8} className="table-content">
                    <Grid>
                        Examination Report Form
                    </Grid>
                    <Grid>
                        <Button variant="contained" size="small">
                            Submit Report
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ExaminationForm;
