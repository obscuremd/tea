import { Bin, Bookmark, Heart, HeartSolid, MapPin, MessageText, MoreHoriz, ShareAndroid, UserPlus, UserXmark } from "iconoir-react"
import { Shared, ToasterStyle, Url } from "../assets/Shared"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { CommentState } from "../state/atoms/CommentState"
import axios from "axios"
import { Link } from "react-router-dom"
import profile from '../assets/profile.png'
import { UserState } from "../state/atoms/UserState"
import { AnimatePresence, motion } from "framer-motion"
import toast, { Toaster } from 'react-hot-toast'

interface Props{
    profilePicture:string, 
    username:string, 
    like:string, 
    photo:string, 
    desc:string, 
    comment:string, 
    date:string, 
    postsDetails:string, 
    fetchPosts
}

interface MenuButtonProps{
    icon: React.ReactNode, 
    text: string, 
    func: ()=>void, 
    extra?: string
}

const Post:React.FC<Props> = ({ profilePicture, username, like, photo, desc, comment, date, postsDetails, fetchPosts }) => {

    const user = useRecoilValue(UserState)
    const [activeMenu, setActiveMenu] = useState(false)
    const [isCommentVisible, setCommentVisible] = useRecoilState(CommentState)
    const photos = photo
    const isMobile = window.innerWidth < 768
    const windows = window.innerHeight - (isMobile ? 500 : 200)
    const [isLiked, setIsLiked] = useState(false)
    // const [likes, setLikes] =useState(like)

    const posts = postsDetails
    const [users, setUsers] = useState()

    // console.log(user._id);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`${Url}/api/users?userId=${posts.userId}`)
            setUsers(res.data)
        }

        setIsLiked(posts && posts.likes && posts.likes.includes(user._id))
        fetchUsers()
    }, [])

    const followUser = async () => {
        // console.log(user.following)
        if (user._id === posts.userId) {
            toast.error("you can't follow yourself")
        } else {
            try {
                await axios.put(`${Url}/api/users/${user._id}/follow`, { userId: posts.userId })
                toast.success(`${users.username} followed`)
                fetchPosts()
            } catch (error) {
                if (error.response.status === 403) {
                    toast.error(`you already follow ${users.username}`)
                }
                else {
                    toast.error('error')
                    console.log(error)
                }
            }
        }

    }

    const UnFollowUser = async () => {
        if (user._id === posts.userId) {
            toast.error("you can't unfollow yourself")
        } else {
            try {
                await axios.put(`${Url}/api/users/${user._id}/unfollow`, { userId: posts.userId })
                toast.success(`${users.username} unfollowed`)
                fetchPosts()
            } catch (error) {
                if (error.response.status === 403) {
                    toast.error(`you don't follow ${users.username}`)
                }
                else {
                    toast.error('error')
                    console.log(error)
                }
            }
        }
    }

    const handleLike = async () => {
        try {
            await axios.put(`${Url}/api/posts/${posts._id}/likes`, { userId: user._id });
            fetchPosts();
            setIsLiked(prevIsLiked => !prevIsLiked);
        } catch (error) {
            console.log(error);
        }
    };

    const DeletePost = async () => {
        if (user._id !== posts.userId) {
            toast.error("you can only delete your Posts")
        } else {
            try {
                await axios.delete(`/api/posts/${posts._id}`, { userId: user._id });
                toast.success("Post")
                fetchPosts()
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
                <Link to={`/Userprofile/${users?.username}`}>
                    <div className="flex items-center gap-3">
                        <img src={users?.profilePicture || profile} alt="" className="w-9 h-9 object-cover rounded-full bg-[#ffffff25]" />
                        <div className="">
                            <p style={{ fontSize: Shared.Text.large }} className="font-bold capitalize">{users?.username || 'Unknown'}</p>
                            <p className="text-[#FFFFFF80] flex items-center font-medium" style={{ fontSize: Shared.Text.small }}><MapPin height={Shared.Text.small} color="FFFFFF80" />{date}</p>
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

                                <MenuButton icon={<UserPlus />} text={'Follow'} func={followUser} />

                                <MenuButton icon={<Bookmark />} text={'Save'} func={UnFollowUser} />
                                <MenuButton icon={<ShareAndroid />} text={'Share'} func={followUser} />
                                <MenuButton icon={<UserXmark />} text={'Unfollow'} func={UnFollowUser} extra= 'text-[#e36db0]' />
                                {user._id === posts.userId &&
                                    <MenuButton icon={<Bin />} text={'Delete'} func={DeletePost} extra= 'text-[#e36db0]' />
                                }
                            </motion.div>}
                    </AnimatePresence>

                    <button onClick={handleLike} className="flex items-center py-1 px-2 rounded-2xl bg-[#FFFFFF1A] gap-1" style={{ fontSize: Shared.Text.small }}>
                        {isLiked ? <HeartSolid color="#D64975" /> : <Heart />}
                        <p>{like}</p>
                    </button>
                </div>
            </div>


            {/* image Post */}
            {
                photos &&
                <img src={photo} alt="" className="w-full object-cover md:mt-12 mt-2 rounded-xl" style={{ height: windows }} />
            }


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