import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {
    createTheme,
    ThemeProvider,
    StyledEngineProvider,
} from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Outlet } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#5cb25d",
            text: "#faf6ed",
        },
        neutral: {
            main: "#212121",
        },
        error: {
            main: "#cc0004",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: "#faf6ed",
                    backgroundColor: "#5cb25d",
                    "&:hover": {
                        backgroundColor: "#407d41",
                    },
                    "&.danger": {
                        backgroundColor: "#cc0004",
                    },
                    "&.danger:hover": {
                        backgroundColor: "#b30004",
                    },
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
                            <Grid
                                container
                                flexDirection="column"
                                sx={{
                                    padding: "4vh 0",
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
                                <Outlet />
                            </Grid>
                        </Container>
                        <Footer />
                    </ThemeProvider>
                </StyledEngineProvider>
            </CacheProvider>
        </div>
    );
}

export default App;
