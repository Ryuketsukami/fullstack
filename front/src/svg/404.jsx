import {useContext} from "react";
import {ThemeContext} from "../providers/theme-provider";

export function ErrorImage() {
    const {theme} = useContext(ThemeContext);

    return (
        <img className={theme.rotation} src='https://i.imgur.com/mztuAcO.png' alt='404 page not found'></img>
    );
}