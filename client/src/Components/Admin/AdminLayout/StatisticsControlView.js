import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { StatisticsTable } from "../AdminIndex";
import { SearchField } from "../../Common/CommonIndex";

const StatisticsControlView = () => {

    const [filterType, setFilterType] = useState("doctor");

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
                        aria-label="Filter data"
                        size="small"
                    >
                        <ToggleButton value="doctor">Doctor</ToggleButton>
                        <ToggleButton value="department">Department</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid sx={{ flexGrow: 1 }}>
                    <SearchField />
                </Grid>
            </Grid>
            <Grid container>
                <StatisticsTable filterType={filterType}/>
            </Grid>
        </>
    );
};

export default StatisticsControlView;
