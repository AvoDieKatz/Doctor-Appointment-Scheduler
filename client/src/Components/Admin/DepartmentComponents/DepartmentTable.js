import React, { useState, useEffect } from "react";
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
import api from "../../../utils/api";
import { useAlert } from "../../../context/AlertContext";

const DeleteDialog = (props) => {
    const { id, department_name, open, handleClose } = props;
    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const handleDelete = async () => {
        await api
            .delete(`/api/departments/${id}`)
            .then((res) => {
                setMessage(`Department ${id} has been deleted!`);
                handleSuccess();
            })
            .catch((err) => {
                setMessage("Can't delete department at the moment!");
                handleFailure();
            });
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="xs"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Delete Department ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Delete department {department_name} (ID: {id})
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus className="danger">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DataTable = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedDept, setSelectedDept] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/api/departments")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }, [showDeleteDialog]);

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
            field: "name",
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
                        department_name: params.row.name,
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

    return (
        <>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={data}
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
