import { Bin, Bookmark, Heart, HeartSolid, MapPin, MessageText, MoreHoriz, ShareAndroid, UserPlus, UserXmark } from "iconoir-react"
import { Shared, ToasterStyle, Url } from "../assets/Shared"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { CommentState } from "../state/atoms/CommentState"
import axios from "axios"
import { Link } from "react-router-dom"
import profile from '../assets/profile.png'
import { AnimatePresence, motion } from "framer-motion"
import toast, { Toaster } from 'react-hot-toast'
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
interface posts{
    _id: string;
    desc: string;
    email: string;
    image: string;
    likes: string[];
    location: string;
    createdAt: string;
    updatedAt: string;
    user:User,
    __v: number;
}
interface Props {
    profilePicture: string;
    username: string;
    like: number;
    photo: string;
    desc: string;
    comment: string;
    date: string;
    postsDetails: posts;
}

interface MenuButtonProps{
    icon: React.ReactNode, 
    text: string, 
    func: ()=>void, 
    extra?: string
}



const Post:React.FC<Props> = ({ profilePicture, username, like, photo, desc, comment, date, postsDetails }) => {

    // active states
    const [activeMenu, setActiveMenu] = useState(false)
    const [isCommentVisible, setCommentVisible] = useRecoilState(CommentState)
    const [following , setFollowing] = useState(false)
    
    // mobile config
    const isMobile = window.innerWidth < 768
    const windows = window.innerHeight - (isMobile ? 500 : 200)
    
    // likes
    const [likes, setLikes] =useState(false)
    const [likeCount, setLikeCount] = useState(like)

    // post defaults
    const posts = postsDetails
    // user
    const {user} = useClerk()


    // user email
    const email = user?.emailAddresses[0].emailAddress

    useEffect(()=>{
        if(posts?.likes.includes(email || '')){
            setLikes(true)
        }else{
            setLikes(false)
        }

        if(posts.user.followers.includes(email || '')){
            setFollowing(true)
        }else{
            setFollowing(false)
        }
    },[posts])



    const followUser = async () => {
        console.log(email)
        if (email === posts.email) {
            toast.error("you can't follow yourself")
        } else {
            try {
                const res = await axios.put(`${Url}/api/user/follow/${email}`, { email: posts.email })
                console.log(res.data)

                if(res.data === 'user followed'){
                    toast.success(`${posts.user.username} followed`)
                    setFollowing(true)
                }else if (res.data === 'user unfollowed'){
                    toast.success(`${posts.user.username} unfollowed`)
                    setFollowing(false)
                }
            } catch (error) {
                toast.error('error')
                console.log(error)
            }
        }
    }

    const handleLike = async () => {

        setLikes(!likes)
        likes 
            ? setLikeCount(like - 1) 
            : setLikeCount(like + 1)

        try {
            await axios.put(`${Url}/api/post/${posts._id}/likes`, { email });
            toast.success('liked')
        } catch (error) {
            console.log(error);
            toast.error('error')
        }
    };

    const DeletePost = async () => {
        if (email !== posts.email) {
            toast.error("you can only delete your Posts")
        } else {
            try {
                await axios.delete(`${Url}/api/post/${posts._id}`,{data:{email:email}});
                toast.success("Post deleted successfully")
                window.location.reload()
            } catch (error) {
                toast.error('error')
                console.log(error);
            }
        }
    }

    const MenuButton:React.FC<MenuButtonProps> = ({ icon, text, func, extra }) => (
        <motion.button
            onClick={func}
            whileHover={{ backgroundColor: '#62668980', borderColor: '#626689' }}
            className={`flex gap-4 p-2 border-[1px] border-transparent rounded-lg ${extra}`}> {icon} {text}</motion.button>
    )


    return (
        <div className="box w-full min-w-[55vw]  rounded-[13px] px-5 py-3">
            <Toaster toastOptions={{ style: ToasterStyle }} />
            {/* Profile and likes */}
            <div className="flex justify-between">
                {/* profile */}
                <Link to={`/Userprofile/${username}`}>
                    <div className="flex items-center gap-3">
                        <img src={profilePicture || profile} alt="" className="w-9 h-9 object-cover rounded-full bg-[#ffffff25]" />
                        <div className="">
                            <p style={{ fontSize: Shared.Text.large }} className="font-bold capitalize">{username || 'Unknown'}</p>
                            <p className="text-[#FFFFFF80] flex items-center font-medium capitalize" style={{ fontSize: Shared.Text.small }}><MapPin height={Shared.Text.small} color="FFFFFF80" />{date}</p>
                        </div>
                    </div>
                </Link>

                {/* likes and more */}
                <div className="relative flex flex-col items-end">
                    <button onClick={() => setActiveMenu(!activeMenu)}>
                        <MoreHoriz />
                    </button>

                    <AnimatePresence>
                        {activeMenu &&
                            <motion.div
                                initial={{ y: '-50%', opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="absolute top-5 bg-[#454862c9] border-[1px] border-[#626689] p-5 backdrop-blur-lg flex flex-col gap-2 rounded-xl"
                                style={{ fontSize: Shared.Text.small }}>

                                {!following && email !== posts.email && <MenuButton icon={<UserPlus />} text={'Follow'} func={followUser} />}
                                {following && email !== posts.email && <MenuButton icon={<UserXmark />} text={'Unfollow'} func={followUser} extra= 'text-[#e36db0]' />}

                                <MenuButton icon={<Bookmark />} text={'Save'} func={followUser} />
                                <MenuButton icon={<ShareAndroid />} text={'Share'} func={followUser} />
                                {email === posts.email &&
                                    <MenuButton icon={<Bin />} text={'Delete'} func={DeletePost} extra= 'text-[#e36db0]' />
                                }
                            </motion.div>}
                    </AnimatePresence>

                    <button onClick={handleLike} className="flex items-center py-1 px-2 rounded-2xl bg-[#FFFFFF1A] gap-1" style={{ fontSize: Shared.Text.small }}>
                        {likes ? <HeartSolid color="#D64975" /> : <Heart />}
                        <p>{likeCount}</p>
                    </button>
                </div>
            </div>


            {/* image Post */}
            <img src={photo} alt="" className="w-full object-cover md:mt-12 mt-2 rounded-xl" style={{ height: windows }} />


            {/* desc */}
            <div
                style={{ background: 'linear-gradient(129deg, #D64975 -54.57%, #152046 94.11%)', fontSize: Shared.Text.small }}
                className="md:p-5 p-2 md:mt-12 mt-2 border-[1px] border-[#626689] rounded-xl font-bold">
                <p>{desc}</p>
                <button onClick={() => setCommentVisible(!isCommentVisible)} className="md:p-2 p-1 bg-[#82828280] inline-flex gap-1 rounded-3xl md:mt-6 mt-3">
                    <MessageText />
                    <p>{comment} Comments</p>
                </button>
            </div>
        </div>
    )
}

export default Post