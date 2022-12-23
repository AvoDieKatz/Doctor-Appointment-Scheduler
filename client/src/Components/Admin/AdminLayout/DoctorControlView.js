import React from "react";
import Grid from "@mui/material/Grid";
import { DoctorTable } from "../AdminIndex";
import { AddButton, SearchField } from "../../Common/CommonIndex";

const DoctorControlView = () => {

    return (
        <>
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
