import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

const DataTable = ({ filterType }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        api.get("/api/appointments", {
            params: {
                filter: filterType,
            },
        })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [filterType]);

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
            field: "patientName",
            headerName: "Patient",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "doctor",
            headerName: "Assigned Doctor",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "scheduledDate",
            headerName: "Scheduled Date",
            type: "date",
            headerAlign: "center",
            flex: 1.5,
            headerClassName: "table-data-header",
            renderCell: (params: GridRenderCellParams<Date>) => (
                <div>{new Date(params.value).toLocaleDateString("en-GB")}</div>
            ),
        },
        {
            field: "isDone",
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

    return (
        <>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    columnVisibilityModel={{ isDone: false }}
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
                                    field: "appointment_date",
                                    sort: "desc",
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
