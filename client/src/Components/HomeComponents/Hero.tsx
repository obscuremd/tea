import { useEffect, useState } from 'react'
import { gradient, isMobile, Shared, Url } from '../../assets/Shared'
import { Users } from '../../assets/Data'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useClerk } from '@clerk/clerk-react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FetchLoading, UserPosts } from '../../state/atoms/UserPostsState'
import toast from 'react-hot-toast'
import { UserState } from '../../state/atoms/UserState'
import { Input } from '../../Atoms/Inputs/Input'


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
interface Post {
    _id: string;
    desc: string;
    email: string;
    image: string;
    likes: string[];
    location: string;
    comments:[],
    createdAt: string;
    updatedAt: string;
    user: User;
    __v: number;
  }

const Hero= () => {

    const [userPosts, setUserPosts] = useRecoilState(UserPosts)
    const [loading, setLoading] = useRecoilState(FetchLoading)

    const {user} = useClerk()
    const MongoUser = useRecoilValue(UserState)

    userPosts
    loading

    const trending = async () => {
        setLoading(true)
        setFeed(0)
        try {
            const res = await axios.get(`${Url}/api/post/`);
            const sortedPost:Post[] = res.data.sort((p1:Post, p2:Post) => p2.likes.length - p1.likes.length);
            const userPromises = sortedPost.map(post => axios.get(`${Url}/api/user/${post.email}`))
            const userResponses = await Promise.all(userPromises) 
            const users = userResponses.map(response => response.data);

            const postsWithUser = sortedPost.map((post, index) => ({
                ...post,
                user: users[index],
            }));
    
            console.log(postsWithUser);

            setUserPosts(postsWithUser);
            setLoading(false)
        } catch (error) {
            toast.error('error')
        }
    }

    const following = async () => {
        setLoading(true)
        setFeed(1)
        try {
            const res = await axios.get(`${Url}/api/post/timeline/${user?.emailAddresses[0].emailAddress}`);
            const sortedPost:Post[] = res.data.sort((p1:Post, p2:Post) => p2.likes.length - p1.likes.length);
            const userPromises = sortedPost.map(post => axios.get(`${Url}/api/user/${post.email}`))
            const userResponses = await Promise.all(userPromises) 
            const users = userResponses.map(response => response.data);

            const postsWithUser = sortedPost.map((post, index) => ({
                ...post,
                user: users[index],
            }));
    
            console.log(postsWithUser);

            setUserPosts(postsWithUser);
            setLoading(false)
        } catch (error) {
            toast.error('error')
        }
    }

    const nearby = async () => {
        
        const location = MongoUser?.location.toLowerCase()
        if(!location){
            return
        }

        setLoading(true)
        setFeed(2)
        try {
            const res = await axios.get(`${Url}/api/post/`);
            const sortedPost:Post[] = res.data.sort((p1:Post, p2:Post) => p2.likes.length - p1.likes.length);
            const userPromises = sortedPost.map(post => axios.get(`${Url}/api/user/${post.email}`))
            const userResponses = await Promise.all(userPromises) 
            const users = userResponses.map(response => response.data);

            const postsWithUser = sortedPost.map((post, index) => ({
                ...post,
                user: users[index],
            })).filter(post => post.location.toLowerCase() === location);
    
            console.log(postsWithUser);

            setUserPosts(postsWithUser);
            setLoading(false)
        } catch (error) {
            toast.error('error')
        }
    }

    useEffect(() => {
        trending()
    }, [])

    const [feed, setFeed] = useState(0)

    const feedTypes = [
        { id: 0, label: "Trending", func: trending },
        { id: 1, label: "Following", func: following },
        { id: 2, label: "Nearby", func: nearby }
    ];
    
    return (
        <div className="flex flex-col md:gap-12 gap-6 w-full">
            {/* text */}
            <div>
                <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }} style={{ fontSize: Shared.Text.xl, fontWeight: 'bold', textTransform: 'capitalize' }}>Hello {user?.username} 😃</motion.p>
                <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.2 } }} style={{ fontSize: Shared.Text.large, fontWeight: '400' }}>what’s the tea ?</motion.p>
            </div>

            {/* search */}
            <div className="flex items-center gap-2 md:gap-4">
                <motion.img initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { delay: 0.3 } }} src={Users[0].profilePicture} alt="" className="md:w-12 w-7 md:h-12 h-7 rounded-full object-cover" />
                <Input placeholder='FInd the tea' size='small' type='text' onChange={()=>console.log(2)}/>
            </div>

            {/* options */}
            <motion.div initial={{ x: '50%', opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }} className="w-fit md:p-2 px-[5px] py-1 bg-[#292B3B] border-[1px] flex gap-4 border-[#62668980] md:rounded-2xl rounded-xl">
                {feedTypes.map(({ id, label, func }) => (
                    <motion.button
                        key={id}
                        onClick={func}
                        style={{
                            background: feed === id ? gradient : "transparent",
                            fontSize: isMobile ? '0.6rem' : '1.2rem',
                            borderWidth: feed === id ? 1 : 0
                        }}
                        className="md:px-12 md:py-2 px-3 py-1 border-[#626689] md:rounded-xl rounded-lg font-bold"
                    >
                        {label}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    )
}

export default Hero