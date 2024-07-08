import { SendDiagonal, Xmark } from "iconoir-react"
import { Posts, Users } from "../assets/Data"
import { Shared, Url } from "../assets/Shared"
import { useRecoilState, useRecoilValue } from "recoil"
import { CommentId, CommentState } from "../state/atoms/CommentState"
import { motion } from "framer-motion"
import axios from "axios"
import { useEffect } from "react"


const Comments =()=>{

    const [ isCommentVisible, setCommentVisible]= useRecoilState(CommentState)
    const commentId = useRecoilValue(CommentId)
    console.log(commentId)

    useEffect(()=>{
        const fetchComments = async()=>{
            const res = await axios.get(`${Url}/api/comment/${commentId}`)
            console.log(res.data)
        }

        fetchComments()
    },[])

return (
    <motion.div  className="fixed top-10 w-full h-full flex justify-center md:items-center items-end bg-[#2020209d] md:p-5 pb-[10%] pr-[5%] backdrop-filter backdrop-blur-sm">
        <motion.div
            initial={{y:'100%'}} animate={{y:0}} 
            className='md:h-[90%] h-[70%] bg-[#292B3B] md:py-12 md:px-8 py-2 px-2 inline-flex flex-col items-center md:gap-5 gap-2 rounded-[13px]'>
            
            <p style={{fontSize:Shared.Text.xl}} className="font-bold flex items-center">
                Comments
                <button onClick={()=>setCommentVisible(!isCommentVisible)}>
                    <Xmark/>
                </button>
            </p>

            <div className="flex flex-col md:gap-5 gap-2 max-h-[100%] overflow-scroll">
                {Users.map((item,index)=>(
                    <div className="md:w-[640px] p-5 bg-[#62668980] rounded-[13px] flex flex-col gap-2" key={index}>
                        {/* picture and name */}
                        <div className="flex gap-[2%] items-center">
                            <img src={item.profilePicture} alt="" className="md:w-8 w-6 md:h-8 h-6 rounded-full object-cover"/>
                            <p style={{fontSize:Shared.Text.large}} className="font-bold">{item.username}</p>
                        </div>

                        {/* comment */}
                        <p style={{fontSize:Shared.Text.small}} className="font-bold">{Posts[index].desc}</p>
                    </div>
                ))}
            </div>
            {/* add comment */}
            <div className="flex items-center gap-2 md:gap-4 w-full">
                <input type='text' placeholder='add a comment' style={{fontSize:Shared.Text.small}} className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]" />
                <button style={{fontSize:Shared.Text.small}} className="p-3 w-[10%] flex justify-center items-center  rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]">
                    <SendDiagonal/>
                </button>
            </div>
        </motion.div>
    </motion.div>
)
}

export default Comments