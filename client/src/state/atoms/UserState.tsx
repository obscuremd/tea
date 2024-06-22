import { atom } from "recoil";

export const UserState = atom({
    key: "user",
    default: []
    
})

export const ActiveUserState = atom({
    key: "activeUser",
    default: false
    // default:true
})