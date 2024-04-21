import {Fragment, useContext} from "react";
import { FormContext } from "../../providers/form-provider";
import { EditorContext } from "../../providers/editor-provider";

export function TextContent({ segment_data, content_id, componentDeleteHandle, inputWatcher }) {

    const { editing } = useContext(EditorContext);
    const { register } = useContext(FormContext);

    return (
        <Fragment>
            {
                editing ? (
                    <div className="flex flex-col justify-center  ">
                        <textarea
                            {...register(`${content_id}`, {
                                value: inputWatcher,
                            })}
                            className=" pl-2 pr-2 pt-3 min-h-full resize-none w-full h-60 outline outline-1 outline-gray-900 dark:caret-blue-500 dark:bg-black" />
                        <div className="flex flex-row justify-end">
                            <button className="ml-3 mt-2 mb-2 bg-red-800 pl-4 pr-4 pt-2 pb-2 text-white outline outline-1 outline-gray-900 rounded-lg"
                                    onClick={() => componentDeleteHandle(content_id)}>
                                delete
                            </button>
                        </div>
                    </div>
                ) : (
                    <pre>
                        <p className="whitespace-pre-wrap text-left" >
                            {segment_data}
                        </p>
                    </pre>
                )
            }

        </Fragment>
    );

}

