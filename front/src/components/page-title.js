import {useContext} from "react";
import {ThemeContext} from "../providers/theme-provider";

export function PageTitle({title, content}) {
    const {theme} = useContext(ThemeContext);

    return (
        <div className={`dark:bg-neutral-900 bg-stone-100`}>
            <hr className={`${theme.shadow.tertiary} bg-gray-200 border-0 dark:bg-gray-700 `}/>
            <div className='pt-12  lg:ml-60 lg:mr-60 md:pr-14 md:pl-14 pl-6 pr-6'>
                <h1 className={`${theme.text.tertiary} md:text-6xl text-4xl font-extrabold pb-4 text-sh drop-shadow-[0_0.4px_0.4px_rgba(0,0,0,0.8)]`}  >
                    {title?.toUpperCase()}
                </h1>
                <p className="pt-0 bg-clip-text font-medium text-gray-600 md:text-lg text-2xl dark:text-neutral-400">
                    {content}
                </p>
            </div>
        </div>

    );
}