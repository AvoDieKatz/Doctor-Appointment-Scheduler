import React from "react";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DoctorTable } from "../AdminIndex";
import { AddButton, SearchField } from "../../Common/CommonIndex";
import { useAlert } from "../../../context/AlertContext";

const DoctorControlView = () => {
    const { openSuccess, openFailure, message, close } = useAlert();
    const handleClose = () => {
        close();
    };

    return (
        <>
            <Snackbar
                open={openSuccess}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openFailure}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity="error" sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>

            <Grid container sx={{ mb: 2 }}>
                <Grid sx={{ flexGrow: 1, mr: "2rem" }}>
                    <SearchField />
                </Grid>
                <Grid>
                    <AddButton />
                </Grid>
            </Grid>
            <Grid container>
                <DoctorTable />
            </Grid>
        </>
    );
};

export default DoctorControlView;
