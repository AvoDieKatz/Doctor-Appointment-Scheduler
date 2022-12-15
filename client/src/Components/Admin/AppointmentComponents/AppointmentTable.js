import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const DataTable = () => {
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
            field: "appointment_patient",
            headerName: "Patient",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "appointment_doctor",
            headerName: "Doctor",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "appointment_date",
            headerName: "Date",
            headerAlign: "center",
            flex: 1,
            headerClassName: "table-data-header",
            renderCell: (params: GridRenderCellParams<Date>) => (
                <strong>
                  {params.value.toLocaleDateString()}
                </strong>
              ),
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
                />
            ],
        },
    ];

    const rows = [
        { id: 1, appointment_patient: "Snow", appointment_doctor: 35, appointment_date: new Date(2022, 4, 7) },
        { id: 2, appointment_patient: "Lannister", appointment_doctor: 42, appointment_date: new Date(2022, 4, 7) },
        { id: 3, appointment_patient: "Lannister", appointment_doctor: 45, appointment_date: new Date(2022, 4, 7) },
        { id: 4, appointment_patient: "Stark", appointment_doctor: 16, appointment_date: new Date(2022, 4, 7) },
        { id: 5, appointment_patient: "Targaryen", appointment_doctor: 0 , appointment_date: new Date(2022, 4, 7)},
        { id: 6, appointment_patient: "Melisandre", appointment_doctor: 15, appointment_date: new Date(2022, 4, 7) },
        { id: 7, appointment_patient: "Clifford", appointment_doctor: 44, appointment_date: new Date(2022, 4, 7) },
        { id: 8, appointment_patient: "Frances", appointment_doctor: 36, appointment_date: new Date(2022, 4, 7) },
        { id: 9, appointment_patient: "Roxie", appointment_doctor: 65, appointment_date: new Date(2022, 4, 7) },
    ];

    return (
        <>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    disableColumnMenu={true}
                    disableSelectionOnClick={true}
                    showCellRightBorder={true}
                    showColumnRightBorder={true}
                    density="compact"
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
        </>
    );
};

export default DataTable;
