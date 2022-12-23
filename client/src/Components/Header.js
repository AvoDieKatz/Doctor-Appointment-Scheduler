import React from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import { getUsername, removeUserSession } from "../utils/common";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const username = getUsername();
    const navigate = useNavigate()
    const handleLogout = () => {
        removeUserSession()
        navigate('/')
    }
    
    return (
        <Box sx={{ flex: "0 1 auto" }} className="green-background">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, color: "primary.text" }}
                >
                    Doctor Portal
                </Typography>
                <Typography color="primary.text">
                    You have logged in as {username}
                </Typography>
                <Button className="danger" onClick={handleLogout}>Log out</Button>
            </Toolbar>
        </Box>
    );
};

export default Header;
