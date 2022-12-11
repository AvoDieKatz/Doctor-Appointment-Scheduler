import React from "react";
import { useState } from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const AppointmentList = () => {
    const [openToday, setOpenToday] = useState(true);

    const handleClick = () => {
        setOpenToday(!openToday);
    };

    return (
        <List component="nav" disablePadding="true">
            <ListItemButton
                onClick={handleClick}
                sx={{
                    p: 0,
                }}
            >
                <ListItemText primary="Today" />
                {openToday ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openToday} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        "& .MuiListItemButton-root": {
                            p: "0 0 0 1rem",
                        },
                    }}
                >
                    <ListItemButton>
                        <ListItemText primary="Tran Anh Tung - M - 21" />
                    </ListItemButton>
                    <ListItemButton disabled>
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

export default AppointmentList;
