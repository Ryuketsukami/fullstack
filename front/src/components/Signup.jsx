
import React, {useContext, useEffect} from "react";
import useFetch from "../hooks/useFetch";
import {ThemeContext} from "../providers/theme-provider";

// https://developers.google.com/identity/gsi/web/reference/js-reference

const Signup = () => {
    const {darkMode} = useContext(ThemeContext);

    const { handleGoogle, loading, error } = useFetch(
        `${process.env.REACT_APP_BACK_URL}/users/signup`
    );

    useEffect(() => {
        /* global google */
        if (window.google && process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID !== undefined) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                callback: handleGoogle,
            });

            google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
                // type: "standard",
                theme: darkMode ? "filled_black" : "filled_white",
                // size: "small",
                text: "continue_with",
                shape: "pill",
            });

            // google.accounts.id.prompt()
        }
    }, [handleGoogle]);

    return (
        <>
            <main
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {error && <p style={{ color: "red" }}>{error}</p>}
                {loading ? (
                    <div>Loading....</div>
                ) : (
                    <div id="signUpDiv" data-text="signup_with"></div>
                )}
            </main>
        </>
    );
};

export default Signup;