import {createContext, useContext, useState} from "react";
import {AuthContext} from "./auth-provider";

const hardCodedCategories =[
    {
        title: "Memes",
        meta_type: "memes",
        content: "Just funny posts.",
    },
    {
        title: "Serious",
        meta_type: "serious",
        content: "Interesting or informative posts.",
    },
    {
        title: "Announcements",
        meta_type: "announcements",
        content: "Announcements about the platform that you may be interested in.",
    },
]


export const BlogContext = createContext(null)

export function BlogProvider({children}) {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState(hardCodedCategories);
    const [numOfPagesInMemory, setNumOfPagesInMemory] = useState(11);
    const postsPerPage = 6;
    const {user} = useContext(AuthContext);

    const fetchPosts = async (page, filter, category, userId) => {

        const params = [];
        params.push(category);
        params.push(page);
        params.push(filter);
        params.push(userId);
        const fixed_url = params.join('/')

        try{
            fetch(`${process.env.REACT_APP_BACK_URL}/posts/${fixed_url}`)
                .then(response => response.json())
                .then(json => {
                    setPosts([...json]);
                })
        } catch (error){
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const categoryInitialFetch = async (categoryName) => {

        const params = [];
        params.push(categoryName);
        params.push(1);
        params.push('%25');
        params.push('%25');
        const fixed_url = params.join('/')

        try{
            fetch(`${process.env.REACT_APP_BACK_URL}/posts/${fixed_url}`)
                .then(response => response.json())
                .then(json => {
                    setPosts(prevPosts => [...prevPosts, ...json]);
                })
        } catch (error){
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const initialFetch = async () => {
        setPosts([]);
        try{
            categories.forEach((category)=>{
                categoryInitialFetch(category.title);
            })
        } catch (error){
            console.error('There was a problem with the initial fetch operation:', error);
        }
    };

    const fetchSinglePost = async (post_id) =>{
        try{
            fetch(`${process.env.REACT_APP_BACK_URL}/posts/${post_id}`)
                .then(response => response.json())
                .then((json) => {
                    replacePostWithEdited(json, true)
                })
        } catch (error){
            console.error('There was a problem with the single fetch operation:', error);
        }
    }

    const updatePostInMemory = async (postToPut) => {
        try{
            await fetch(`${process.env.REACT_APP_BACK_URL}/posts/${postToPut.post_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post:postToPut,
                    user:user
                })
            })
        } catch (error){
            console.error('There was a problem with put operation to submit a post:', error);
        }
    }

    const editPostInMemory = async (postToPut) => {
        try{
            await fetch(`${process.env.REACT_APP_BACK_URL}/posts/${postToPut.post_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post:postToPut,
                    user:user
                })
            })
        } catch (error){
            console.error('There was a problem with put operation to submit a post:', error);
        }
    }

    const deletePostInMemory = async (post_id) => {
        try{
            await fetch(`${process.env.REACT_APP_BACK_URL}/posts/${post_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user:user
                })
            })
        } catch (error){
            console.error('There was a problem with delete operation:', error);
        }
    }

    const addNewPostInMemory = async (postToAdd) => {
        try{
            await fetch(`${process.env.REACT_APP_BACK_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    post:postToAdd,
                    user:user
                })
            })
        } catch (error){
            console.error('There was a problem with put operation to submit a post:', error);
        }
    }

    // initial fetch to fetch all posts when we first load the website

    const addNewPost = (post, onlyInClient) => {
        setPosts([...posts, post]);
        if(!onlyInClient){
            addNewPostInMemory(post);
        }
    }

    const replacePostWithEdited = (edited_post, onlyInClient) => {
        const postFound = (posts.find(post => post.post_id === edited_post.post_id ));
        if (postFound !== undefined){
            setPosts(
                posts.map(post => post.post_id === edited_post.post_id ? edited_post : post)
            );
        }
        else{
            addNewPost(JSON.parse(JSON.stringify(edited_post)), onlyInClient);
        }
        if(!onlyInClient){
            updatePostInMemory(edited_post);
        }
    }

    const removePostById = (target_id) => {
        setPosts(posts.filter(post => post.post_id !== target_id));
        deletePostInMemory(target_id);
    }

    // We are adding this in case an admin wants to add a category in the future.
    // We might want to make one for removing categories too. but that one has to check the posts before doing so.
    const addNewCategory = (category) => {
        setCategories([...categories, category]);
    }

    const fetchLength = (filter, category) => {
        const params = [];
        params.push(category);
        params.push(filter);
        const fixed_url = params.join('/')
        try{
            fetch(`${process.env.REACT_APP_BACK_URL}/posts/${fixed_url}`)
                .then(response => response.json())
                .then(json => {
                    setNumOfPagesInMemory(Math.ceil(parseInt(json.count)/postsPerPage));
                })
        } catch (error){
            console.error('There was a problem with the fetch length operation:', error);
        }
    }

    const fixFilter = (filter) => {
        let toURL = filter === '' ? 'unfiltered' : filter;
        const valid = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~'
        return toURL.split('').map((char)=>{
            if (valid.includes(char)){
                return char
            }
            return '_'
        }).join('');
    }

    const value = {posts, categories, postsPerPage, editPostInMemory,
        addNewPost, replacePostWithEdited, removePostById, addNewCategory, fetchSinglePost, fixFilter,
        updatePostInMemory, fetchPosts, initialFetch, numOfPagesInMemory, fetchLength};

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
}

export function getDate(dateInMilliseconds){

    let currentDate =  new Date(parseInt(dateInMilliseconds));
    currentDate = currentDate.toDateString() !== 'Invalid Date' ? currentDate : new Date();

    const monthNames = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL',
        'MAY', 'JUNE', 'JULY', 'AUGUST',
        'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const monthName = monthNames[monthIndex];

    return monthName + ' ' + day + ', ' + year;
}