class User {
    email: string;
    firstName: string;
    userId: string;
    picture: string;
    role: string;
    token: string;
    posts: Array<string>;
    favoritePosts: Array<string>;
    friends: Array<string>;
    secretUserId: string;
    // other properties
  
    constructor(email: string, firstName: string, userId: string, picture:string, role:string, token:string,
                posts: Array<string>, favoritePosts: Array<string>, friends: Array<string>, secretUserId: string) {
        this.email = email;
        this.firstName = firstName;
        this.userId = userId;
        this.picture = picture;
        this.role = role;
        this.token = token;
        this.posts = posts;
        this.favoritePosts = favoritePosts;
        this.friends = friends;
        this.secretUserId = secretUserId;
    }

   
  }
  
  export default User;