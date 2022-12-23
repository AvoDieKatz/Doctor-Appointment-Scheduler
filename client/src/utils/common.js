// return the token from the session storage
export const getToken = () => {
    return localStorage.getItem("token") || null;
};

export const getUsername = () => {
    return localStorage.getItem("username") ?? null;
};

export const getUserRoles = () => {
    const stringRoles = localStorage.getItem("roles");
    return JSON.parse(stringRoles) || [];
};

// set the token and user from the session storage
export const setUserSession = (token, username, roles) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("roles", JSON.stringify(roles));
};

// remove the token and user from the session storage
export const removeUserSession = () => {
    localStorage.clear();
};
