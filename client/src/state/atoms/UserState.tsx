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

export const UserState = atom<User | null>({
    key: "user",
    default: null
    
})

export const ActiveUserState = atom({
    key: "activeUser",
    default: false
    // default:true
})