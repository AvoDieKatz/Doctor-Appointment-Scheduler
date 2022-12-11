import React from "react";
import { Grid, Typography } from "@mui/material";

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

export default ReportAppointmentDetail;
