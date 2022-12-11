import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import PatientPage from "./Page/PatientPage";
import AuthenticationPage from "./Page/AuthenticationPage";
import DoctorPage from "./Page/DoctorPage";


const theme = createTheme({
    palette: {
        primary: {
            main: "#5cb25d",
            text: "#faf6ed",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#faf6ed",
                },
            },
        },
    },
});

const cache = createCache({
    key: "css",
    prepend: true,
});

function App() {
    const [user, setUser] = useState(null);

    return (
        <div id="App">
            <CacheProvider value={cache}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <Header user={user} />
                        <Container id="content">
                            {/* <PatientPage /> */}
                            {/* <AuthenticationPage setUser={setUser} /> */}
                            <DoctorPage />
                        </Container>
                        <Footer />
                    </ThemeProvider>
                </StyledEngineProvider>
            </CacheProvider>
        </div>
    );
}

export default App;
