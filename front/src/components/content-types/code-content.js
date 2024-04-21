import {Fragment, useContext} from "react";
import {EditorContext} from "../../providers/editor-provider";
import {FormContext} from "../../providers/form-provider";
import { sunburst, nnfx } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from "react-syntax-highlighter";
import {ThemeContext} from "../../providers/theme-provider";

export function CodeContent({ selected_language, code, content_id, componentDeleteHandle, inputWatcher }) {

    const { editing } = useContext(EditorContext);
    const { register } = useContext(FormContext);
    const { darkMode } = useContext(ThemeContext);

    const validSelectedLanguage = selected_language ? selected_language : 'javascript';



    return (
        <Fragment>
            {
                editing ? (
                    <div className="flex flex-col justify-center">
                        <div className="object-contain flex justify-center items-center">
                        </div>
                        <div className="flex flex-row justify-between">
                            <textarea
                                {...register(`${content_id}`, {
                                    value: inputWatcher,
                                })}
                                className="pr-2 pl-2 pt-3 min-h-full resize-none w-full h-60 outline outline-1 outline-gray-900 dark:caret-blue-500 dark:bg-black" />
                            <div className="flex flex-row justify-end">
                                <button className="ml-3 mt-2 mb-2 bg-red-800 pl-4 pr-4 pt-2 pb-2 text-white outline outline-1 outline-gray-900 rounded-lg"
                                        onClick={() => componentDeleteHandle(content_id)}>
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-left bg-red-800 text-xs">
                        <SyntaxHighlighter language={validSelectedLanguage} style={darkMode ? sunburst : nnfx}>
                            {code}
                        </SyntaxHighlighter>
                    </div>
                )
            }
        </Fragment>
    );

}

