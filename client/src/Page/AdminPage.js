import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import {
    AdminHome,
    AppointmentControlView,
    DoctorControlView,
    DepartmentControlView,
    Appointment,
    AddDoctor,
    EditDoctor,
    AddDepartment,
    EditDepartment,
    StatisticsControlView
} from "../Components/Admin/AdminIndex";
import { SideNav, StaffLayout } from "../Components/Common/CommonIndex";
import { Navigate, Route, Routes } from "react-router-dom";

const View = () => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid item xs={3} className="table-header">
                    <Typography>SECTIONS</Typography>
                </Grid>
                <Grid item xs={9} className="table-header">
                    <Typography>MANAGEMENT</Typography>
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto">
                <Grid item xs={3} className="table-content table-content-side">
                    <SideNav />
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={9} className="table-content table-content-main">
                    <Routes>
                        <Route element={<StaffLayout />}>
                            <Route index element={<AdminHome />} />
                            <Route path="appointments">
                                <Route
                                    index
                                    element={<AppointmentControlView />}
                                />
                                <Route path=":id" element={<Appointment />} />
                            </Route>
                            <Route path="doctors">
                                <Route index element={<DoctorControlView />} />
                                <Route path="add" element={<AddDoctor />} />
                                <Route
                                    path=":id/update"
                                    element={<EditDoctor />}
                                />
                            </Route>
                            <Route path="departments">
                                <Route
                                    index
                                    element={<DepartmentControlView />}
                                />
                                <Route path="add" element={<AddDepartment />} />
                                <Route
                                    path=":id/update"
                                    element={<EditDepartment />}
                                />
                            </Route>
                            <Route path="statistics">
                                <Route index element={<StatisticsControlView />} />
                            </Route>
                            <Route
                                path="*"
                                element={<Navigate to="/not-found" />}
                            />
                        </Route>
                    </Routes>
                </Grid>
            </Grid>
        </>
    );
};

const AdminPage = () => {
    return <View />;
};

export default AdminPage;
