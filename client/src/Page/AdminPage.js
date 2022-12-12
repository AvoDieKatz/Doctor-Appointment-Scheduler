import React from "react";

import { Grid, Typography, Divider } from "@mui/material";
import {
    SideNav,
    DepartmentControlView,
    DoctorControlView,
    AppointmentControlView,
} from "../Components/Admin/index";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminHome from "../Components/Admin/Layout/AdminHome";
import AdminLayout from "../Components/Admin/Layout/AdminLayout";

const View = () => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid item xs={4} className="table-header">
                    <Typography>SECTIONS</Typography>
                </Grid>
                <Grid item xs={8} className="table-header">
                    <Typography>MANAGEMENT</Typography>
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto">
                <Grid item xs={4} className="table-content table-content-side">
                    <SideNav />
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={8} className="table-content table-content-main">
                    <Routes>
                        <Route element={<AdminLayout />}>
                            <Route index element={<AdminHome />} />
                            <Route
                                path="appointments"
                                element={<AppointmentControlView />}
                            />
                            <Route
                                path="doctors"
                                element={<DoctorControlView />}
                            />
                            <Route
                                path="departments"
                                element={<DepartmentControlView />}
                            />
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
