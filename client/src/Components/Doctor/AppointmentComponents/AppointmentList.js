import React, { useEffect } from "react";
import { useState } from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../../utils/api";
import {
    calculateAge,
    getUsername,
    translateGender,
} from "../../../utils/common";
import { useAlert } from "../../../context/AlertContext";

const AppointmentList = () => {
    const [openToday, setOpenToday] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const { handleFailure, setMessage } = useAlert();
    const username = getUsername();

    const handleClick = () => {
        setOpenToday(!openToday);
    };

    useEffect(() => {
        api.get(`/api/appointments/assigned/${username}`)
            .then((res) => {
                setAppointments(res.data);
            })
            .catch((err) => {
                setMessage(
                    "Something went wrong when getting your appointments"
                );
                handleFailure();
            });
    }, []);

    return (
        <List component="nav" disablePadding={true}>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    p: 0,
                }}
            >
                <ListItemText primary="Your appointments" />
                {openToday ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openToday} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding={true}
                    sx={{
                        "& .MuiListItemButton-root": {
                            p: "0 0 0 1rem",
                        },
                    }}
                >
                    {appointments.map((appointment) => {
                        var age = calculateAge(appointment.patientDob);
                        var gender = translateGender(appointment.patientGender);
                        return (
                            <ListItemButton
                                key={appointment.id}
                                disabled={appointment.done}
                                component={Link}
                                to={`appointments/${appointment.id}`}
                            >
                                <ListItemText
                                    primary={`${appointment.patientName} - ${gender} - ${age}`}
                                    secondary={
                                        appointment.done ? `Examinated` : null
                                    }
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Collapse>
        </List>
    );
};

export default AppointmentList;
