import React from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Divider,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";

const Sidenav = () => {
    const path = useLocation();
    const section = path.pathname.split("/")[2];

    return (
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            <List
                disablePadding={true}
                component="nav"
                sx={{
                    "& .MuiListItemButton-root.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "primary.text",
                    },
                    "& .MuiListItemButton-root.Mui-selected:hover": {
                        backgroundColor: "primary.main",
                    },
                }}
            >
                <ListItemButton
                    component={Link}
                    to="appointments"
                    selected={section === "appointments"}
                >
                    <ListItemText primary="Appointments" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    component={Link}
                    to="doctors"
                    selected={section === "doctors"}
                >
                    <ListItemText primary="Doctor Management" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    component={Link}
                    to="departments"
                    selected={section === "departments"}
                >
                    <ListItemText primary="Department Management" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    component={Link}
                    to="statistics"
                    selected={section === "statistics"}
                >
                    <ListItemText primary="Statistics" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidenav;
