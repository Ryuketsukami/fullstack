import {ArticleCard} from "../components/article-card";
import {PageTitle} from "../components/page-title";
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {BlogContext} from "../providers/blog-provider";
import uuid4 from "uuid4";
import {Paging} from "../components/paging";

export function CategoryPage() {

    const { posts, categories, fetchPosts, numOfPagesInMemory, fetchLength, postsPerPage } = useContext(BlogContext);

    const { category_meta_type , page_param} = useParams();

    const current_category = categories.find(category => category.meta_type === category_meta_type);

    useEffect(() => {
        window.scrollTo(0,0);
        fetchPosts(page_param, '%25', current_category.title, '%25');
        fetchLength('%25',current_category.title);

    }, [current_category.title, page_param]);

    return (
        <div className='min-h-screen'>
            <PageTitle {...current_category} />
            <div className="  pt-16 md:pr-8 md:pl-8 pr-8 pl-8 flex justify-center dark:bg-neutral-900 bg-gray-100">
                <div className=" flex flex-col justify-center space-y-4 pb-16 items-center w-fit">
                    {
                        posts
                            .filter(post => post.meta_type === category_meta_type)
                            .slice(0,postsPerPage)
                            .map((element) => <ArticleCard key={uuid4()} selection={element} />)

                    }
                    <div className='pt-6'>
                        <Paging numOfPages={numOfPagesInMemory} currentPage={parseInt(page_param)}
                                category_meta_type={category_meta_type} filter={''}
                                type={'category'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}