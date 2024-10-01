interface Post {
    _id: string;
    desc: string;
    email: string;
    image: string;
    likes: string[];
    location: string;
    comments: string[];
    createdAt: string;
    updatedAt: string;
    user: User;
    __v: number;
  }