import {ArticleCard} from "./article-card";
import uuid4 from "uuid4";

export function RecommendedArticles(props) {
    const {recommended_list} = props;
    return (
        <div className="lg:pr-56 lg:pl-56 pt-16 md:pr-8 md:pl-8 pr-8 pl-8 bg-gray-100 dark:bg-neutral-950">
            <div className="items-center flex flex-col">
                <div className="flex flex-row justify-between content-center max-w-5xl w-full">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-neutral-500">Recommended articles</h1>
                </div>
            </div>
            <div className="flex flex-col space-y-4 pt-8 pb-16 items-center">
                {
                    recommended_list
                        .slice(0,Math.min(3,recommended_list.length))
                        .map((element) => <ArticleCard key={uuid4()} selection={element} deleteDisabled={true} />)
                }
            </div>
        </div>
    );
}