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
    const { id, doctor_name, doctor_department, open, handleClose } = props;
    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const handleDelete = async () => {
        await api
            .delete(`/api/doctors/${id}`)
            .then((res) => {
                console.log("response return");
                setMessage(`Doctor ${id} has been deleted!`);
                handleSuccess();
                handleClose();
            })
            .catch((err) => {
                setMessage("Can't delete doctor at the moment!");
                handleFailure();
                console.log(err);
                handleClose();
            });
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
            <DialogTitle id="alert-dialog-title">Delete Doctor ?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Delete doctor {doctor_name} (ID: {id}) from department{" "}
                    {doctor_department}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancle</Button>
                <Button onClick={handleDelete} autoFocus className="danger">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const DataTable = () => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState();
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/api/doctors")
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                alert(error.response.data.message);
            });
    }, [showDeleteDialog]);

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
            field: "name",
            headerName: "Doctor",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "department",
            headerName: "Department",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "departmentId",
            headerName: "Department ID",
            headerAlign: "center",
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
                        doctor_name: params.row.name,
                        doctor_departmentId: params.row.departmentId,
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
                    columnVisibilityModel={{ departmentId: false }}
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
