import React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
    {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 80,
        headerAlign: "center",
        flex: 1,
        headerClassName: "table-data-header",
    },
    {
        field: "name",
        headerName: "Full name",
        width: 200,
        headerAlign: "center",
        flex: 2,
        headerClassName: "table-data-header",
    },
    {
        field: "department",
        headerName: "Department",
        width: 160,
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
        getActions: () => [
            <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
            <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        ],
    },
];

const rows = [
    { id: 1, name: "Snow", department: 35 },
    { id: 2, name: "Lannister", department: 42 },
    { id: 3, name: "Lannister", department: 45 },
    { id: 4, name: "Stark", department: 16 },
    { id: 5, name: "Targaryen", department: null },
    { id: 6, name: "Melisandre", department: 150 },
    { id: 7, name: "Clifford", department: 44 },
    { id: 8, name: "Frances", department: 36 },
    { id: 9, name: "Roxie", department: 65 },
];

export default function DataTable() {
    return (
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
                    "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
                            outline: "none",
                    },
                    "& .MuiDataGrid-sortIcon": {
                        color: "primary.text"
                    }
                }}
            />
        </div>
    );
}
