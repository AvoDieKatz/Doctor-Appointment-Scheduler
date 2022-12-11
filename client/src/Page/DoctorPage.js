import React from 'react';
import {useState} from 'react';
import {Grid, Typography, Divider} from '@mui/material';
import AppointmentDetail from '../Components/Doctor/AppointmentDetail';
import AppointmentList from '../Components/Doctor/AppointmentList';
import ReportForm from '../Components/Doctor/ReportForm';
import ReportAppointmentDetail from '../Components/Doctor/ReportAppointmentDetail';

const DoctorPage = () => {

    const [showExamination, setShowExamination] = useState(false);

    return (
        <Grid
            container
            flexDirection="column"
            sx={{
                padding: "5vh",
                "& .table-header": {
                    backgroundColor: "primary.main",
                },
                "& .table-header .MuiTypography-root": {
                    m: "16px 0",
                    textAlign: "center",
                    color: "primary.text",
                },
                "& .table-content": {
                    padding: "16px",
                },
                "& .table-content.table-content-main": {
                    display: "flex",
                    flexDirection: "column",
                    flex: "1 1 auto",
                },
            }}
        >
            <View
                showExamination={showExamination}
                setShowExamination={setShowExamination}
            />
        </Grid>
    );

};

const View = ({ showExamination, setShowExamination }) => {
    return (
        <>
            <Grid container flex="0 0 auto">
                <Grid xs={4} className="table-header">
                    {showExamination ? (
                        <Typography>PATIENT INFO</Typography>
                    ) : (
                        <Typography>APPOINTMENTS</Typography>
                    )}
                </Grid>
                <Grid xs={8} className="table-header">
                    {showExamination ? (
                        <Typography>EXAMINATION REPORT</Typography>
                    ) : (
                        <Typography>DETAIL</Typography>
                    )}
                </Grid>
            </Grid>
            <Grid container flex="1 1 auto">
                <Grid xs={4} className="table-content table-content-side">
                    {showExamination ? (
                        <ReportAppointmentDetail />
                    ) : (
                        <AppointmentList />
                    )}
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid xs={8} className="table-content table-content-main">
                    {showExamination ? (
                        <ReportForm
                            setShowExamination={setShowExamination}
                        />
                    ) : (
                        <AppointmentDetail
                            setShowExamination={setShowExamination}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default DoctorPage;
