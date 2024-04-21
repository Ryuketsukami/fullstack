export class Content {
  content_id: number;
  type: string; // user ID
  data: string; //postId
  alt: string;

  constructor(content_id: number, type: string, data: string, alt: string) {
    this.content_id = content_id;
    this.type = type;
    this.data = data;
    this.alt = alt;
  }

  // business logic methods
}
  
export default Content;