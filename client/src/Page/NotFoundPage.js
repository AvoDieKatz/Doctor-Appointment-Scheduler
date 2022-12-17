import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/");
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "50vh",
            }}
        >
            <Typography variant="h1" sx={{ color: "primary.main" }}>
                404
            </Typography>
            <Typography variant="h6" sx={{ color: "primary.main" }}>
                The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} onClick={handleNavigate}>
                Back Home
            </Button>
        </Box>
    );
};

export default NotFoundPage;
