import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./Page/NotFoundPage";
import PatientPage from "./Page/PatientPage";
import DoctorPage from "./Page/DoctorPage";
import AdminPage from "./Page/AdminPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import LoginForm from "./Components/Authentication/LoginForm";
import { AuthProvider } from "./context/AuthProvider";
import { AlertProvider } from "./context/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>

    <>
        <BrowserRouter>
            <AuthProvider>
                <AlertProvider>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route index element={<PatientPage />} />
                            <Route
                                element={
                                    <ProtectedRoutes
                                        allowedRoles={["ROLE_DOCTOR"]}
                                    />
                                }
                            >
                                <Route
                                    path="doctor/*"
                                    element={<DoctorPage />}
                                />
                            </Route>
                            <Route
                                element={
                                    <ProtectedRoutes
                                        allowedRoles={["ROLE_ADMIN"]}
                                    />
                                }
                            >
                                <Route path="admin/*" element={<AdminPage />} />
                            </Route>
                            <Route
                                path="authenticate"
                                element={<LoginForm />}
                            />
                            <Route
                                path="not-found"
                                element={<NotFoundPage />}
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/not-found" />}
                            />
                        </Route>
                    </Routes>
                </AlertProvider>
            </AuthProvider>
        </BrowserRouter>
    </>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
