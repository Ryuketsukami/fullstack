import {Fragment, useContext} from "react";
import {EditorContext} from "../../providers/editor-provider";
import {FormContext} from "../../providers/form-provider";

export function UrlImgContent({ segment_alt, segment_src, content_id, componentDeleteHandle, inputWatcher }) {

    const { editing } = useContext(EditorContext);
    const { register } = useContext(FormContext);

    const default_img_url = 'https://i.imgur.com/yd01iL2.jpeg';

    // Following function is to be called in case of Error in image component.
    // We want to return an "Empty" default picture in such case.
    const addDefaultSrc = (event) =>{
        event.target.src = default_img_url;
    }

    // Simple Regex to make sure the url is an image, if it isn't, render the default image.
    const validImage = () => {
        const urlImageRegex = /(https?:\/\/.*\.(?:png|jpg|webp|jpeg))/i;
        if(urlImageRegex.test(inputWatcher)){
            return inputWatcher;
        }
        return default_img_url;
    }

    return (
        <Fragment>
            {
                editing ? (
                    <div className="flex flex-col justify-center">
                        <div className="object-contain flex justify-center items-center">
                            <img className="" src={validImage()} onError={addDefaultSrc} alt={segment_alt} />
                        </div>
                        <div className="flex flex-row justify-between">
                            <input
                                {...register(`${content_id}`,
                                    {
                                        value: inputWatcher,
                                        id: "thumbnail_src",
                                        name: "thumbnail_src",
                                        placeholder: "url",
                                        type: 'url',
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
                        <img className="object-contain" onError={addDefaultSrc} src={segment_src} alt={segment_alt} />
                    </div>
                )
            }
        </Fragment>
    );

}

