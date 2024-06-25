import { atom } from "recoil";

export const UserPosts =atom({
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