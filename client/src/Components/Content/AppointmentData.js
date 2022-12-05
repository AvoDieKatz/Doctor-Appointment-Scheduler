import React from "react";
import { useState } from "react";
import {
    Grid,
    Button,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Divider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const AppointmentMain = ({ setShowExamination }) => {
    const handleViewClick = () => {
        setShowExamination(true);
    };

    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Patient Name: </Typography>
                </Grid>
                <Grid>
                    <Typography>Gender: </Typography>
                </Grid>
            </Grid>
            <Grid>
                <Typography>Age: </Typography>
            </Grid>
            <Grid>
                <Typography>Check up for: </Typography>
            </Grid>
            <Grid sx={{ flexGrow: 1 }}>
                <Typography>Patient's message: </Typography>
            </Grid>
            <Grid container justifyContent="space-between">
                <Grid>
                    <Typography>Contact:</Typography>
                </Grid>
                <Grid>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleViewClick}
                    >
                        Start Examination
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

const AppointmentSide = () => {
    const [openToday, setOpenToday] = useState(true);

    const handleClick = () => {
        setOpenToday(!openToday);
    };

    return (
        <List component="nav">
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Today" />
                {openToday ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openToday} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        "& .MuiListItemButton-root": {
                            pl: 4,
                        },
                    }}
                >
                    <ListItemButton>
                        <ListItemText primary="Tran Anh Tung - M - 21" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Tran Avo Tung - F - 27" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary="Tran He Tung - O - 25" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
};

const ExaminationMain = ({ setShowExamination }) => {
    const handleViewClick = () => {
        setShowExamination(false);
    };

    return (
        <Grid container>
            <Grid>Examination Report Form</Grid>
            <Grid>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleViewClick}
                >
                    Return
                </Button>
                <Button variant="contained" size="small">
                    Submit Report
                </Button>
            </Grid>
        </Grid>
    );
};

const ExaminationSide = () => {
    return (
        <Grid container>
            <Grid>
                <Typography>Name: </Typography>
            </Grid>
            <Grid>
                <Typography>Gender: </Typography>
            </Grid>
            <Grid>
                <Typography>Age: </Typography>
            </Grid>
            <Grid>
                <Typography>Check for: </Typography>
            </Grid>
            <Grid>
                <Typography>Message: </Typography>
            </Grid>
        </Grid>
    );
};

const View = ({ showExamination, setShowExamination }) => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid xs={4} className="table-header">
                    {showExamination ? (
                        <Typography>PATIENT INFO</Typography>
                    ) : (
                        <Typography>APPOINTMENTS</Typography>
                    )}
                </Grid>
                <Grid xs={8} className="table-header">
                    {showExamination ? (
                        <Typography>EXAMINATION REPORT</Typography>
                    ) : (
                        <Typography>DETAIL</Typography>
                    )}
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto">
                <Grid xs={4} className="table-content">
                    {showExamination ? (
                        <ExaminationSide />
                    ) : (
                        <AppointmentSide />
                    )}
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid xs={8} className="table-content">
                    {showExamination ? (
                        <ExaminationMain
                            setShowExamination={setShowExamination}
                        />
                    ) : (
                        <AppointmentMain
                            setShowExamination={setShowExamination}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

const AppointmentData = () => {
    const [showExamination, setShowExamination] = useState(false);

    return (
        <Grid
            container
            flexDirection="column"
            sx={{
                padding: "5vh",
                "& .table-header": {
                    backgroundColor: "primary.main",
                },
                "& .table-header .MuiTypography-root": {
                    m: "16px 0",
                    textAlign: "center",
                    color: "primary.text",
                },
                "& .table-content": {
                    display: "flex",
                    flexDirection: "column",
                    flex: "1 1 auto",
                    "& > .MuiGrid-root": {
                        mt: 2,
                    },
                },
            }}
        >
            <View
                showExamination={showExamination}
                setShowExamination={setShowExamination}
            />
        </Grid>
    );
};

export default AppointmentData;
