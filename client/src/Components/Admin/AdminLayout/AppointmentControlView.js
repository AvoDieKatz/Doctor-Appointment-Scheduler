import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import React, { useState } from "react";
import { AppointmentTable } from "../AdminIndex";
import { SearchField } from "../../Common/CommonIndex";

const AppointmentControlView = () => {
    const [sortType, setSortType] = useState("waiting");

    const handleChange = (event, type) => {
        console.log(event);
        setSortType(type);
    };
    return (
        <>
            <Grid container sx={{ mb: 2 }}>
                <Grid sx={{ mr: "2rem" }}>
                    <ToggleButtonGroup
                        color="primary"
                        value={sortType}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="waiting">Waiting</ToggleButton>
                        <ToggleButton value="completed">Completed</ToggleButton>
                        <ToggleButton value="all">History</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid sx={{ flexGrow: 1 }}>
                    <SearchField />
                </Grid>
            </Grid>
            <Grid container>
                <AppointmentTable />
            </Grid>
        </>
    );
};

export default AppointmentControlView;
