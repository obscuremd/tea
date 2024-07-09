import { SendDiagonal, Xmark } from "iconoir-react"
import { Shared, Url } from "../assets/Shared"
import { useRecoilState, useRecoilValue } from "recoil"
import { CommentId, CommentState } from "../state/atoms/CommentState"
import { motion } from "framer-motion"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import empty from '../assets/profile.png'
import { useClerk } from "@clerk/clerk-react"

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
interface comment{
    postId:string,
    text:string,
    email:string
    user:User
}

type comments = comment[]

const Comments =()=>{

    const {user} = useClerk()

    const [ isCommentVisible, setCommentVisible]= useRecoilState(CommentState)
    const commentId = useRecoilValue(CommentId)
    const [comments, setComments] = useState<comments | []>()
    const [comment, setComment] = useState('')
    const [currentComment, setCurrentComment] = useState({})

    // console.log(currentComment)

    const postComment = async()=>{
        try {
            const res = await axios.post(`${Url}/api/comment/${commentId}`,{email:user?.emailAddresses[0].emailAddress, text:comment})
            const data = res.data
            const modifiedData = {
                data,
                user:{
                    username: user?.username,
                    profilePicture: user?.imageUrl
                }
            };
            console.log(modifiedData);
            setCurrentComment(modifiedData)
        } catch (error) {
            toast.error('error')
            console.log(error)
        }
    }

    useEffect(()=>{
        const fetchComments = async()=>{
            const res = await axios.get(`${Url}/api/comment/${commentId}`)
            const data:comments = res.data
            const userPromises = data.map(comm => axios.get(`${Url}/api/user/${comm.email}`))
            const userResponses = await Promise.all(userPromises)
            const users = userResponses.map(response => response.data);

            const commentWithUser = data.map((comment, index) => ({
                ...comment,
                user: users[index],
            }));
            setComments(commentWithUser)
        }

        fetchComments()
    },[])

return (
    <motion.div  className="fixed top-10 w-full h-full flex justify-center md:items-center items-end bg-[#2020209d] md:p-5 pb-[10%] pr-[5%] backdrop-filter backdrop-blur-sm">
        <motion.div
            initial={{y:'100%'}} animate={{y:0}} 
            className='md:max-h-[90%] max-h-[70%] bg-[#292B3B] md:py-12 md:px-8 py-2 px-2 inline-flex flex-col items-center md:gap-5 gap-2 rounded-[13px]'>
            
            <p style={{fontSize:Shared.Text.xl}} className="font-bold flex items-center">
                Comments
                <button onClick={()=>setCommentVisible(!isCommentVisible)}>
                    <Xmark/>
                </button>
            </p>

            <div className="flex flex-col md:gap-5 gap-2 max-h-[100%] overflow-scroll">
                {comments?.length === 0 
                    ?<p>no posts yet</p>
                    :comments && comments.map((item,index)=>(
                    <div className="md:w-[640px] p-5 bg-[#62668980] rounded-[13px] flex flex-col gap-2" key={index}>
                        {/* picture and name */}
                        <div className="flex gap-[2%] items-center">
                            <img src={item.user.profilePicture || empty} alt="" className="w-8 rounded-full" />
                            <p style={{fontSize:Shared.Text.large}} className="font-bold">{item.user.username}</p>
                        </div>

                        {/* comment */}
                        <p style={{fontSize:Shared.Text.small}} className="font-bold">{item.text}</p>
                    </div>
                )) }
            </div>
            {/* add comment */}
            <div className="flex items-center gap-2 md:gap-4 w-full">
                <textarea  placeholder='add a comment' onChange={(e)=>setComment(e.target.value)} style={{fontSize:Shared.Text.small}} className=" p-3 w-full min-w-[30vw] rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]" />
                <button onClick={postComment} style={{fontSize:Shared.Text.small}} className="p-3 flex justify-center items-center  rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]">
                    <SendDiagonal/>
                </button>
            </div>
        </motion.div>
    </motion.div>
)
}

export default Comments