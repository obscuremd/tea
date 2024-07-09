import { SendDiagonal, Xmark } from "iconoir-react"
import { isMobile, Shared, Url } from "../assets/Shared"
import { useRecoilState, useRecoilValue } from "recoil"
import { CommentId, CommentState } from "../state/atoms/CommentState"
import { motion } from "framer-motion"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import empty from '../assets/profile.png'
import { useClerk } from "@clerk/clerk-react"
import { ring } from 'ldrs'
import Logo from '../assets/LOGO.svg'
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

ring.register()

const Comments =()=>{

    const {user} = useClerk()

    const [ isCommentVisible, setCommentVisible]= useRecoilState(CommentState)
    const commentId = useRecoilValue(CommentId)
    const [comments, setComments] = useState<comments | []>()
    const [comment, setComment] = useState('')

    const [fetchingComments, setFetchingComments] = useState(false)
    const [creatingPost, setCreatingPost] = useState(false)

    const postComment = async()=>{
        setCreatingPost(true)
        if(!comment){
            setCreatingPost(false)
            toast.error('please provide a comment')
        }else{
            try {
                const res = await axios.post(`${Url}/api/comment/${commentId}`,{email:user?.emailAddresses[0].emailAddress, text:comment})
                const data = res.data
                const modifiedData = {
                    ...data,
                    user:{
                        username: user?.username,
                        profilePicture: user?.imageUrl
                    }
                };
                console.log(modifiedData);
                setComments((prevComments) => (prevComments ? [...prevComments, modifiedData] : [modifiedData]));
                setCreatingPost(false);
            } catch (error) {
                toast.error('error')
                setCreatingPost(false)
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        const fetchComments = async()=>{
            setFetchingComments(true)
            try {
                
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
                setFetchingComments(false)
            } catch (error) {
                toast.error('error')
            }
        }

        fetchComments()
    },[])

return (
    <motion.div  className="fixed top-10 w-full h-full flex justify-center items-end bg-[#2020209d] md:p-5 pb-[10%] pr-[5%] backdrop-filter backdrop-blur-sm">
        <motion.div
            initial={{y:'100%'}} animate={{y:0}} 
            className='md:max-h-[90%] max-h-[70%] md:w-[50%] w-full border-[1px] border-[#62668980] bg-[#292b3bb4] backdrop-blur-lg md:py-12 md:px-8 py-2 px-2 inline-flex flex-col items-center md:gap-5 gap-2 rounded-[13px]'>
            
            <p style={{fontSize:Shared.Text.xl}} className="font-bold flex items-center">
                Comments
                <button onClick={()=>setCommentVisible(!isCommentVisible)}>
                    <Xmark/>
                </button>
            </p>

            {fetchingComments
                ?<div className="flex flex-col gap-10 justify-center items-center">
                    <img src={Logo} alt="" className='md:w-[25%] w-[40%]' />
                    <l-line-wobble size={isMobile?"200" :"500"} stroke="5" bg-opacity="0.1" speed="1.75" color="#572E56" />
                </div>
                :<div className="flex w-full flex-col md:gap-5 gap-2 max-h-[100%] overflow-scroll">
                    {comments?.length === 0 
                        ?<p>no comments yet</p>
                        :comments && comments.map((item,index)=>(
                            <div className="md:w-full w-full md:p-5 p-3 bg-[#62668934] border-[1px] border-[#62668980] rounded-[13px] flex flex-col gap-2" key={index}>
                                {/* picture and name */}
                                <div className="flex gap-[2%] items-center">
                                    <img src={item.user.profilePicture || empty} alt="" className="w-8 rounded-full" />
                                    <p style={{fontSize:Shared.Text.large}} className="font-bold">{item.user.username}</p>
                                </div>
                            {/* comment */}
                            <p style={{fontSize:Shared.Text.small}} className="font-bold">{item.text}</p>
                            </div>
                    )) }
                </div>}
            {/* add comment */}
            <div className="flex items-center gap-2 md:gap-4 w-full">
                <textarea  placeholder='add a comment' onChange={(e)=>setComment(e.target.value)} style={{fontSize:Shared.Text.small}} className=" p-3 w-full min-w-[30vw] rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]" />
                <button onClick={postComment} style={{fontSize:Shared.Text.small}} className="p-3 flex justify-center items-center  rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]">
                    {creatingPost
                        ?<l-ring size="20" stroke="5" bg-opacity="0" speed="2" color="white" />
                        :<SendDiagonal/>
                    }
                </button>
            </div>
        </motion.div>
    </motion.div>
)
}

export default Comments