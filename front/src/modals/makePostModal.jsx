import {useContext, useEffect, useRef, useState} from "react";
import {ThemeContext} from "../providers/theme-provider";
import {BlogContext, getDate} from "../providers/blog-provider";
import {AuthContext} from "../providers/auth-provider";
import uuid4 from "uuid4";
import {useNavigate} from "react-router-dom";
import {ArticleCard} from "../components/article-card";

export function MakePostModal({modalOn, handleSetModalOn}) {

    const {theme} = useContext(ThemeContext);
    const { categories, addNewPost } = useContext(BlogContext);
    const {user} = useContext(AuthContext);

    const srcInputRef = useRef(null);
    const [uniqueId] = useState(uuid4().replace(/\W/g, ''));

    const [titleValue, setTitleValue] = useState('');
    const [contentValue, setContentValue] = useState('');
    const [typeValue, setTypeValue] = useState(categories[0].title);
    const [categoryOptions] = useState(categories.map(category => <option key={uuid4()} value={category.title}>{category.title}</option>));
    const [urlValue, setUrlValue] = useState('');

    const [submitted, setSubmitted] = useState(false)
    const navigate = useNavigate();

    const onSubmitData = (event) => {
        event.preventDefault();
        const newPost = {
            type:typeValue,
            meta_type: typeValue.toLowerCase().split(' ').join('-'),
            date: new Date().getTime(),
            creator_id: user.userId,
            post_id: uniqueId,
            title:titleValue,
            preview_content:contentValue,
            thumbnail_src:urlValue,
            full_image:urlValue,
            content: []
        }
        addNewPost(newPost);

        setSubmitted(true);
    }

    useEffect(() => {
        if (submitted){
            navigate(`/posts/${uniqueId}#`);
        }
    }, [submitted, navigate, uniqueId]);

    const onTitleChange = (event) => {
        setTitleValue(event.target.value);
    }

    const onContentChange = (event) => {
        setContentValue(event.target.value);
    }

    const onTypeChange = (event) => {
        setTypeValue(event.target.value);
    }

    const onUrlChange = (event) => {

        // We will only start showing a picture to the user if it meets certain criteria based on the regex.
        // This regex is not perfect and can be circumvented, therefore we have a function to take care of it in case it fails.
        // That function lies within the article-card
        const urlImageRegex = /(https?:\/\/.*\.(?:png|jpg|webp))/i;
        if(urlImageRegex.test(srcInputRef?.current?.value)){
            setUrlValue(event.target.value);
        }
    }

    // These following two constants are in charge of the preview of the article card per re-render.
    // We need to re-render the card every time we do any change in the form because we want to see how it would look.
    const selection ={
        date: getDate(new Date().getTime()),
        title: titleValue,
        preview_content: contentValue,
        thumbnail_src: urlValue,
        post_id: -1,
    }
    const previewCard = <ArticleCard disabled={true} selection={selection} />

    return (
        <div> {modalOn &&
            <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={()=>handleSetModalOn(false)} />
                <form onSubmit={onSubmitData} >
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full justify-evenly p-4 text-center items-center sm:p-0 lg:flex-row flex-col                                                 ">
                            <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-neutral-900">
                                    <div className=" flex flex-col justify-center space-y-6 pt-3 pb-3 dark:bg-neutral-800 bg-stone-200">
                                        <div className="flex flex-col justify-center space-y-10 items-center ">

                                                <select onChange={onTypeChange} className="w-36 h-8 outline outline-2 outline-gray-900" id="type" name="type">
                                                    {
                                                        categoryOptions
                                                    }
                                                </select>
                                                <textarea required onChange={onTitleChange}
                                                          className="p-3 bg-white h-18 w-96 outline outline-2 outline-gray-900"
                                                          id="title" name="title" placeholder="title" maxLength="100" />
                                                <textarea required onChange={onContentChange}
                                                          className="p-3 pt-2 h-18 w-96 outline outline-2 outline-gray-900 whitespace-normal"
                                                          id="preview_content" name="preview_content" placeholder="post card text" maxLength="250" />
                                                <input required onChange={onUrlChange}
                                                       className="p-3 outline outline-2 w-96 outline-gray-900" id="thumbnail_src"
                                                       name="thumbnail_src" placeholder="thumbnail url" type="url" ref={srcInputRef} />

                                                <input className={`mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2
                                            text-sm font-bold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 ${theme.bg.tertiary.main}
                                            sm:mt-0 sm:w-auto ${theme.button.hover}`}
                                                       value="Create!"
                                                       type="submit"/>

                                        </div>
                                    </div>
                                </div>
                                <div className={`${theme.bg.tertiary.main} h-1`} />
                                <div className="bg-gray-50 dark:bg-neutral-950 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        onClick={()=>handleSetModalOn(false)}
                                        type="button"
                                        className={`mt-3 inline-flex w-full justify-center rounded-md  px-3 py-2
                                            text-sm font-bold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:bg-neutral-800
                                            sm:mt-0 sm:w-auto ${theme.button.hover}`}>
                                        <p className='dark:drop-shadow-[0_0.4px_0.8px_rgba(0,0,0,0.8)]'>
                                            Cancel
                                        </p>
                                    </button>
                                </div>
                            </div>
                            <div>
                                {previewCard}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        }
        </div>
    );
}

//{previewCard}