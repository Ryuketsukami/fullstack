class PostComment {
    id: number;
    content: string;
    commentedBy: number; // user ID
    post: number; //postId
    createdAt: Date;
    // other properties
  
    constructor(id: number, content: string, commentedBy: number, postId: number) {
      this.id = id;
      this.content = content;
      this.commentedBy = commentedBy;
      this.post = postId;
      this.createdAt = new Date();
      // initialize other properties
    }
  
    // business logic methods
    // ...
  }
  
export default PostComment;