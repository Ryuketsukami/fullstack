import {ArticleCard} from "./article-card";
import uuid4 from "uuid4";
import { NavHashLink as Link } from 'react-router-hash-link';
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../providers/theme-provider";

export function ArticlesCluster(props) {
    const {section_name, section_list, section_meta_type} = props;
    const [currentList, setCurrentList] = useState([...section_list].slice(0,3));
    const {theme} = useContext(ThemeContext);

    useEffect(() => {
        setCurrentList([...section_list].slice(0,3));
    }, [section_list]);

    return (
        <div className=" pt-16 flex flex-col justify-center items-center">
            <div className="flex flex-row justify-between md:w-[600px] w-[350px] md:pr-0 md:pl-0">
                <h1 className="lg:text-xl md:text-sm text-xl font-bold text-gray-800 dark:text-gray-300">{section_name}</h1>
                <Link to={`/categories/${section_meta_type}/1#`} className={`p-1.5 pr-2.5 pl-2.5 outline outline-1 dark:outline-gray-200 outline-gray-900 rounded-md 
                    ${theme.bg.tertiary.main} ${theme.button.hover} dark:text-stone-100 
                    `}>
                    <p className="font-medium md:text-xs text-lg text-stone-700 dark:text-white dark:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">View all</p>
                </Link>
            </div>
            <div className="flex flex-col space-y-4 pt-8 pb-12 items-center">
                {
                    currentList.map((element, index) => <ArticleCard key={uuid4()} selection={element} flipped={index%2} />)
                }
            </div>
        </div>
    );
}