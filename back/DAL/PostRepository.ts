import Post from '../models/Post';
import { getClient } from './DBConnect';
import { DataAccess } from './DataAccess';

export class PostRepository implements DataAccess<Post>{
    private client = getClient();

    async add(post: Post, secretUserId: string): Promise<void> {
        await this.client.query(
            'INSERT INTO post (post_id, type, meta_type, date, creator_id, title, preview_content, thumbnail_src, full_image, secret_creator_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            [
                post.post_id, 
                post.type, 
                post.meta_type, 
                post.date, 
                post.creator_id, 
                post.title, 
                post.preview_content,
                post.thumbnail_src,
                post.full_image,
                secretUserId
            ]
        );

        await this.client.query(`CREATE TABLE content_${post.post_id} (
            content_id SERIAL PRIMARY KEY NOT NULL,
            type VARCHAR(20) NOT NULL,
            data VARCHAR(5000), 
            alt VARCHAR(64)
        );`);

        for (const index in post.content){
            await this.client.query(
                'INSERT INTO content(post_id, content_id, type, data, alt) VALUES($1, $2, $3, $4, $5)',
                [
                    post.post_id, 
                    post.content[index].content_id,
                    post.content[index].type,
                    post.content[index].data,
                    post.content[index].alt,
                ]
            );
        }
        
    }

    async delete(id: string, secretUserId: string): Promise<void> {
        const checkPassword = await this.client.query(`SELECT * FROM post WHERE post_id = '${id}' AND secret_creator_id = '${secretUserId}'`);
        const checkRole = await this.client.query(`SELECT * FROM blog_user WHERE role = 'admin' AND secret_user_id = '${secretUserId}'`);
        if(!checkPassword.rows.length && !checkRole.rows.length){
            throw new Error('invalid secret_user_id!')
        }
        try{
            await this.client.query(`DROP TABLE content_${id}`);
            await this.client.query(`DELETE FROM post WHERE post_id LIKE '${id}'`);
        }catch (e) {
            throw new Error(`error deleting post: ${e}`);
        }

    }

    // currently the updated data is the whole post
    async update(id: string, post: Partial<Post>, secretUserId: string): Promise<void> {
        if(post.content === undefined) return;
        const checkPassword = await this.client.query(`SELECT * FROM post WHERE post_id = '${post.post_id}' AND secret_creator_id = '${secretUserId}'`);
        const checkRole = await this.client.query(`SELECT * FROM blog_user WHERE role = 'admin' AND secret_user_id = '${secretUserId}'`);
        if(!checkPassword.rows.length && !checkRole.rows.length){
            throw new Error('invalid secret_user_id!')
        }

        try {
            await this.client.query(`TRUNCATE TABLE content_${id}`);

            await this.client.query(
                `CREATE TABLE IF NOT EXISTS content_${id} (
                content_id SERIAL PRIMARY KEY NOT NULL,
                type VARCHAR(20) NOT NULL,
                data VARCHAR(5000), 
                alt VARCHAR(64)
            )`);


            for (const content of post.content) {
                await this.client.query(
                    `INSERT INTO content_${id} (type, data, alt) VALUES($1, $2, $3)`,
                    [
                        content.type,
                        content.data,
                        content.alt
                    ]
                );
            }

        }catch (e) {
            console.log('error updating post:',e);
        }

    }

    async updateCard(id: string, post: Partial<Post>, secretUserId: string): Promise<void> {
        const checkPassword = await this.client.query(`SELECT * FROM post WHERE post_id = '${post.post_id}' AND secret_creator_id = '${secretUserId}'`);
        const checkRole = await this.client.query(`SELECT * FROM blog_user WHERE role = 'admin' AND secret_user_id = '${secretUserId}'`);
        if(!checkPassword.rows.length && !checkRole.rows.length){
            throw new Error('invalid secret_user_id!')
        }

        try {
            await this.client.query(
                `
                UPDATE post
                SET type = '${post.type}', meta_type = '${post.meta_type}', title = '${post.title}', preview_content = '${post.preview_content}', thumbnail_src = '${post.thumbnail_src}', full_image = '${post.full_image}'
                WHERE post_id = '${post.post_id}'
            `);

        }catch (e) {
            console.log('error updating post:',e);
        }

    }

    async get(id: string): Promise<Post | void> {
        try{
            const post_response = await this.client.query(`
                SELECT *
                FROM post
                WHERE $1 = post_id`,
                [id]
            );

            // we might need to add an ordering logic to this...
            const content_response = await this.client.query(`
                SELECT *
                FROM content_${id}`
            );

            let content = Array.from(content_response.rows);
            // if we have a response, and there is content
            if (post_response.rows.length){
                const first_row = post_response.rows[0]
                return new Post(
                    first_row.post_id,
                    first_row.type,
                    first_row.meta_type,
                    first_row.date,
                    first_row.creator_id,
                    first_row.title,
                    first_row.preview_content,
                    first_row.thumbnail_src,
                    first_row.full_image,
                    content
                );
            }
        } catch (e) {
            console.log('error fetching single post or content:', e);

        }

    }

    async getAll(page: number, filter: string, category: string, user_id: string): Promise<Post[]> {
        const pageSize = 6;
        const offset = (page - 1) * pageSize;
        const posts: Array<Post> =[];
        try{
            const response = await this.client.query(`
                SELECT *
                FROM post
                WHERE (LOWER(title) LIKE '%${filter.toLowerCase()}%'
                        OR LOWER(preview_content) LIKE '%${filter.toLowerCase()}%')
                        AND LOWER(type) LIKE '%${category.toLowerCase()}%'
                        AND creator_id LIKE '%${user_id}%'
                ORDER BY date DESC
                OFFSET ${offset} ROWS 
                FETCH NEXT ${pageSize} ROWS ONLY
            `);
            for (const index in response.rows)
            {
                const curr_post = response.rows[index];
                posts.push({...curr_post, content: []})
            }

        }catch (e) {
            console.log(e);
        }



        return posts;
    }

    async getLength(filter: string, category: string): Promise<number> {
        try{
            const result = await this.client.query(`
                SELECT COUNT(*)
                FROM post
                WHERE (LOWER(title) LIKE '%${filter.toLowerCase()}%'
                        OR LOWER(preview_content) LIKE '%${filter.toLowerCase()}%')
                        AND LOWER(type) LIKE '%${category.toLowerCase()}%'
            `);
            return result.rows[0];
        }catch (e) {
            console.log(e);
            return 0;
        }
    }
    
}




// for (const rowIndex in response.rows){
        //     const row = response.rows[rowIndex];
        //     const current_content = {
        //         content_id: row.content_id,
        //         post_id: row.post_id,
        //         type: row.type,
        //         data: row.data,
        //         alt: row.alt,
        //     }
        //     content.push(current_content);
        // }

                // const no_comment_response = await this.client.query(`
        // SELECT *
        // FROM post as P
        // WHERE ${id} = P.post_id`
        // );

        // if (no_comment_response.rows.length){
        //     const first_row = no_comment_response.rows[0]
        //     const post = new Post(
        //         first_row.post_id,
        //         first_row.type,
        //         first_row.meta_type,
        //         first_row.date,
        //         first_row.creator_id,
        //         first_row.title,
        //         first_row.preview_content,
        //         first_row.thumbnail_src,
        //         first_row.full_image,
        //         content
        //     );
        //     return post;
        // }