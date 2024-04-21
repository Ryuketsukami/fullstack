import { HashLink as Link } from "react-router-hash-link";
import {useContext, useState} from "react";
import {AuthContext} from "../providers/auth-provider";
import {BlogContext, getDate} from "../providers/blog-provider";
import {Trash2, FilePenLine} from "lucide-react";
import {EditPostModal} from "../modals/editPostModal";

export function ArticleCard({selection, disabled, deleteDisabled}) {

    const { user } = useContext(AuthContext);
    const { removePostById } = useContext(BlogContext);

    const [modalOn, setModalOn] = useState(false);

    const handleDelete = () => {
        const result = window.confirm('Are you sure you want to delete this post?');
        if(result){
            removePostById(selection.post_id);
            window.location.reload();
            window.scrollTo(0,0);
        }

    }

    const handleEdit = (statement) => {
        setModalOn(statement);
    }

    const addDefaultSrc = (event) =>{
        event.target.src = '/default-img.jpeg';
    }

    return (
        <div className="flex flex-col relative">
            <EditPostModal type={selection.type} post_id={selection.post_id} title={selection.title}
                           preview_content={selection.preview_content} thumbnail_src={selection.thumbnail_src}
                           date={selection.date} modalOn={modalOn} handleSetModalOn={handleEdit} />
            <Link style={{pointerEvents: disabled ? 'none' : '' }} to={`/posts/${selection.post_id}#`}>
                <div className="hidden md:block overflow-hidde">
                    <div className='pr-0 pl-0 flex justify-end h-[140px] w-[600px]'>
                        <div className=" overflow-hidden">
                            <img
                                onError={addDefaultSrc}
                                src={selection.thumbnail_src} alt='thumbnail' className=" aspect-video w-[360px]" />
                        </div>

                        <div className={'dark:bg-neutral-950 bg-white w-60 h-[140px] absolute z-20 left-0'}/>
                        <div className={"w-0 h-0 absolute z-20 border-t-[140px] border-t-white dark:border-t-neutral-950" +
                            " border-r-[120px] border-r-transparent left-60 "}/>
                        <div className={'dark:bg-neutral-950 bg-white w-60 h-[140px] absolute z-20 opacity-20 left-[40px]'}/>
                        <div className={"w-0 h-0 absolute  z-20 border-t-[140px] border-t-white dark:border-t-neutral-950 opacity-20" +
                            " border-r-[120px] border-r-transparent left-[280px]"}/>
                        <div className={'dark:bg-neutral-950 bg-white w-60 h-[140px] absolute z-20 opacity-20 left-[80px]'}/>
                        <div className={"w-0 h-0 absolute z-20 border-t-[140px] border-t-white dark:border-t-neutral-950 opacity-20" +
                            " border-r-[120px] border-r-transparent left-[320px]"}/>
                        <div className={'dark:bg-neutral-950 bg-white w-60 h-[140px] absolute left-[120px] z-20 opacity-20'}/>
                        <div className={"w-0 h-0 absolute z-20 border-t-[140px] border-t-white dark:border-t-neutral-950 opacity-20"+
                            " border-r-[120px] border-r-transparent left-[360px]"}/>

                        <div className="text-left flex-wrap pl-2.5 w-8/12 absolute left-0 z-40">
                            <p className="line-clamp-2 pt-1 text-2xl text-gray-800 dark:text-gray-200 font-bold mr-0 pb-2 overflow-x-hidden text-ellipsis">{selection.title}</p>
                            <p className="line-clamp-3 text-gray-500 dark:text-gray-400 mr-0 overflow-x-hidden text-ellipsis text-xs">{selection.preview_content}</p>
                        </div>

                    </div>

                </div>
                <div className="md:hidden">
                    <div className={`w-[350px] bg-white dark:bg-neutral-950 dark:outline-gray-600 outline-stone-400 outline pt-2 flex justify-center flex-col `}>
                        <div className="text-left flex-wrap pl-6 pr-6 pb-3">
                            <p className="pt-3 text-xl text-gray-500 font-medium ">{getDate(selection.date)}</p>
                            <p className="text-2xl text-gray-800 dark:text-gray-200 font-bold pt-5 mr-0 pb-3 max-w-sm overflow-x-hidden text-ellipsis">{selection.title}</p>
                        </div>
                        <img
                            onError={addDefaultSrc}
                            className=" h-60 object-cover w-[350px]" src={selection.thumbnail_src} alt='thumbnail' />
                    </div>
                </div>
            </Link>
            {
                ((user?.role === 'admin' || user?.userId === selection.creator_id) && !disabled && !deleteDisabled) &&
                <div>
                    <button onClick={()=>handleEdit(true)} className={`pl-1.5 pr-1.5  dark:bg-neutral-900 bg-white text-black  rounded-lg items-center pb-2.5 pt-2 dark:text-white outline outline-1 outline-gray-900 absolute right-11 bottom-1`}>
                        <FilePenLine />
                    </button>
                    <button onClick={handleDelete} className='pl-1.5 pr-1.5 bg-red-700 rounded-lg items-center pb-2.5 pt-2 text-gray-200 outline outline-1 outline-gray-900 absolute right-1 bottom-1'>
                        <Trash2 />
                    </button>
                </div>
            }
        </div>
    );
}

// aspect-video