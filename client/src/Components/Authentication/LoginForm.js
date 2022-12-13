import React from "react";
import { useState } from "react";
import {
    Container,
    Grid,
    Box,
    InputAdornment,
    IconButton,
    TextField,
    Stack,
    Typography,
    Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    username: yup.string().required("Please enter your username"),
    password: yup.string().required("Please enter your password").min(8),
});

const PasswordField = ({
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid, error },
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <TextField
            inputRef={ref}
            id="password"
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            error={invalid}
            helperText={error?.message}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

const LoginForm = ({ setUser }) => {
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleSetUser = (user) => {
        setUser(user);
    };

    return (
        <Container sx={{ marginTop: "32px" }}>
            <Button value="Tung" onClick={(e) => handleSetUser(e.target.value)}>
                Set User Tung
            </Button>
            <Button onClick={(e) => handleSetUser(null)}>Log out</Button>
            <Grid container>
                <Grid
                    xs
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            minWidth: "20vw",
                            maxWidth: "80vw",
                            "& .MuiButton-root": {
                                width: "100%",
                            },
                            "& .MuiTypography-root": {
                                color: "primary.main",
                            },
                        }}
                    >
                        <Stack spacing={3} mt={2}>
                            <Typography
                                align="center"
                                sx={{
                                    fontSize: "62px",
                                    fontWeight: "500",
                                }}
                            >
                                LOGIN
                            </Typography>

                            <Controller
                                name="username"
                                control={control}
                                render={({
                                    field,
                                    fieldState: { invalid, error },
                                }) => (
                                    <TextField
                                        {...field}
                                        id="username"
                                        label="Username"
                                        type="text"
                                        fullWidth
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={invalid}
                                        helperText={error?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <PasswordField
                                        fieldState={fieldState}
                                        field={field}
                                    />
                                )}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: "16px" }}
                            >
                                LOGIN
                            </Button>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginForm;
