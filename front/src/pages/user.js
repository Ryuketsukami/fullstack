import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {AuthContext} from "../providers/auth-provider";
import {PageTitle} from "../components/page-title";
import {BlogContext} from "../providers/blog-provider";
import {ArticleCard} from "../components/article-card";
import uuid4 from "uuid4";


export function User() {

    const { user_id, page_param } = useParams();

    const { fetchUser, profileUser } = useContext(AuthContext);
    const { fetchPosts, posts } = useContext(BlogContext);

    useEffect(() => {
        window.scrollTo(0,0);
        if(profileUser === undefined){
            fetchUser(user_id);
        }
        fetchPosts(1,'%25','%25', user_id);

    }, [profileUser, user_id, page_param]);


    return (
        <div className='min-h-screen bg-gray-100 dark:bg-neutral-900'>
            {
                profileUser === undefined ?
                    <div>
                        LOADING
                    </div>
                    :
                    <div>
                        <PageTitle />
                        <div className=' py-8 px-8 flex md:flex-row justify-between flex-col md:space-y-0 space-y-3'>
                            <img src={profileUser.picture.split('=')[0]+'=s300'} alt='profile picture' className={`outline-8 outline dark:outline-neutral-950 outline-stone-300 aspect-square`} />
                            <div className='dark:bg-neutral-950 bg-stone-300 min-h-full md:w-7/12 text-left p-4 -my-2 dark:text-stone-200 space-y-6 w-full'>
                                <p>Name: {profileUser.firstName}</p>
                                <p>Role: {profileUser.role}</p>
                                <p>Number of posts: {profileUser.posts.length}</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:flex-row lg:justify-around mb-32 mt-16 justify-center items-center space-y-4 lg:space-y-0'>
                            <div className='space-y-4'>
                                {
                                    posts.slice(0,3).map( post => <ArticleCard key={uuid4()} selection={post} />)
                                }
                            </div>
                            <div className='space-y-4'>
                                {
                                    posts.slice(3,6).map( post => <ArticleCard key={uuid4()} selection={post} />)
                                }
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
}
