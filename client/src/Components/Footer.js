import React from "react";
import { Box, Toolbar, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                flex: "0 1 auto",
                // width: "100%",
            }}
            className="green-background"
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "primary.text"
                    }}
                >
                    &copy; Copyright 2022
                </Typography>
            </Toolbar>
        </Box>
    );
};

export default Footer;
