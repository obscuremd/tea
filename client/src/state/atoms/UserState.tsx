import { atom } from "recoil";

export const UserState = atom<User | null>({
    key: "user",
    default: null
    
})

export const UserFetching = atom({
    key:"userFetching",
    default:false
})

export const ActiveUserState = atom({
    key: "activeUser",
    default: false
    // default:true
})

export const ProfileFeedState = atom({
    key: "profileFeed",
    default: 0
})