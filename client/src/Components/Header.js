import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";

const Header = () => {
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
                    You are logged in as #
                </Typography>
            </Toolbar>
        </Box>
    );
};

export default Header;
