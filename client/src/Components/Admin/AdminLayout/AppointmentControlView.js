import React, { useState } from "react";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { AppointmentTable } from "../AdminIndex";
import { SearchField } from "../../Common/CommonIndex";

const AppointmentControlView = () => {
    // CAN RUN API CALL APPOINTMENT HISTORY HERE
    // RERENDER ON filterType STATE
    // USE MYSQL ORDER BY TO SORT DATE DESC

    const [filterType, setFilterType] = useState("all");

    const handleChange = (event, type) => {
        setFilterType(type);
    };

    return (
        <>
            <Grid container sx={{ mb: 2 }}>
                <Grid sx={{ mr: "2rem" }}>
                    <ToggleButtonGroup
                        color="primary"
                        value={filterType}
                        exclusive
                        onChange={handleChange}
                        aria-label="Filter appointments"
                        size="small"
                    >
                        <ToggleButton value="all">All</ToggleButton>
                        <ToggleButton value="waiting">Waiting</ToggleButton>
                        <ToggleButton value="completed">Completed</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid sx={{ flexGrow: 1 }}>
                    <SearchField />
                </Grid>
            </Grid>
            <Grid container>
                <AppointmentTable filterType={filterType} />
            </Grid>
        </>
    );
};

export default AppointmentControlView;
