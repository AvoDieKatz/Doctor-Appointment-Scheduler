import React, { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

const DeleteDialog = (props) => {
    const { id, doctor_name, doctor_department, open, handleClose } = props;

    const handleDelete = () => {
        console.log("Deleted ", id);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete Doctor ID: {id}, name: {doctor_name} in 
                {doctor_department} department
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleDelete} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DataTable = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState();

    const handleOpenDeleteView = (params) => {
        setShowDeleteDialog(true);
        setSelectedDoctor(params);
    };

    const handleCloseDeleteView = () => {
        setShowDeleteDialog(false);
        setSelectedDoctor(null);
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            headerAlign: "center",
            flex: 1,
            headerClassName: "table-data-header",
        },
        {
            field: "doctor_name",
            headerName: "Doctor",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "doctor_department",
            headerName: "Department",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            headerClassName: "table-data-header",
            getActions: (params) => [
                <GridActionsCellItem
                    component={Link}
                    to={`${params.id}/update`}
                    state={{
                        doctor_name: params.row.doctor_name,
                        doctor_department: params.row.doctor_department
                    }}
                    icon={<EditIcon />}
                    label="Edit"
                />,
                <GridActionsCellItem
                    onClick={() => handleOpenDeleteView(params.row)}
                    icon={<DeleteIcon />}
                    label="Delete"
                />,
            ],
        },
    ];

    const rows = [
        { id: 1, doctor_name: "Snow", doctor_department: 35 },
        { id: 2, doctor_name: "Lannister", doctor_department: 42 },
        { id: 3, doctor_name: "Lannister", doctor_department: 45 },
        { id: 4, doctor_name: "Stark", doctor_department: 16 },
        { id: 5, doctor_name: "Targaryen", doctor_department: 0 },
        { id: 6, doctor_name: "Melisandre", doctor_department: 150 },
        { id: 7, doctor_name: "Clifford", doctor_department: 44 },
        { id: 8, doctor_name: "Frances", doctor_department: 36 },
        { id: 9, doctor_name: "Roxie", doctor_department: 65 },
    ];

    return (
        <>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableColumnMenu={true}
                    disableSelectionOnClick={true}
                    showCellRightBorder={true}
                    showColumnRightBorder={true}
                    sx={{
                        "& .table-data-header": {
                            backgroundColor: "primary.main",
                            color: "primary.text",
                        },
                        "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus":
                            {
                                outline: "none",
                            },
                        "& .MuiDataGrid-sortIcon": {
                            color: "primary.text",
                        },
                    }}
                />
            </div>
            <DeleteDialog
                {...selectedDoctor}
                open={showDeleteDialog}
                handleClose={handleCloseDeleteView}
            />
        </>
    );
};

export default DataTable;
