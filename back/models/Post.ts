import { Content } from './Content'

class Post {

  post_id: string;
  type: string;
  meta_type: string;
  date?: number;
  creator_id: string;
  title: string;
  preview_content: string;
  thumbnail_src: string;
  full_image: string;
  content: Array<Content>;


  constructor(
    post_id: string,
    type: string,
    meta_type: string,
    date: number | null | undefined,
    creator_id: string,
    title: string,
    preview_content: string,
    thumbnail_src: string,
    full_image: string,
    content: Array<Content>) {
    this.post_id = post_id;
    this.type = type;
    this.meta_type = meta_type;
    this.date = date? date : new Date().getTime();
    this.creator_id = creator_id;
    this.title = title;
    this.preview_content = preview_content;
    this.thumbnail_src = thumbnail_src;
    this.full_image = full_image;
    this.content = [...content];
  }
  // business logic methods
}
export default Post;