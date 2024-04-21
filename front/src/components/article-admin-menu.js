import {Fragment, useContext} from "react";
import {AuthContext} from "../providers/auth-provider";
import {EditorContext} from "../providers/editor-provider";
import {ThemeContext} from "../providers/theme-provider";

export function ArticleAdminMenu({current_creator_id, handleCancelClick, handleEditClick}) {
    const { user } = useContext(AuthContext);
    const { editing } = useContext(EditorContext);
    const { theme } = useContext(ThemeContext);

    const creator_id = current_creator_id

    return (
        <div className="fixed bottom-0 left-0 right-0">
            {
                ((user?.userId === creator_id && creator_id !== undefined) || user?.role === 'admin') && (
                    <div className="h-12 bg-white dark:bg-neutral-800 flex-row flex justify-end outline outline-1 outline-gray-900 mr-4 ml-4 rounded-t-lg mt-4 pr-4 pl-4 opacity-75">
                        {editing ? (
                            <>
                                <input type="submit" className="text-white bg-green-600 cursor-pointer rounded-lg mt-3 mb-3 pr-4 pl-4" value="Save" />
                                <button onClick={handleCancelClick} className="text-white bg-red-800 rounded-lg ml-4 mt-3 mb-3 pr-4 pl-4">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={handleEditClick} className={`${theme.bg.tertiary.main} ${theme.button.hover} mt-3 mb-3 pr-4 pl-4 rounded-md outline outline-1 outline-gray-900 text-white `}>
                                <p className='drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]'>
                                    Edit
                                </p>
                            </button>
                        )}
                    </div>
                )
            }
        </div>
    );
}
