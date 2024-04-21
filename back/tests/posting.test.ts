import Post from "../models/Post";
import User from "../models/User";

import {execSync} from 'child_process';

require("dotenv/config");
const baseUrl = process.env.BACK_URL;

async function fetchPage(category: string, page: number, filter: string) {
    const response = await fetch(baseUrl + '/posts/' + category + '/' + page.toString() + '/' + filter);
    return await response.json();
}

async function fetchNumberOfPosts(category: string, filter: string) {
    const response = await fetch(baseUrl + '/posts/' + category + '/' + filter);
    return await response.json();
}

async function addPosts(postToAdd: Post, user: User) {
    const response = await fetch(
        baseUrl + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post:postToAdd,
                user:user
            })
        }
        );
    return await response.json();
}

async function deletePost(postToDelete: Post, user: User){
    await fetch(`${baseUrl}/posts/${postToDelete.post_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user:user
        })
    })
}

async function editPost(postToEdit: Post, user: User){
    await fetch(`${baseUrl}/posts/${postToEdit.post_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post:postToEdit,
            user:user
        })
    })
}

async function getSingleContent(postToEdit: Post){
    let content;
    await fetch(`${baseUrl}/posts/${postToEdit.post_id}`)
        .then(response => response.json())
        .then((json) => {
            content=json.content;
        })
    return content;
}

describe('API testing', () => {

    // This will run before each test in the suite
    beforeEach(() => {
        execSync(`psql -f rebuild_db.sql postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);
    });

    test('test initial number of posts', async () => {
        const res = await fetchNumberOfPosts('%25','%25');
        expect(res.count).toBe("14");
    });

    test('test paging', async () => {
        let res = await fetchPage('%25',1, '%25');
        expect(res.length).toBe(6);
        res = await fetchPage('%25',2, '%25');
        expect(res.length).toBe(6);
        res = await fetchPage('%25',3, '%25');
        expect(res.length).toBe(2);
    });

    test('test get page by category', async () => {
        let res = await fetchPage('announcements',1, '%25');
        expect(res.length).toBe(4);
        res = await fetchPage('serious',1, '%25');
        expect(res.length).toBe(3);
        res = await fetchPage('memes',1, '%25');
        expect(res.length).toBe(6);
        res = await fetchPage('memes',2, '%25');
        expect(res.length).toBe(1);
    });

    test('test filter', async () => {
        let res = await fetchPage('%25',1, 'this');
        expect(res.length).toBe(6);
        res = await fetchPage('%25',2, 'this');
        expect(res.length).toBe(1);
    });

    test('test add and delete post with authentication', async () => {
        let res = await addPosts(post, creatorUser);
        expect(res.message).toBe('Post created successfully');
        res = await fetchNumberOfPosts('%25','%25');
        expect(res.count).toBe("15");
        await deletePost(post, differentUser);
        res = await fetchNumberOfPosts('%25','%25');
        expect(res.count).toBe("15");
        await deletePost(post, hackerUser);
        res = await fetchNumberOfPosts('%25','%25');
        expect(res.count).toBe("15");
        await deletePost(post, creatorUser);
        res = await fetchNumberOfPosts('%25','%25');
        expect(res.count).toBe("14");
    });

    test('test edit post with authentication', async () => {
        let res = await addPosts(post, creatorUser);
        expect(res.message).toBe('Post created successfully');
        await editPost(editedPost,creatorUser);
        res = await getSingleContent(post);
        expect(res[0].data).toBe('this is a very nice text!');
    });

});


const post = new Post(
    '7',
    'Announcements',
    'announcements',
    new Date().getTime(),
    '76',
    'JEST',
    'In this preview content you will learn nothing important.',
    'https://wallpapercave.com/uwp/uwp4265080.jpeg',
    'https://wallpapercave.com/uwp/uwp4265080.jpeg',
    []
)

const editedPost = new Post(
    '7',
    'Announcements',
    'announcements',
    new Date().getTime(),
    '76',
    'JEST',
    'In this preview content you will learn nothing important.',
    'https://wallpapercave.com/uwp/uwp4265080.jpeg',
    'https://wallpapercave.com/uwp/uwp4265080.jpeg',
    [{type:'text',data:'this is a very nice text!',alt:'',content_id:298324}]
)

const creatorUser = new User(
    'dummy@email.com',
    'test',
    '76',
    'https://wallpapercave.com/uwp/uwp4242522.jpeg',
    'member',
    '1234d456',
    [],
    [],
    [],
    '777888'
)

const differentUser = new User(
    'dummy2@email.com',
    'secondGuy',
    '7868',
    'https://wallpapercave.com/uwp/uwp4242522.jpeg',
    'member',
    '123456',
    [],
    [],
    [],
    '999000'
)

// this user is someone who took advantage of the publicly available metadata about a post and is trying to
// impersonate another user and an admin.
const hackerUser = new User(
    'dummy@email.com',
    'test',
    '76',
    'https://wallpapercave.com/uwp/uwp4242522.jpeg',
    'admin',
    '123909999456',
    [],
    [],
    [],
    '33333333'
)