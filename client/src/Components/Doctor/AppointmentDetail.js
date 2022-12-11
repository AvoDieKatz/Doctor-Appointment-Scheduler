import React from "react";
import { Grid, Typography, Button } from "@mui/material";

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

export default AppointmentDetail;
