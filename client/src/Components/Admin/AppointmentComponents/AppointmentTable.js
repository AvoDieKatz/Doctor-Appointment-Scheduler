import React from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const DataTable = () => {
    // if filterType in params === "all"/"waiting"/"completed" call the corresponding endpoint
    
    const columns = [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            headerAlign: "center",
            flex: 0.7,
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
            headerName: "Assigned Doctor",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "appointment_date",
            headerName: "Scheduled Date",
            type: "date",
            headerAlign: "center",
            flex: 1.5,
            headerClassName: "table-data-header",
            renderCell: (params: GridRenderCellParams<Date>) => (
                <div>{params.value.toLocaleDateString("en-GB")}</div>
            ),
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            headerClassName: "table-data-header",
        },
        {
            field: "actions",
            headerName: "Detail",
            type: "actions",
            headerClassName: "table-data-header",
            getActions: (params) => [
                <Button
                    component={Link}
                    to={`${params.id}`}
                    size="small"
                    sx={{
                        color: "primary.main",
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "transparent",
                        },
                    }}
                >
                    View
                </Button>,
            ],
        },
    ];

    const rows = [
        {
            id: 1,
            appointment_patient: "Snow",
            appointment_doctor: 35,
            appointment_date: new Date("2022-12-15T00:00:00+00:00"),
            status: 0,
        },
        {
            id: 2,
            appointment_patient: "Lannister",
            appointment_doctor: 42,
            appointment_date: new Date("2022-12-15T00:00:00+00:00"),
            status: 0,
        },
        {
            id: 3,
            appointment_patient: "Lannister",
            appointment_doctor: 45,
            appointment_date: new Date("2022-12-15T00:00:00+00:00"),
            status: 1,
        },
        {
            id: 4,
            appointment_patient: "Stark",
            appointment_doctor: 16,
            appointment_date: new Date("2022-12-12T00:00:00+00:00"),
            status: 0,
        },
        {
            id: 5,
            appointment_patient: "Targaryen",
            appointment_doctor: 0,
            appointment_date: new Date("2022-12-14T00:00:00+00:00"),
            status: 0,
        },
        {
            id: 6,
            appointment_patient: "Melisandre",
            appointment_doctor: 15,
            appointment_date: new Date("2022-12-12T00:00:00+00:00"),
            status: 1,
        },
        {
            id: 7,
            appointment_patient: "Clifford",
            appointment_doctor: 44,
            appointment_date: new Date("2022-12-13T00:00:00+00:00"),
            status: 1,
        },
        {
            id: 8,
            appointment_patient: "Frances",
            appointment_doctor: 36,
            appointment_date: new Date("2022-12-15T00:00:00+00:00"),
            status: 1,
        },
        {
            id: 9,
            appointment_patient: "Roxie",
            appointment_doctor: 65,
            appointment_date: new Date("2022-12-11T00:00:00+00:00"),
            status: 0,
        },
        {
            id: 10,
            appointment_patient: "Roxie",
            appointment_doctor: 65,
            appointment_date: new Date("2022-12-16T00:00:00+00:00"),
            status: 0,
        },
    ];

    return (
        <>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    columnVisibilityModel={{ status: false }}
                    pageSize={15}
                    rowsPerPageOptions={[15]}
                    disableColumnMenu={true}
                    disableSelectionOnClick={true}
                    showCellRightBorder={true}
                    showColumnRightBorder={true}
                    density="compact"
                    initialState={{
                        sorting: {
                          sortModel: [
                            {
                              field: 'appointment_date',
                              sort: 'desc',
                            },
                          ],
                        },
                      }}
                    
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
