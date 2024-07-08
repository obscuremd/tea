import { atom }from 'recoil'

export const CommentState = atom({
    key: 'comment',
    default: false
})

export const CommentId = atom({
    key: "commentId",
    default:''
})