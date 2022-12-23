import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserRoles } from "../utils/common";

const ProtectedRoutes = ({ allowedRoles }) => {
    const location = useLocation();
    const userRoles = getUserRoles();

    return userRoles.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : (
        <Navigate to="/not-found" state={{ from: location }} replace />
    );
};

export default ProtectedRoutes;
