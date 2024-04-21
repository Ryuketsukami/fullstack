import {ArticleTitle} from "../components/article-title";
import {ArticleBody} from "../components/article-body";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {BlogContext} from "../providers/blog-provider";
import {EditorProvider} from "../providers/editor-provider";
import {FormProvider} from "../providers/form-provider";


export function SingleArticlePage() {

    // Fetch the id of the current article from the route, we will need it in order to fetch the actual article.
    const { id } = useParams();

    // Fetched will have the id if it is true
    const [fetched, setFetched] = useState('0');

    // Fetch all posts and isolate the current article, so we can pass its data to the next components.
    const { posts, fetchSinglePost } = useContext(BlogContext);
    let post = posts.find((single_post) => single_post.post_id.toString() === id);

    useEffect(() => {
        window.scrollTo(0,0);
        if (fetched!==id || post === undefined){
            fetchSinglePost(id)
                .then(()=>{
                    post = posts.find((single_post) => single_post.post_id === id);
                })
                .then(()=>{
                    setFetched(id);
                })
        }
    }, []);

    return (
        <FormProvider>
            {fetched === id && post !== undefined ?
                <EditorProvider startingPost={post}>
                    <ArticleTitle title={post.title} date={post.date} type={post.type} picUrl={post.full_image}/>
                    <ArticleBody post={post} />
                    {/*<RecommendedArticles recommended_list={posts}/>*/}
                </EditorProvider>
                :
                <div>
                    LOADING POST
                </div>
            }
        </FormProvider>
    );
}
