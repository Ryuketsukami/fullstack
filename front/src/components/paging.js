import {NavHashLink as NavLink} from "react-router-hash-link";
import uuid4 from "uuid4";
import {useContext} from "react";
import {ThemeContext} from "../providers/theme-provider";

export function Paging({numOfPages, currentPage, category_meta_type, filter, type}) {

    const baseUrl = type === 'category' ? `/categories/${category_meta_type}` : `/posts/${filter}`
    const {theme} = useContext(ThemeContext);

    return (
        <div className="flex flex-row justify-center">
            {currentPage > 1 &&
                <NavLink to={`${baseUrl}/${currentPage-1}`}
                         key={uuid4()}
                    className={`${theme.text.myHover.tertiary} ${theme.text.myHover.dark.tertiary}
                          font-bold  dark:text-white`}>
                    <p className={`text-2xl`}>
                        {'<'}
                    </p>
                </NavLink>
            }
            <div className="pr-2 pl-2 dark:text-white font-medium text-2xl">
                {
                    [...Array(numOfPages)].map((page, index)=>{
                        if(index<currentPage-5 || index>currentPage+5){
                            return <div key={uuid4()}></div>
                        }
                        return (
                            <NavLink to={`${baseUrl}/${index+1}`}
                                 key={uuid4()}
                                 className={ currentPage===index+1 ?
                                     `pr-1.5 pl-1.5 ${theme.text.tertiary} underline-offset-2 underline` :
                                     `pr-1.5 pl-1.5 ${theme.text.myHover.tertiary} `
                                 }>
                                    {index+1}
                            </NavLink>
                        )}
                    )
                }
            </div>
            {currentPage < numOfPages &&
                <NavLink to={`${baseUrl}/${currentPage+1}`}
                         key={uuid4()}
                    className={`${theme.text.myHover.tertiary} ${theme.text.myHover.dark.tertiary}
                          font-bold  dark:text-white`}>
                    <p className={`text-2xl `}>
                        >
                    </p>
                </NavLink>
            }
        </div>
    );
}
