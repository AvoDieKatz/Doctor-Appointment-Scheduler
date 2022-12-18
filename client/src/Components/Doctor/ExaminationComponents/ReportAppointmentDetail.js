import React from "react";
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

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
                <Typography>
                    Name: <span>{name}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Gender: <span>{gender}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Age: <span>{age}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Check up in: <span>{dept}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Message: <span>{message}</span>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ReportAppointmentDetail;
