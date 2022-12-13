import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const AddButton = () => {
    return (
        <Button
            component={Link}
            to="add"
            endIcon={<AddIcon />}
            sx={{ height: "100%" }}
        >
            New
        </Button>
    );
};

export default AddButton;
