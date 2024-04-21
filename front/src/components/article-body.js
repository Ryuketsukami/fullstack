import {useContext, useEffect} from "react";
import {TextContent} from "./content-types/text-content";
import {TitleContent} from "./content-types/title-content";
import {UrlImgContent} from "./content-types/url-img-content";
import {EditorContext} from "../providers/editor-provider";
import {AuthContext} from "../providers/auth-provider";
import {FormContext} from "../providers/form-provider";
import uuid4 from "uuid4";
import {ArticleAdminMenu} from "./article-admin-menu";
import {BlogContext} from "../providers/blog-provider";
import {useNavigate} from "react-router-dom";
import {ThemeContext} from "../providers/theme-provider";
import {UrlVideoContent} from "./content-types/url-video-content";
import {CodeContent} from "./content-types/code-content";

// This following body component takes care of rendering the whole content of an article plus the edit state when we are editing.
// Currently, there is no feature to edit the main image and the title, we could do that, but we already did enough with the content editing, and it is the same concept.
// Known issue:
//      - when cancelling while editing, the cancel will work, however, when you go to edit again, the input field will be filled with the cancelled text as initial input (currently this issue is plastered with navigate, it helps with it but doesn't fix the underlying problem)
export function ArticleBody(props) {
    const { post } = props;
    const { user, changeCanSignOutState } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    const { replacePostWithEdited, fixFilter } = useContext(BlogContext);

    const { setEditing, setCancelled, editing,
        setContents, removeContentById, resetContents, currentContent, addContentWithWatcher } = useContext(EditorContext);

    const { handleSubmit, watch, reset } = useContext(FormContext);

    const navigate = useNavigate();

    // A list to keep all our watchers, we want it to not be a useState, so it won't re-render all the components if we edit
    // This can't be replaced by watch() without inputs.
    let watcherList = [];

    const componentDeleteHandle = (id) => {
        watcherList = watcherList.filter( (obj) => obj.content_id !== id);
        setContents(watcherList);
        removeContentById(id);
    }

    // This function is called when we map our content list to components.
    // Each array is translated to a component to be rendered.
    const ParseAndConvert = (current_obj) => {
        const type = current_obj.type;
        const data = current_obj.data;
        const id = current_obj.content_id;
        const key = `${id}`;

        const inputWatcher = watch(`${id}`, data);

        if (type === 'title'){

            watcherList.push({
                data:inputWatcher,
                type,
                content_id:id
            });

            return <TitleContent
                key={key}
                content_id={id}
                inputWatcher={inputWatcher}
                segment_data={data}
                componentDeleteHandle={componentDeleteHandle}
            />;
        }

        if (type === 'text'){

            watcherList.push({
                data:inputWatcher,
                type,
                content_id:id
            });

            return <TextContent
                key={key}
                content_id={id}
                inputWatcher={inputWatcher}
                segment_data={data}
                componentDeleteHandle={componentDeleteHandle}
            />;
        }

        if (type === 'src'){

            watcherList.push({
                data:inputWatcher,
                alt:current_obj?.alt,
                type,
                content_id:id
            });

            return <UrlImgContent
                key={key}
                content_id={id}
                inputWatcher={inputWatcher}
                segment_src={data}
                segment_alt={current_obj?.alt}
                componentDeleteHandle={componentDeleteHandle}
            />;
        }

        if (type === 'videoUrl'){

            watcherList.push({
                data:inputWatcher,
                alt:current_obj?.alt,
                type,
                content_id:id
            });

            return <UrlVideoContent
                key={key}
                content_id={id}
                inputWatcher={inputWatcher}
                segment_src={data}
                componentDeleteHandle={componentDeleteHandle}
            />;
        }

        if (type === 'code'){

            watcherList.push({
                data:inputWatcher,
                alt:current_obj?.alt,
                type,
                content_id:id
            });

            return <CodeContent
                key={key}
                content_id={id}
                inputWatcher={inputWatcher}
                code={data}
                selected_language={current_obj.alt}
                componentDeleteHandle={componentDeleteHandle}
            />;
        }

        return (<></>);
    }


    // The 3 following functions add the component to the list that is being mapped, in order to re-render.
    const addTitleComponent = (element) => {
        element.preventDefault();
        const newContent = {
            type:'title',
            data:'',
            content_id:uuid4()
        }
        addContentWithWatcher(watcherList, newContent);

        watcherList = [];
        reset();
    };

    const addTextComponent = (element) => {
        element.preventDefault();
        const newContent = {
            type:'text',
            data:'',
            content_id:uuid4()
        }
        addContentWithWatcher(watcherList, newContent);

        watcherList = [];
        reset();
    };

    const addUrlComponent = (element) => {
        element.preventDefault();
        const newContent = {
            type:'src',
            data:'https://i.imgur.com/yd01iL2.jpeg',
            alt:'default-alt',
            content_id:uuid4()
        }
        addContentWithWatcher(watcherList, newContent);

        watcherList = [];
        reset();
    };

    const addCodeComponent = (element) =>{
        element.preventDefault();
        if(element.target.value !== 'none'){
            const newContent = {
                type:'code',
                data:'',
                alt:element.target.value,
                content_id:uuid4()
            }
            addContentWithWatcher(watcherList, newContent);

            watcherList = [];
            reset();
        }
    }

    const addVideoUrlComponent = (element) => {
        element.preventDefault();
        const newContent = {
            type:'videoUrl',
            data:'https://www.youtube.com/embed/NSmukdqyvjU',
            content_id:uuid4()
        }
        addContentWithWatcher(watcherList, newContent);

        watcherList = [];
        reset();
    };

    const handlePostSubmit = () => {
        // This updates the posts themselves.
        const new_post = {...post, content: watcherList};
        replacePostWithEdited(new_post);

        // This updates what we render and see.
        setContents(watcherList);

        // This resets all the registered input fields just in case.
        reset();

        // We get out of the edit mode, and we render the normal components instead of the input ones.
        setEditing(false);

        // We want the user to be able to sign out now.
        changeCanSignOutState(true);

        // It feels weird to submit and get teleported to some arbitrary part off the form.
        // This will ensure we will go to the top of the page.
        navigate(`/posts/${post.post_id}#`)
        window.scrollTo(0,0);
    }

    const handleEditClick = () => {
        watcherList = [];
        resetContents();
        changeCanSignOutState(false);
        setCancelled(false);
        setEditing(true);
    }

    const handleCancelClick = () => {
        const result = window.confirm('Are you sure? you will lose all your changes!');
        if(result){
            watcherList = [];
            changeCanSignOutState(true);
            setCancelled(true);
            setEditing(false);
            resetContents();
            const fixed = fixFilter(post.title);
            navigate(`/posts/${fixed}/1#`)
            window.scrollTo(0,0);
        }
    }

    useEffect(() => {
        return () => {
            setEditing(false);
            changeCanSignOutState(true);
        }
    }, []);


    return (
        <form onSubmit={handleSubmit(handlePostSubmit)} className="h-full ">
            <div className="pb-28 dark:bg-neutral-900 bg-stone-100 dark:text-neutral-400">
                <div className="lg:pr-36 lg:pl-36 md:pr-16 md:pl-16 pl-6 pr-6 flex flex-col justify-center space-y-10">
                    <div className="lg:pr-36 lg:pl-36 md:pl-8 md:pr-8 flex flex-col justify-center space-y-10">
                        {
                            currentContent.map(( element )=> ParseAndConvert(element))
                        }
                    </div>
                    <>
                        { (((user?.userId === post.creator_id && post.creator_id !== undefined) || user?.role === 'admin')
                            && editing) && (
                            <div className="flex md:flex-row justify-center md:space-x-4 font-bold text-white flex-col space-y-2 md:space-y-0 ">
                                <button onClick={addTitleComponent} className={`${theme.bg.tertiary.main} ${theme.button.hover} px-2 md:py-2 py-4 rounded-lg outline outline-2 outline-black`}>
                                    <p className='whitespace-nowrap'>+ Add Title</p>
                                </button>
                                <button onClick={addTextComponent} className={`${theme.bg.tertiary.main} ${theme.button.hover} px-2 md:py-2 py-4 rounded-lg outline outline-2 outline-black`}>
                                    <p className='whitespace-nowrap'>+ Add Text</p>
                                </button>
                                <button onClick={addUrlComponent} className={`${theme.bg.tertiary.main} ${theme.button.hover} px-2 md:py-2 py-4 rounded-lg outline outline-2 outline-black`}>
                                    <p className='whitespace-nowrap'>+ Add Url Image</p>
                                </button>
                                <button onClick={addVideoUrlComponent} className={`${theme.bg.tertiary.main} ${theme.button.hover} px-2 md:py-2 py-4 rounded-lg outline outline-2 outline-black`}>
                                    <p className='whitespace-nowrap'>+ Add Video</p>
                                </button>
                                <select className={`${theme.bg.tertiary.main} ${theme.button.hover} text-center whitespace-nowrap px-2 md:py-2 py-4 rounded-lg outline outline-2 outline-black select`} onClick={addCodeComponent} >
                                    <option value="none">+ Add Code Block</option>
                                    <option value="typescript">typescript</option>
                                    <option value="javascript">javascript</option>
                                    <option value="json">json</option>
                                    <option value="python">python</option>
                                    <option value="sql">sql</option>
                                    <option value="css">css</option>
                                    <option value="dockerfile">dockerfile</option>
                                    <option value="csharp">csharp</option>
                                    <option value="cpp">c++</option>
                                    <option value="c">c</option>
                                    <option value="glsl">glsl</option>
                                    <option value="powershell">powershell</option>
                                </select>
                            </div>
                        ) }
                    </>
                </div>
                <ArticleAdminMenu current_creator_id={post.creator_id} handleEditClick={handleEditClick} handleCancelClick={handleCancelClick} />
            </div>
        </form>
    );
}

