import {ArticlesCluster} from "../components/articles-cluster";
import {PageTitle} from "../components/page-title";
import {useContext, useEffect} from "react";
import {BlogContext} from "../providers/blog-provider";
import uuid4 from "uuid4";

export function Home() {

    const { posts, categories, initialFetch } = useContext(BlogContext);

    const title = {
            title: "Personal Blog",
            content: "My own personal blog for writing stuff",
            isHome: ''
    };

    useEffect(() => {
        initialFetch();
    }, []);

    return (
        <div>
            <PageTitle {...title} />
            <div className="bg-gray-100 dark:bg-neutral-900 pb-16">
                <div className='flex flex-col-reverse'>
                    {
                        categories.map(
                            (category) =>
                                posts.filter(post => post.type === category.title).length ?
                                <ArticlesCluster key={uuid4()} section_name={category.title} section_meta_type={category.meta_type} section_list={
                                posts.filter(post => post.type === category.title)} /> : <div key={uuid4()}></div>
                        )
                    }
                </div>

            </div>
        </div>
    );
}
