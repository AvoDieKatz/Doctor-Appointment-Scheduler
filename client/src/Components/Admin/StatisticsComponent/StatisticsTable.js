import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../utils/api";
import { useAlert } from "../../../context/AlertContext";

const DoctorData = ({ filterType }) => {
    const [data, setData] = useState([]);
    const { handleFailure, setMessage } = useAlert();

    useEffect(() => {
        api.get("/api/doctors/statistics")
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.response.data.message);
                handleFailure();
            });
    }, [filterType]);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            type: "number",
            headerAlign: "center",
            flex: 0.5,
            headerClassName: "table-data-header",
        },
        {
            field: "name",
            headerName: "Doctor Name",
            headerAlign: "center",
            flex: 1.5,
            headerClassName: "table-data-header",
        },
        {
            field: "department",
            headerName: "Department Name",
            headerAlign: "center",
            headerClassName: "table-data-header",
            flex: 1.5,
        },
        {
            field: "numberOfAppointments",
            headerName: "Total Apps",
            headerAlign: "center",
            flex: 1,
            headerClassName: "table-data-header",
        },
        {
            field: "completedAppointments",
            headerName: "Completed Apps",
            headerAlign: "center",
            flex: 1,
            headerClassName: "table-data-header",
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
        </>
    );
};

const DepartmentData = ({ filterType }) => {
    const [data, setData] = useState([]);
    const { handleFailure, setMessage } = useAlert();

    useEffect(() => {
        api.get("/api/departments/statistics")
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.response.data.message);
                handleFailure();
            });
    }, [filterType]);

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
            headerName: "Department Name",
            headerAlign: "center",
            flex: 2,
            headerClassName: "table-data-header",
        },
        {
            field: "numberOfDoctors",
            headerName: "No. Dr",
            headerAlign: "center",
            flex: 1,
            headerClassName: "table-data-header",
        },
        {
            field: "numberOfAppointments",
            headerName: "No. Apps",
            headerAlign: "center",
            flex: 1,
            headerClassName: "table-data-header",
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
        </>
    );
};

const StatisticsTable = ({ filterType }) => {
    return filterType === "doctor" ? (
        <DoctorData filterType={filterType} />
    ) : (
        <DepartmentData filterType={filterType} />
    );
};

// const Table = ({data, columns}) => {
//     return (
//         <>
//             <div style={{ height: 400, width: "100%" }}>
//                 <DataGrid
//                     rows={data}
//                     columns={columns}
//                     pageSize={5}
//                     rowsPerPageOptions={[5]}
//                     disableColumnMenu={true}
//                     disableSelectionOnClick={true}
//                     showCellRightBorder={true}
//                     showColumnRightBorder={true}
//                     sx={{
//                         "& .table-data-header": {
//                             backgroundColor: "primary.main",
//                             color: "primary.text",
//                         },
//                         "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus":
//                             {
//                                 outline: "none",
//                             },
//                         "& .MuiDataGrid-sortIcon": {
//                             color: "primary.text",
//                         },
//                     }}
//                 />
//             </div>
//         </>
//     );
// }

export default StatisticsTable;
