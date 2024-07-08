import { atom } from "recoil";

interface User {
    _id: string;
    email: string;
    fullName: string;
    username: string;
    bio: string;
    coverPicture: string;
    profilePicture: string;
    location: string;
    gender: string;
    followers: string[];
    following: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  interface Post {
    _id: string;
    desc: string;
    email: string;
    image: string;
    likes: string[];
    location: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    __v: number;
  }
  
  type UserPosts = Post[];


export const UserPosts =atom<UserPosts | []>({
    key: "userPost",
    default:[]
})

export const FetchPosts = atom({
    key: "fetchPosts",
    default:''
})

export const FetchLoading = atom({
    key: "fetchLoading",
    default:false
})

