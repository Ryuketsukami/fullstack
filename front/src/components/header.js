import {useContext, useEffect, useState} from "react";
import {NavHashLink as NavLink} from "react-router-hash-link";
import {BlogContext} from "../providers/blog-provider";
import uuid4 from "uuid4";
import {ModeToggleButton} from "./mode-toggle-button";
import {useNavigate, useParams} from "react-router-dom";
import {UserButton} from "./user-button";
import {ThemeContext} from "../providers/theme-provider";
import {ColorPicker} from "./color-picker";
import {Menu, X} from "lucide-react";
import {AuthContext} from "../providers/auth-provider";

export function Header() {
    const { categories } = useContext(BlogContext);
    const {theme, toggleDarkMode} = useContext(ThemeContext);
    const {user, buttons, setCurrentProfileUser} = useContext(AuthContext);
    const { category_meta_type, filter_param} = useParams();

    // Burger icon refers to the icon you see instead of the normal buttons, when using the mobile version.
    // The buttons themselves have not been implemented, but we can toggle the state of the icon.
    const [burgerOn, toggleBurger] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setCurrentProfileUser(user);
        navigate(`/users/${user.userId}/1`);
    }

    const handleColorOpen = (statement) =>{
        setColorOpen(statement);
    }

    const burgerClick = () => {
        if(!burgerOn){
            handleColorOpen(false);
        }
        toggleBurger(!burgerOn);
    }

    useEffect(() => {
        toggleBurger(false);
    }, [category_meta_type]);

    return (
        <nav className='flex flex-row dark:bg-black bg-white mx-auto dark:text-white justify-between lg:pl-8 md:pl-6 pl-4 lg:pr-8 h-14 md:h-8 pr-4 sticky top-0 z-50'>
            <h1 className={`font-black text-xl md:text-md w-1/5 flex justify-center flex-col items-start ${theme.text.tertiary} drop-shadow-[0_0.4px_0.4px_rgba(0,0,0,0.8)]`}>
                <NavLink to="/" >
                    BLOG
                </NavLink>
            </h1>
            <div className="md:hidden flex">
                <button onClick={() => {
                    burgerClick()
                }}>
                    {burgerOn ? <X size={40} /> :
                        <Menu size={40} />
                    }
                </button>
                {burgerOn && (
                    <div className='w-screen h-screen dark:bg-black bg-stone-300 opacity-95 absolute -right-0 top-14 flex flex-col justify-between items-center font-bold'>
                        <div className='w-screen space-y-1.5 pr-2 pl-2'>
                            {
                                categories.map( category =>
                                    <div key={uuid4()}>
                                        <NavLink to={`/categories/${category.meta_type}/1`}

                                                 className={ category_meta_type === category.meta_type ?
                                                     `${theme.text.tertiary} underline-offset-2 underline ` : theme.text.myHover.tertiary }>
                                            <p className={`dark:bg-neutral-800 bg-stone-100 opacity-100 w-full h-16 ${theme.outline.tertiary}
                                                flex justify-center items-center`}>
                                                {category.title.toUpperCase()}
                                            </p>
                                        </NavLink>
                                    </div>
                                )
                            }
                            <div>
                                <NavLink
                                    to="/posts/unfiltered/1"
                                    className={ filter_param !== undefined ?
                                        `${theme.text.tertiary} underline-offset-2 underline` : theme.text.myHover.tertiary }>
                                    <p className={`dark:bg-neutral-800 bg-stone-100 opacity-95 w-full h-16 ${theme.outline.tertiary}
                                        flex justify-center items-center`}>
                                        POSTS
                                    </p>
                                </NavLink>
                            </div>
                            {
                                user?
                                    (
                                        buttons.map(element=>(
                                            <div className={`dark:bg-neutral-800 bg-stone-100 opacity-95 w-full space-x-2
                                                    h-16 ${theme.outline.tertiary} flex justify-center items-center font-bold ${theme.text.myHover.tertiary}
                                                    ${element[0]==='Logout' && 'text-red-700'}
                                                    `}
                                                 onClick={element[0] === 'Profile' ?
                                                     ()=>handleProfileClick()
                                                     :()=>element[2]()}
                                                 key={uuid4()}
                                            >
                                                <p>{element[0].toUpperCase()}</p>
                                                {element[1]}
                                            </div>
                                        ))
                                    )
                                    :
                                    <button
                                        className={`dark:bg-neutral-800 bg-stone-100 opacity-95 w-full disabled:hidden peer relative z-40
                                            h-16 ${theme.outline.tertiary} flex justify-center items-center ${theme.text.myHover.tertiary}`}
                                    >
                                        <UserButton handleProfileClick={handleProfileClick} />
                                    </button>
                            }
                        </div>
                        <div className={`sticky max-w-screen-sm bottom-2 pl-2 pr-2 flex flex-col w-full justify-between space-y-2`}>
                            <div className={`dark:bg-neutral-800 bg-stone-100 opacity-95 w-full z-10
                                h-16 ${theme.outline.tertiary} flex justify-center items-center ${theme.text.myHover.tertiary}`}
                                 onClick={toggleDarkMode}
                            >
                                <ModeToggleButton />
                            </div>
                            <div className={`dark:bg-neutral-800 bg-stone-100 opacity-95 w-full -z-40
                                h-16 ${theme.outline.tertiary} flex justify-center items-center ${theme.text.myHover.tertiary}`}
                                 onClick={()=>handleColorOpen(true)}
                            >
                                <ColorPicker colorOpen={colorOpen} />
                            </div>
                        </div>
                    </div>


                )}
            </div>
            <div className="hidden md:flex justify-center items-center space-x-5 md:text-sm flex-grow font-medium">
                {
                    categories.map( category =>
                        <NavLink to={`/categories/${category.meta_type}/1`}
                                 key={uuid4()}
                                 className={ category_meta_type === category.meta_type ?
                                     `${theme.text.tertiary} underline-offset-2 underline` : theme.text.myHover.tertiary }>
                            {category.title.toUpperCase()}
                        </NavLink>
                    )
                }
                <NavLink
                    to="/posts/unfiltered/1"
                    className={ filter_param !== undefined ?
                        `${theme.text.tertiary} underline-offset-2 underline` : theme.text.myHover.tertiary }>
                    POSTS
                </NavLink>
            </div>
            <div className='hidden md:flex flex-row space-x-3 w-1/5 justify-end items-center'>
                <ColorPicker />
                <UserButton handleProfileClick={handleProfileClick} />
                <ModeToggleButton />
            </div>
        </nav>
    );
}
