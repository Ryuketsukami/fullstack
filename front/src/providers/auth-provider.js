import {createContext, useEffect, useState} from "react";
import useFetch from "../hooks/useFetch";
import {LogOut, Newspaper, Star, UserRoundCog, Users} from "lucide-react";

export const AuthContext = createContext(null)

export function AuthProvider ({children}){

    const { handleGoogle, loading, error } = useFetch(
        `${process.env.REACT_APP_BACK_URL}/users/signup`
    );

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [canSignOut, setCanSignOut] = useState(true);
    const [profileUser, setProfileUser] = useState();

    const doNothing = () =>{
    }
    const handleSignOut = () => {
        signOut();
    }

    const buttons = [
        ['My Posts', <Newspaper size={20} className='self-center' />, doNothing, "#"],
        ['Friends', <Users size={20} className='self-center' />, doNothing, "#"],
        ['Favorites', <Star size={20} className='self-center' />, doNothing, "#"],
        ['Profile', <UserRoundCog size={20} className='self-center' />, doNothing, ``],
        ['Logout', <LogOut size={20} className='self-center' />, handleSignOut, `#`]
    ]


    const signup = () => {
        if (window.google && process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID !== undefined) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
                callback: handleGoogle,
            });
        }
    }

    const fetchUser = async (user_id) =>{
        try{
            fetch(`${process.env.REACT_APP_BACK_URL}/users/${user_id}`)
                .then(response => response.json())
                .then((json) => {
                     setProfileUser(json);
                })
        } catch (error){
            console.error('There was a problem fetching user:', user_id, error);
        }
    }

    const setCurrentUser = (givenUser) => {
        setUser(givenUser);
    }

    const setCurrentProfileUser = (givenUser) => {
        setProfileUser(givenUser)
    }

    useEffect(() => {
        signup();
        const theUser = localStorage.getItem("user");

        if (theUser && !theUser.includes("undefined")) {
            setUser(JSON.parse(theUser));
        }
    }, []);

    const signOut = () => {
        if (canSignOut) {
            localStorage.removeItem('user');
            setUser(null);
        }

        if (!canSignOut && canSignOut !== undefined)
        {
            window.alert('Please finish editing to sign out!')
        }
    }

    const changeCanSignOutState = (state) =>{
        setCanSignOut(state);
    }

    const value = {
    user, signOut, changeCanSignOutState, setCurrentUser, loading, error, renderSignupButton, buttons, fetchUser, profileUser, setCurrentProfileUser
    }

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )

}

const renderSignupButton = () =>{
    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
        // type: "standard",
        theme: "filled_black",
        // size: "small",
        text: "continue_with",
        shape: "pill",
    });
}