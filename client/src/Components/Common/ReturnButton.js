import React from "react";
import { Button, styled } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.neutral.main,
    backgroundColor: "transparent",
    "&:hover": {
        backgroundColor: "transparent",
    },
}));

const ReturnButton = () => {
    const navigate = useNavigate();

    return (
        <StyledButton
            startIcon={<ArrowBackIosIcon />}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
            }}
            onClick={() => navigate(-1)}
        >
            Return
        </StyledButton>
    );
};

export default ReturnButton;
