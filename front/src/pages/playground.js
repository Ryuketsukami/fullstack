import {PageTitle} from "../components/page-title";
import {PlaygroundBody} from "../components/playground-body";

export function Playground() {

    const title = {
        title: "Playground",
        content: "This is where we will play around with different and interesting technologies",
    };

    return (
        <div className='min-h-screen bg-gray-100 dark:bg-neutral-900'>
            <PageTitle {...title} />
            <div className="bg-gray-100 dark:bg-black">
                <div className="h-full bg-black">
                    <PlaygroundBody />
                </div>
            </div>
        </div>
    );
}
