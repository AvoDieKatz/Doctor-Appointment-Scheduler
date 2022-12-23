import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Box, Divider } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../../utils/api";
import { useAlert } from "../../../context/AlertContext";
import { calculateAge, translateGender } from "../../../utils/common";

const AppointmentDetail = () => {
    const [data, setData] = useState({});
    const {
        patientName,
        patientGender,
        patientDob,
        patientContact,
        department,
        patientMessage,
        scheduledDate,
    } = data;

    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { handleFailure, setMessage } = useAlert();

    useEffect(() => {
        api.get(`/api/appointments/${id}`)
            .then((res) => {
                if (res.status === 204) {
                    navigate("/not-found", {
                        state: { from: location.pathname },
                        replace: true,
                    });
                }
                setData(res.data);
            })
            .catch((err) => {
                setMessage("ERROR!");
                handleFailure();
            });
    }, []);

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
            <Grid>
                <Typography>
                    Scheduled Date:{" "}
                    {new Date(scheduledDate).toLocaleDateString("en-GB")}
                </Typography>
            </Grid>
            <Box component="div">
                <Divider
                    sx={{
                        mb: "20px",
                        fontSize: "20px",
                    }}
                />
            </Box>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Patient Name: {patientName}</Typography>
                </Grid>
                <Grid>
                    <Typography>
                        Gender: {translateGender(patientGender)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography>Age: {calculateAge(patientDob)}</Typography>
            </Grid>
            <Grid>
                <Typography>Check up in: {department}</Typography>
            </Grid>
            <Grid sx={{ flexGrow: 1 }}>
                <Typography>Patient's message: {patientMessage}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Contact: {patientContact}</Typography>
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
