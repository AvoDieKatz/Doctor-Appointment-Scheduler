import React from "react";
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { calculateAge, translateGender } from "../../../utils/common";

const ReportAppointmentDetail = () => {
    const { state: data } = useLocation();
    const {
        patientName,
        patientGender,
        patientDob,
        department,
        patientMessage,
    } = data;

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
                    Name: <span>{patientName}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Gender: <span>{translateGender(patientGender)}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Age: <span>{calculateAge(patientDob)}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Check up in: <span>{department}</span>
                </Typography>
            </Grid>
            <Grid>
                <Typography>
                    Message: <span>{patientMessage}</span>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ReportAppointmentDetail;
