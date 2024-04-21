import {PageTitle} from "../components/page-title";
import {useContext, useEffect} from "react";
import {BlogContext} from "../providers/blog-provider";
import {ErrorImage} from "../svg/404";

export function ErrorPage() {

    const { initialFetch } = useContext(BlogContext);

    const title = {
            title: "404",
            content: "Page not found",
    };

    useEffect(() => {
        initialFetch();
    }, []);

    return (
        <div>
            <div className='min-h-screen dark:bg-neutral-900 '>
                <PageTitle {...title} />
                <div className="bg-gray-100 dark:bg-neutral-900 pb-16 flex justify-center">
                    <div className='flex justify-center flex-col max-w-[600px]'>
                        <ErrorImage />
                    </div>
                </div>

            </div>
        </div>
    );
}
