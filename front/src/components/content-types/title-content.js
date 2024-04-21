import { Fragment, useContext } from "react";
import { FormContext } from "../../providers/form-provider";
import { EditorContext } from "../../providers/editor-provider";
import {ThemeContext} from "../../providers/theme-provider";

export function TitleContent({ segment_data, content_id, componentDeleteHandle, inputWatcher }) {

    const { editing } = useContext(EditorContext);
    const { register, errors } = useContext(FormContext);
    const { theme } = useContext(ThemeContext)

    return (
        <Fragment>
            {
                editing ? (
                    <div className="flex flex-col justify-center">
                        <div className='flex flex-row justify-center'>
                            <div className={`w-4 mr-2 ${theme.bg.tertiary.main}`}/>
                            <textarea
                                {...register(`${content_id}`, {
                                    value: inputWatcher,
                                    required: `You've left an empty title! please make sure you fill all the components.`,
                                    // The title being of size 1 is fine by me.
                                    minLength: {
                                        value: 1,
                                        message: `You've left an empty title! please make sure you fill all the components.`
                                    },
                                })}
                                className="pl-0.5 text-2xl font-bold overflow-ellipsis overflow-x-hidden resize-y min-h-full w-full dark:caret-blue-500 dark:bg-black" />
                            {errors?.displayName && (
                                <label className="text-red-950 bg-title-red m-4 p-4">{String(errors.displayName.message)}</label>
                            )}

                        </div>
                        <div className="flex flex-row justify-end">
                            <button className="ml-3 mt-2 mb-2 bg-red-800 pl-4 pr-4 pt-2 pb-2 text-white outline outline-1 outline-gray-900 rounded-lg"
                                    onClick={() =>componentDeleteHandle(content_id)}>
                                delete
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-row justify-start text-left'>
                        <div className={`w-4 mr-2 ${theme.bg.tertiary.main}`}></div>
                        <p className="text-2xl font-bold overflow-ellipsis overflow-x-hidden">
                            {segment_data}
                        </p>
                    </div>
                )
            }
        </Fragment>
    );

}

