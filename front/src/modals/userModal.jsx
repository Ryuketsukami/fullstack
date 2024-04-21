import Signup from "../components/Signup";
import {useContext} from "react";
import {ThemeContext} from "../providers/theme-provider";

const UserModal = ({modalOn, handleSetModalOn}) => {

    const {theme} = useContext(ThemeContext);

    return (
        <div> {modalOn &&
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center items-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-neutral-900">
                                <div className=" flex flex-col justify-center space-y-6 pt-3 pb-3 dark:bg-neutral-800 bg-stone-200">
                                    <h1>Sign Up or Log In</h1>
                                    <Signup />
                                </div>
                            </div>
                            <div className={`${theme.bg.tertiary.main} h-1`} />
                            <div className="bg-gray-50 dark:bg-neutral-950 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    onClick={()=>handleSetModalOn(false)}
                                    type="button"
                                    className={`mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2
                                        text-sm font-bold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 ${theme.bg.tertiary.main}
                                        sm:mt-0 sm:w-auto ${theme.button.hover}`}>
                                    <p className='dark:drop-shadow-[0_0.4px_0.8px_rgba(0,0,0,0.8)]'>
                                        Cancel
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </div>
    );
};

export default UserModal;