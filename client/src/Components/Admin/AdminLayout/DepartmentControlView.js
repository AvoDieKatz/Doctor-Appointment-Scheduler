import React from "react";
import Grid from "@mui/material/Grid";
import { DepartmentTable } from "../AdminIndex";
import { AddButton, SearchField } from "../../Common/CommonIndex";

const DepartmentControlView = () => {
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
                <DepartmentTable />
            </Grid>
        </>
    );
};

export default DepartmentControlView;
