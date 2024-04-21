import {PageTitle} from "../components/page-title";
import {FilteredPosts} from "../components/filtered-posts";
import {MakePostModal} from "../modals/makePostModal";
import {useContext, useState} from "react";
import {AuthContext} from "../providers/auth-provider";
import {ThemeContext} from "../providers/theme-provider";

export function PostPage() {

    const {user} = useContext(AuthContext);
    const [modalOn, setModalOn] = useState(false);
    const {theme} = useContext(ThemeContext);

    const handleSetModalOn = (state) => {
        setModalOn(state);
    }

    const title = {
            title: "Posts",
            content: "Search for posts or post something cool!",
            isHome: ''
        };

    return (
        <div className='min-h-fit'>
            <PageTitle {...title} />
            <div className="bg-gray-100 dark:bg-neutral-900">
                <FilteredPosts />
                {user ? (
                    <div className='pb-12'>
                        <button
                            onClick={()=>handleSetModalOn(true)}
                            type="button"
                            className={`mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2
                                            text-sm font-bold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300
                                            sm:mt-0 sm:w-auto  ${theme.button.hover} ${theme.bg.tertiary.main}`}>
                            <p className='dark:drop-shadow-[0_0.4px_0.8px_rgba(0,0,0,0.8)]'>
                                Create a post!
                            </p>
                        </button>
                        <MakePostModal modalOn={modalOn} handleSetModalOn={handleSetModalOn} />
                    </div>

                ):(
                    <div>
                        <h1 className="font-bold text-4xl pb-28 text-red-700">
                            To create a post, please sign in at the top!
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
}
