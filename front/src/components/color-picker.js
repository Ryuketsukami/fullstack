import {useContext, useState} from 'react';
import {ThemeContext} from "../providers/theme-provider";
import uuid4 from "uuid4";

export function ColorPicker({colorOpen}) {

    const {theme, listOfColors, handleColorChange} = useContext(ThemeContext);
    const [dropBox, setDropBox] = useState(false);

    return (
        <div>

            <div className='relative' onMouseLeave={()=>{setDropBox(false)}}>
                <button className={`w-[12px] hidden md:flex h-[12px] hover:outline-1 hover:outline-white hover:outline ${theme.bg.tertiary.main}`}
                        onMouseEnter={()=>{setDropBox(true);}}/>
                {colorOpen ?
                    <div className='space-x-2 flex flex-row md:hidden'>
                        { listOfColors.map((element) =>
                            <button className={`w-[36px] h-[36px] hover:outline-1 hover:outline-white hover:outline ${element.bg.tertiary.main}`}
                                    onClick={()=>handleColorChange(element)}
                                    key={uuid4()}
                            />)}
                    </div>
                    :
                    <p className='md:hidden'>
                        CHANGE THEME COLOR
                    </p>
                }
                {dropBox &&
                    <div className='absolute -bottom-[92px] right-0 dark:bg-neutral-800 bg-neutral-300 opacity-80 hidden
                       pt-4 mb-4 border-2 border-black pb-4 text-neutral-200 md:grid grid-cols-4 gap-4 w-max pr-4 pl-4'>

                        { listOfColors.map((element) =>
                            <button className={`w-[12px] h-[12px] hover:outline-1 hover:outline-white hover:outline ${element.bg.tertiary.main}`}
                                onClick={()=>handleColorChange(element)}
                                    key={uuid4()}
                        />)}

                    </div>
                }
            </div>
        </div>
    )
}

