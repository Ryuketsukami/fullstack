DROP DATABASE IF exists blog_db_test;
CREATE DATABASE blog_db_test;
---Connect to the desired database
\c blog_db_test;

DROP TABLE IF exists post;

---test content tables.
DROP TABLE IF exists content_1;
DROP TABLE IF exists content_2;
DROP TABLE IF exists content_3;
DROP TABLE IF exists content_4;
DROP TABLE IF exists content_5;
DROP TABLE IF exists content_6;
DROP TABLE IF exists content_7;

CREATE TABLE post
(
    post_id VARCHAR(60) PRIMARY KEY NOT NULL,
    "type" VARCHAR(30),
    meta_type VARCHAR(30),
    creator_id VARCHAR(60),
    title VARCHAR(80),
    preview_content VARCHAR(200),
    thumbnail_src VARCHAR(300),
    full_image VARCHAR(300),
    "date" BIGINT,
    secret_creator_id VARCHAR(128)
);

DROP TABLE IF EXISTS blog_user;

CREATE TABLE blog_user
(
    email VARCHAR(64) PRIMARY KEY NOT NULL,
    given_name VARCHAR(32),
    user_id VARCHAR(64),
    picture VARCHAR(256) NOT NULL,
    "role" VARCHAR(16) NOT NULL,
    posts VARCHAR(64)[],
    favorite_posts VARCHAR(64)[],
    friends VARCHAR(64)[],
    secret_user_id VARCHAR(128)
);

INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('22fc464ae0f949e9b31e1fa3e6189df6','Announcements','announcements',1,'Second post','We are testing out posting with the back end enabled','https://images2.alphacoders.com/116/1161816.jpg','https://images2.alphacoders.com/116/1161816.jpg',1705530802560,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('80e87e1f918b4f87986c783c24a3b4ad','Announcements','announcements',1,'Third post!','this is the third post, to test paging and stuff','https://e1.pxfuel.com/desktop-wallpaper/719/956/desktop-wallpaper-best-yuru-camp-gifs-yuru-camp.jpg','https://e1.pxfuel.com/desktop-wallpaper/719/956/desktop-wallpaper-best-yuru-camp-gifs-yuru-camp.jpg',1704800802560,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('aa6ad0ff12ec4ec6a7be32b8486d5e2a','Memes','memes',1,'Just a meme','the image ratio of this is hella weird','https://image.tensorartassets.com/cdn-cgi/image/w=1920,f=jpeg/posts/images/614623388131922095/e9ba7351-a222-4e45-b10d-3235455d7e28.jpg','https://img3.gelbooru.com//samples/a5/0c/sample_a50c079b866e44e9280c3de20850c4a6.jpg',1625993304458,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('c626e1e7f1f647ff89bae9559dd05bc8','Memes','memes',1,'This is just a random meme :''(','Just a meme post, to test the stuff','https://miro.medium.com/v2/resize:fit:2000/format:webp/1*rnvLlSeqtEIl2Z0Qm87hSg.png','https://images.alphacoders.com/688/688781.jpg',1635997385467,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('ad9f5d7d13aa4c02a4f9b3f53bee359c','Announcements','announcements',1,'This is the 4th announcement','This is just for testing stuff anyways...','https://wallpapercave.com/wp/wp9497638.png','https://wallpapercave.com/wp/wp9497638.png',1605993304458,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('b8394843a6ce4d1183fab90d9e7c0af8','Memes','memes',1,'saf','saffas','https://images2.alphacoders.com/116/1161816.jpg','https://images2.alphacoders.com/116/1161816.jpg',1605993504458,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('cda24f0117994eaaada842a2267902d7','Memes','memes',1,'Third meme','this is getting tiresome...','https://w0.peakpx.com/wallpaper/639/743/HD-wallpaper-lofi-girl-alone-sad-artist-artwork-digital-art-pixiv.jpg','https://w0.peakpx.com/wallpaper/639/743/HD-wallpaper-lofi-girl-alone-sad-artist-artwork-digital-art-pixiv.jpg',1625993304458,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('1','Announcements','announcements',1,'First post! please check this out!','This post is overall empty, it just contains basic things to test out the backend','https://images6.alphacoders.com/852/852047.jpg','https://images6.alphacoders.com/852/852047.jpg',1705500842560,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('f2b8b80dbc83433da51f4ec4cc5c7a91','Serious','serious',1,'Very serious post','first serious post','https://images.alphacoders.com/688/688781.jpg','https://images.alphacoders.com/688/688781.jpg',1706017110063,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('89a7096d26f445faa26e8aabf74877e7','Memes','memes',1,'Another very very very serious post','wellp, another one...','https://images4.alphacoders.com/149/149996.jpg','https://images4.alphacoders.com/149/149996.jpg',1706017231328,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('8f8d8fbca27d4dccb32eec149bba8b93','Memes','memes',1,'This is more important than you think!','please help!','https://images5.alphacoders.com/134/1348477.png','https://images5.alphacoders.com/134/1348477.png',1706017384239,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('9ebf464602d749c8b21f5b1657f05dbb','Serious','serious',1,'Help needed','Augh oof','https://c4.wallpaperflare.com/wallpaper/386/466/344/anime-anime-girls-pixiv-hd-wallpaper-preview.jpg','https://c4.wallpaperflare.com/wallpaper/386/466/344/anime-anime-girls-pixiv-hd-wallpaper-preview.jpg',1706017450379,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('4be60ef7b143420288400f669c9b867f','Serious','serious',1,'Third one now','Heya there guys','https://w.wallha.com/ws/14/31vZ4zBe.png','https://w.wallha.com/ws/14/31vZ4zBe.png',1706017581595,'1233dgsg32425351dfafsafwer13411');
INSERT INTO post("post_id",type,"meta_type","creator_id",title,"preview_content","thumbnail_src","full_image",date, secret_creator_id) VALUES ('8bf2f70001c94226be7f34415c37757b','Memes','memes',2,'hello','sdjhajshsdjhasjdhajsd','https://media.istockphoto.com/id/1145618475/photo/villefranche-on-sea-in-evening.jpg?s=612x612&w=0&k=20&c=vQGj6uK7UUVt0vQhZc9yhRO_oYBEf8IeeDxGyJKbLKI=','https://media.istockphoto.com/id/1145618475/photo/villefranche-on-sea-in-evening.jpg?s=612x612&w=0&k=20&c=vQGj6uK7UUVt0vQhZc9yhRO_oYBEf8IeeDxGyJKbLKI=',1706448150305,'1233dgsg32425351dfafsafwer13411');
