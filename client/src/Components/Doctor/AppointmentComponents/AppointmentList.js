import React from "react";
import { useState } from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";

const data = [
    {
        id: 1,
        patient_name: "Tung",
        patient_gender: 1,
        patient_dob: new Date(1999, 11, 1),
        patient_contact: "0921241456",
        patient_dept: "dept1",
        patient_message: "I am not feeling good",
        isDone: false,
    },
    {
        id: 2,
        patient_name: "Tran",
        patient_gender: 1,
        patient_dob: new Date(1996, 3, 30),
        patient_contact: "0125256735",
        patient_dept: "dept1",
        patient_message: "I am not feeling good",
        isDone: true,
    },
    {
        id: 3,
        patient_name: "Meo",
        patient_gender: 0,
        patient_dob: new Date(2018, 6, 2),
        patient_contact: "0921206345",
        patient_dept: "dept1",
        patient_message: "I am not feeling good",
        isDone: false,
    },
    {
        id: 4,
        patient_name: "Hanh",
        patient_gender: 2,
        patient_dob: new Date(2001, 6, 8),
        patient_contact: "0521305968",
        patient_dept: "dept1",
        patient_message: "I am not feeling good",
        isDone: false,
    },
];

const calculateAge = (dob) => {
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
};

const translateGender = (code) => {
    switch (code) {
        case 0:
            return "Others";
        case 1:
            return "Male";
        case 2:
            return "Female";
        default:
            break;
    }
};

const AppointmentList = () => {
    const [openToday, setOpenToday] = useState(false);

    const handleClick = () => {
        setOpenToday(!openToday);
    };

    return (
        <List component="nav" disablePadding={true}>
            <ListItemButton
                onClick={handleClick}
                sx={{
                    p: 0,
                }}
            >
                <ListItemText primary="Today" />
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
                    {data.map((appointment) => {
                        var age = calculateAge(appointment.patient_dob);
                        var gender = translateGender(
                            appointment.patient_gender
                        );
                        var dataToSend = {
                            name: appointment.patient_name,
                            gender: gender,
                            age: age,
                            contact: appointment.patient_contact,
                            dept: appointment.patient_dept,
                            message: appointment.patient_message,
                        };
                        return (
                            <ListItemButton
                                key={appointment.id}
                                disabled={appointment.isDone}
                                component={Link}
                                to={`appointments/${appointment.id}`}
                                state={dataToSend}
                            >
                                <ListItemText
                                    primary={`${appointment.patient_name} - ${gender} - ${age}`}
                                    secondary={appointment.isDone ? `Examinated` : null}
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
