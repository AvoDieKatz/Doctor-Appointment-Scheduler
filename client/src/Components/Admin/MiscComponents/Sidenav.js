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
                    selected={path.pathname === "/admin/appointments"}
                >
                    <ListItemText primary="Appointments" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    component={Link}
                    to="doctors"
                    selected={path.pathname === "/admin/doctors"}
                >
                    <ListItemText primary="Doctor Management" />
                </ListItemButton>
                <Divider />
                <ListItemButton
                    component={Link}
                    to="departments"
                    selected={path.pathname === "/admin/departments"}
                >
                    <ListItemText primary="Department Management" />
                </ListItemButton>
            </List>
        </Box>
    );
};

export default Sidenav;
