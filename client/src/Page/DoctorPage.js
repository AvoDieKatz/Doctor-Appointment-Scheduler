import React from "react";
import AppointmentDetail from "../Components/Doctor/AppointmentComponents/AppointmentDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import { StaffLayout } from "../Components/Common/CommonIndex";
import {
    AppointmentsView,
    ExaminationView,
    DoctorHome,
} from "../Components/Doctor/DoctorIndex";

const View = () => {
    return (
        <>
            <Routes>
                <Route element={<StaffLayout />}>
                    <Route path="/" element={<AppointmentsView />}>
                        <Route index element={<DoctorHome />} />
                        <Route path="appointments" element={<Navigate to="/doctor" />} />
                        <Route path="appointments/:id" element={<AppointmentDetail />} />
                        <Route path="appointments/:id/examination" element={<ExaminationView />} />
                        <Route path="*" element={<Navigate to="/not-found" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Route>
            </Routes>
        </>
    );
};

const DoctorPage = () => {
    return <View />;
};

export default DoctorPage;
