import {memo, useContext} from 'react';
import {ThemeContext} from "../providers/theme-provider";

export const Footer = memo( function Footer() {

    const device = 'desktop'
    const {theme} = useContext(ThemeContext);

    if (device === 'desktop'){
        return (
            <div>
                <hr className={`${theme.shadow.tertiary} bg-gray-200 border-0 dark:bg-gray-700`}/>
                <div className="dark:bg-neutral-950 bg-white">

                    <div className="hidden md:block">
                        <div className=" justify-center flex flex-col overflow-x-hidden dark:divide-y dark:divide-neutral-500">
                            <div className="pt-10 pb-12 lg:ml-96 lg:mr-96">
                                <h1 className={`${theme.text.tertiary} pb-4 text-2xl font-bold`}>
                                    Contact
                                </h1>
                                <p className={`text-gray-600 text-center dark:text-neutral-300`}>
                                    Leave your email and I will contact you.
                                </p>
                                <form className="pt-6 flex flex-row justify-center">
                                    <input className="pl-4 outline outline-1 outline-gray-300 rounded-l-md h-10 w-60 text-xs
                                        placeholder:text-xs dark:placeholder:text-black"
                                           placeholder="Email address" />
                                    <button className={`${theme.bg.tertiary.main} ${theme.button.hover} dark:text-white text-xs h-10 outline outline-1 outline-gray-900 w-28 rounded-r-md`}>
                                        <p className='text-md dark:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] font-medium'>
                                            Send
                                        </p>
                                    </button>
                                </form>
                            </div>
                            <hr className="dark:hidden" />
                            <div className="pt-10 pb-10">
                                <p className="text-xs dark:text-neutral-500">Copyright 2023 - Allan Perez Feldman</p>
                            </div>
                        </div>
                    </div>
                    <div className="md:hidden dark:divide-y dark:divide-neutral-500">
                        <div className="pt-10 pb-10 lg:ml-96 lg:mr-96 flex flex-col justify-center">
                            <h1 className={`${theme.text.tertiary} pb-4 text-2xl font-bold`}>Contact</h1>
                            <p className="text-gray-600 mr-14 ml-14 text-center font-medium text-sm dark:text-neutral-300">
                                Leave your email and I will contact you.
                            </p>
                            <form className=" pt-6 flex flex-col justify-center pl-4 pr-4 space-y-3">
                                <input className="pl-4 pt-4 pb-4 outline outline-1 outline-gray-300 rounded-md text-xs
                                        placeholder:text-xs"
                                       placeholder="Email address" />
                                <button className={`${theme.button.hover} pt-4 pb-4 ${theme.bg.tertiary.main} dark:text-white text-xs outline outline-1 outline-gray-900 rounded-md `}>
                                    <p className='text-md dark:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)] font-medium'>
                                        Subscribe
                                    </p>
                                </button>
                            </form>
                        </div>
                        <hr className="dark:hidden" />
                        <div className="pt-5 pb-5">
                            <p className="text-xs dark:text-neutral-500">Copyright 2023 - Allan Perez Feldman</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

})