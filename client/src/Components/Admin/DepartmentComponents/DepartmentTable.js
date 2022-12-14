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
    const { id, department_name, department_doctor_num, open, handleClose } =
        props;

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
                Delete Department ID: {id}, name: {department_name} with{" "}
                {department_doctor_num} doctors
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
    const [selectedDept, setSelectedDept] = useState();

    const handleOpenDeleteView = (params) => {
        setShowDeleteDialog(true);
        setSelectedDept(params);
    };

    const handleCloseDeleteView = () => {
        setShowDeleteDialog(false);
        setSelectedDept(null);
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
            field: "department_name",
            headerName: "Department",
            headerAlign: "center",
            flex: 4,
            headerClassName: "table-data-header",
        },
        {
            field: "department_doctor_num",
            headerName: "Doctors Assigned",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            headerClassName: "table-data-header",
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    component={Link}
                    to={`${params.id}/update`}
                    state={{
                        department_name: params.row.department_name,
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
        { id: 1, department_name: "Snow", department_doctor_num: 35 },
        { id: 2, department_name: "Lannister", department_doctor_num: 42 },
        { id: 3, department_name: "Lannister", department_doctor_num: 45 },
        { id: 4, department_name: "Stark", department_doctor_num: 16 },
        { id: 5, department_name: "Targaryen", department_doctor_num: 0 },
        { id: 6, department_name: "Melisandre", department_doctor_num: 150 },
        { id: 7, department_name: "Clifford", department_doctor_num: 44 },
        { id: 8, department_name: "Frances", department_doctor_num: 36 },
        { id: 9, department_name: "Roxie", department_doctor_num: 65 },
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
                {...selectedDept}
                open={showDeleteDialog}
                handleClose={handleCloseDeleteView}
            />
        </>
    );
};

export default DataTable;
