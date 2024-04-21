import {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BlogContext} from "./blog-provider";

export const EditorContext = createContext(null)


// Provider in charge of the editor state
// We will create a currentContent variable to work on, instead of working on top of our original content (as in content of the post).
// The reason for that is for the case where the user wants to cancel the edit, we will want to retrieve the initial state.
export function EditorProvider({children, startingPost}) {

    const { id } = useParams();
    const { posts } = useContext(BlogContext);
    const [ post, setPost ] = useState(startingPost);

    const [editing, setEditingState] = useState(false);
    const [cancelled, setCancelledState] = useState(false);

    useEffect(() => {
        setPost(startingPost);
    }, [posts, id]);


    const setEditing = (statement) => {
        setEditingState(statement);
    }

    const setCancelled = (statement) => {
        setCancelledState(statement);
    }

    const [currentContent, setCurrentContent] = useState(JSON.parse(JSON.stringify(post.content)));

    useEffect(() => {
        setCurrentContent(JSON.parse(JSON.stringify(post.content)));
    }, [post.content]);

    const addContent = (component) => {
        setCurrentContent([...currentContent, {...component}]);
    }

    const setContents = (content) => {
        setCurrentContent([...content]);
    }

    const addContentWithWatcher = (watchers, component) => {
        setCurrentContent([...watchers, {...component}]);
    }

    const editContentById = (component, target_id) => {
        setCurrentContent(currentContent.map(element => element.content_id === target_id ? component : element ));
    }

    const removeContentById = (target_id) =>{
        setCurrentContent(currentContent.filter(content => content?.content_id !== target_id));
    }

    const resetContents = () => {
        setContents(JSON.parse(JSON.stringify(post?.content)));
    }


    const value = {setEditing, setCancelled, editing, cancelled, addContent,
        setContents, editContentById, removeContentById, resetContents,
        currentContent, addContentWithWatcher};

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
}