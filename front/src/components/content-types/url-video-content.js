import {Fragment, useContext} from "react";
import {EditorContext} from "../../providers/editor-provider";
import {FormContext} from "../../providers/form-provider";

export function UrlVideoContent({ segment_src, content_id, componentDeleteHandle, inputWatcher }) {

    const { editing } = useContext(EditorContext);
    const { register } = useContext(FormContext);

    const default_video_url = 'https://www.youtube.com/embed/NSmukdqyvjU';

    // Following function is to be called in case of Error in image component.
    // We want to return an "Empty" default picture in such case.
    const addDefaultSrc = (event) =>{
        event.target.src = default_video_url;
    }

    // Simple Regex to make sure the url is an image, if it isn't, render the default image.
    const validVideo = () => {
        const urlVideoRegex = /^(http(s)??:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))/i;
        if(urlVideoRegex.test(inputWatcher)){
             return inputWatcher.split('watch?v=').join('embed/').split('&')[0]
        }
        return default_video_url;
    }

    return (
        <Fragment>
            {
                editing ? (
                    <div className="flex flex-col justify-center">
                        <div className="object-contain flex justify-center items-center">
                            <iframe className="object-contain aspect-video w-full" src={validVideo()} onError={addDefaultSrc} />
                        </div>
                        <div className="flex flex-row justify-between">
                            <input
                                {...register(`${content_id}`,
                                    {
                                        value: inputWatcher,
                                        id: "thumbnail_src",
                                        name: "thumbnail_src",
                                        placeholder: "videoUrl",
                                        type: 'videoUrl',
                                    }
                                )}
                                className="p-3 outline outline-2 w-96 outline-gray-900 mt-2 dark:bg-black"
                            />
                            <button
                                className="ml-3 mt-2 mb-2 bg-red-800 pl-4 pr-4 pt-2 pb-2 text-white outline outline-1 outline-gray-900 rounded-lg"
                                onClick={() => componentDeleteHandle(content_id)}>
                                delete
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="object-contain flex justify-center items-center">
                        <iframe className="object-contain aspect-video w-full" onError={addDefaultSrc} src={segment_src.split('watch?v=').join('embed/').split('&')[0]} />
                    </div>

                )
            }
        </Fragment>
    );

}

