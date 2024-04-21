import {useContext, useEffect} from "react";
import {BlogContext} from "../providers/blog-provider";
import {useForm} from "react-hook-form";
import {ArticleCard} from "./article-card";
import uuid4 from "uuid4";
import {Paging} from "./paging";
import {useNavigate, useParams} from "react-router-dom";

export function FilteredPosts() {
    const { posts, numOfPagesInMemory, fetchPosts, fetchLength, fixFilter } = useContext(BlogContext);

    const { filter_param , page_param} = useParams();

    const { register, watch } = useForm();

    const navigate = useNavigate();

    //navigate(`/posts/${post.post_id}#`)
    //         window.scrollTo(0,0);

    const watchFilter = watch('filter-input');

    const onFilterSubmit = () =>{
        const fixed = fixFilter(watchFilter);
        navigate(`/posts/${fixed}/1#`)
        window.scrollTo(0,0);
    }

    useEffect(() => {
        window.scrollTo(0,0);
        const fixedFilter = filter_param === 'unfiltered' ? '%25' : filter_param;
        fetchPosts(page_param, fixedFilter, '%25', '%25');
        fetchLength(fixedFilter,'%25');

    }, [filter_param, page_param]);

    // useEffect(() => {
    //     setFilteredPosts(posts.filter(post =>
    //         post?.preview_content.toLowerCase().includes(watchFilter?.toLowerCase()) ||
    //         post?.title.toLowerCase().includes(watchFilter?.toLowerCase())));
    //
    // }, [watchFilter, posts]);

    return (
        <div className="bg-gray-100 pb-12 pt-28 dark:bg-neutral-900">
            <div className="lg:pr-28 lg:pl-28 md:pr-16 md:pl-16 pl-6 pr-6 flex flex-col justify-center space-y-10">
                <div className="items-center flex flex-col lg:pr-36 lg:pl-36 md:pr-8 md:pl-8">
                <input
                    {...register('filter-input', {

                    })}
                    placeholder="Filter posts here!"
                    className=" md:w-[600px] w-full outline outline-1 outline-gray-900 p-2 rounded-md md:mr-8 md:ml-8 lg:mr-36 lg:ml-36 dark:bg-neutral-400 dark:placeholder:text-neutral-600"
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            onFilterSubmit();
                        }
                    }}
                />
                </div>
                <div className="lg:pr-36 lg:pl-36 md:pl-8 md:pr-8 flex flex-col justify-center space-y-4 items-center">
                    {
                        posts.length ?
                        posts.map( post => <ArticleCard key={uuid4()} selection={post} />)
                            :
                            <div className="font-medium text-xl text-red-600">
                                <h1>
                                    Nothing matches your search criteria!
                                </h1>
                            </div>
                    }
                </div>
                <Paging numOfPages={numOfPagesInMemory} currentPage={parseInt(page_param)}
                        category_meta_type={''} filter={filter_param} type={'filter'}
                />
            </div>
        </div>
    );
}

