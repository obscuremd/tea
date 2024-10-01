import { atom } from "recoil";

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

