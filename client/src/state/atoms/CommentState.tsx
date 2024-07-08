import { atom }from 'recoil'

export const CommentState = atom({
    key: 'comment',
    default: false
})

export const CommentId = atom({
    key: "commentId",
    default:''
})

export const CommentCount = atom({
    key: "commentCount",
    default: []
})