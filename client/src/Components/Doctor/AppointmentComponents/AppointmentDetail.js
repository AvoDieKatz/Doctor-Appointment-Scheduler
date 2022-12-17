import React, { useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const AppointmentDetail = () => {

    // when the API is ready, we use useParams() hook fromm react-router-dom to fetch data instead
    // if the response is 404 use useNavigate() hook to navigate user to not-found page

    const { state: data } = useLocation();
    const { name, gender, age, contact, dept, message } = data;

    // const navigate = useNavigate();
    // const {id} = useParams()
    // useEffect(() => {
    //     // API CALL GET DETAIL HERE
    //         navigate("/not-found")
    // },[])
    

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
