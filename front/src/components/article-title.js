import {getDate} from "../providers/blog-provider";
import {useContext} from "react";
import {ThemeContext} from "../providers/theme-provider";

export function ArticleTitle({title, date, type, picUrl}) {

    const {theme} = useContext(ThemeContext);

    return (
    <div className={`dark:bg-neutral-900 bg-stone-100 relative pb-16 overflow-x-hidden`}>
        <div className="relative bg-cover bg-no-repeat bg-center h-screen items-center flex justify-center" style={{backgroundImage: `url(${picUrl})`, }}>
            <hr className={`${theme.shadow.tertiary} border-0`}/>

            <div className=' mb-20 relative'>
                <hr className={`shadow-[#000000_0px_0px_500px_70px] border-0 top-10 z-0 absolute w-full`}/>
                <h1 className={`${theme.text.tertiary} md:text-6xl text-5xl font-extrabold pb-4 text-sh drop-shadow-[0_0.4px_0.4px_rgba(0,0,0,0.8)]`}>
                    {title.toUpperCase()}
                </h1>
                <p className="pt-0 pr-1 text-sm font-medium text-gray-100 drop-shadow-[0_0.4px_0.4px_rgba(0,0,0,0.8)]">
                    {getDate(date)+' • ' + type}
                </p>
            </div>
        </div>


    </div>
    );
}
// pr-24 pl-24