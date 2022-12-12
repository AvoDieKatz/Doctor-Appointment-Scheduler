import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({switchView}) => {
    return (
        <Button
            onClick={switchView}
            endIcon={<AddIcon />}
            sx={{height: '100%'}}
        >
            New
        </Button>
    );
};

export default AddButton;
