import React from "react";
import { Box, Toolbar, Typography, Button } from "@mui/material";

const Header = ({ user }) => {
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

                {user == null ? (
                    <Button color="inherit" sx={{ color: "primary.text" }}>
                        Login
                    </Button>
                ) : (
                    <Typography color="primary.text">
                        You are logged in as {user}
                    </Typography>
                )}
            </Toolbar>
        </Box>
    );
};

export default Header;
