import React from "react";
import LoginForm from "../Components/Content/LoginForm";

const AuthenticationPage = ({setUser}) => {
    return <LoginForm setUser={setUser} />;
};

export default AuthenticationPage;