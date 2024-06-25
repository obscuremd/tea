import { useEffect, useState } from 'react'
import { gradient, isMobile, Shared, Url } from '../../assets/Shared'
import { Users } from '../../assets/Data'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useClerk } from '@clerk/clerk-react'
import { useRecoilState } from 'recoil'
import { FetchLoading, FetchPosts, UserPosts } from '../../state/atoms/UserPostsState'



const Hero= () => {

    const [userPosts, setUserPosts] = useRecoilState(UserPosts)
    const [fetchPosts, setFetchPosts] = useRecoilState(FetchPosts)
    const [loading, setLoading] = useRecoilState(FetchLoading)

    const {user} = useClerk()

    userPosts
    fetchPosts
    loading


    const trending = async () => {
        setLoading(true)
        setFeed(0)
        const res = await axios.get(`${Url}/api/post/`);
        const sortedPost = res.data.sort((p1, p2) => { return new Date(p2.likes.length) - new Date(p1.likes.length) })
        setUserPosts(sortedPost); // Update state with fetched posts
        setFetchPosts(trending)
        setLoading(false)
    }
    const following = async () => {
        setLoading(true)
        setFeed(1)
        // const res = await axios.get(`/api/timeline/${user._id}`);
        const res = await axios.get('/api/post/');
        const sortedPost = res.data.sort((p1, p2) => { return new Date(p2.createdAt) - new Date(p1.createdAt) })
        setUserPosts(sortedPost); // Update state with fetched posts
        setFetchPosts(following)
        setLoading(false)

    }
    const nearby = async () => {
        setLoading(true)
        setFeed(2)
        const res = await axios.get('/api/post/');
        const sortedPost = res.data.sort((p1, p2) => { return new Date(p1.createdAt) - new Date(p2.createdAt) })
        setUserPosts(sortedPost); // Update state with fetched posts
        setFetchPosts(nearby)
        setLoading(false)
    }

    useEffect(() => {
        setFetchPosts(trending)
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
                <motion.input initial={{ x: '50%', opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.4 } }} whileFocus={{ borderColor: '#797da9' }} type="text" placeholder="Find The Tea" style={{ fontSize: Shared.Text.small }} className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none" />
            </div>

            {/* options */}
            <motion.div initial={{ x: '50%', opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.5 } }} className="w-fit md:p-2 px-[5px] py-1 bg-[#292B3B] border-[1px] flex gap-4 border-[#62668980] md:rounded-2xl rounded-xl">
                {feedTypes.map(({ id, label, func }) => (
                    <motion.button
                        key={id}
                        onClick={func}
                        style={{
                            background: feed === id && gradient,
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