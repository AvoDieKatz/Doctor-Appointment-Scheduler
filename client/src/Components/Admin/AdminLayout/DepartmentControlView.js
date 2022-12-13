import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { DepartmentTable, AddDepartment } from "../AdminIndex";
import { AddButton, SearchField } from "../../Common/CommonIndex";

const DepartmentControlView = () => {
    const [editting, setEditting] = useState(false);

    const switchToAddView = () => {
        setEditting(true);
    };

    const switchToMainView = () => {
        setEditting(false);
    };

    return (
        <>
            {editting ? (
                <AddDepartment handleView={switchToMainView} />
            ) : (
                <DepartmentMainView handleView={switchToAddView} />
            )}
        </>
    );
};

const DepartmentMainView = ({ handleView }) => {
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
