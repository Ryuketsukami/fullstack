import {useContext, useState} from "react";
import UserModal from "../modals/userModal";
import {AuthContext} from "../providers/auth-provider";
import {ThemeContext} from "../providers/theme-provider";
import uuid4 from "uuid4";

export function UserButton({handleProfileClick}) {
    const [modalOn, setModalOn] = useState(false);
    const {user, buttons} = useContext(AuthContext);
    const {theme} = useContext(ThemeContext);

    const handleSetModalOn = (state) => {
        setModalOn(state);
    }

    return (
        <div className='flex items-center'>
            {user && user.picture ?
                <div className='relative'>
                    <div className="flex flex-col justify-center peer">
                        <button className={`border-2 overflow-hidden ${theme.border}`}>
                            <img className='w-6' src={user.picture} referrerPolicy="no-referrer" alt='user profile pic' />
                        </button>
                    </div>
                    <div className='absolute hidden md:peer-hover:flex md:hover:flex -bottom-18 right-0 rounded-md dark:bg-neutral-800 bg-neutral-300 opacity-95
                     flex-col space-y-2 pt-4 mb-4 border-2 border-black pb-4 text-neutral-200 transition-transform
                     '>
                        {
                            buttons.map(element=>(
                                <button
                                    className={`dark:bg-neutral-900 bg-neutral-100 hover:bg-neutral-200 mx-4 rounded-md py-1.5 flex flex-row px-4 justify-between space-x-2 whitespace-nowrap
                                        text-black dark:text-white border-neutral-400 border-2 dark:border-0 hover:dark:bg-neutral-950 
                                        ${theme.text.myHover.tertiary} ${theme.text.myHover.dark.tertiary}
                                        + ${element[0]==='Logout'?
                                        ' dark:bg-red-800 hover:dark:bg-red-950 bg-red-600 hover:bg-red-700 ':
                                        ' dark:bg-neutral-900 bg-neutral-100 hover:bg-neutral-200 '}`}
                                    onClick={element[0] === 'Profile' ?
                                        ()=>handleProfileClick()
                                        :()=>element[2]()}
                                    key={uuid4()}
                                >
                                    <p>{element[0]}</p>
                                    {element[1]}
                                </button>
                            ))
                        }
                    </div>
                </div>
                :
                <button onClick={()=>handleSetModalOn(true)}>
                    <h1 className={`${theme.text.myHover.tertiary} md:text-sm font-medium  `}>
                        LOGIN/SIGNUP
                    </h1>
                </button>
            }
            {modalOn && <UserModal modalOn={modalOn} handleSetModalOn={handleSetModalOn} />}
        </div>
    );
}
