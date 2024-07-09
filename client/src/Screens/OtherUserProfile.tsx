import Hero from '../Components/OtherUserComponents/Hero';
import ProfileFeed from '../Components/OtherUserComponents/ProfileFeed';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../assets/LOGO.svg'
import { isMobile, Url } from '../assets/Shared';

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
  comments: string[];
  createdAt: string;
  updatedAt: string;
  user: User;
  __v: number;
}

type UserPosts = Post[];

const OtherUserProfile = () => {

  const username = useParams()
  const [posts, setPosts] = useState<UserPosts | null>(null)
  const [user, setUser] = useState<User | null>(null)


  useEffect(() => {
    
    const fetchUser = async () => {
      const res = await axios.get(`${Url}/api/user/username/${username.username}`)
      setUser(res.data);
      console.log(res.data)
    }

    const fetchPosts = async () => {
      const res = await axios.get(`${Url}/api/post/${username.username}`)
      const sortedPost: Post[] = res.data.sort((p1: Post, p2: Post) => {
        const date1 = new Date(p1.createdAt).getTime();
        const date2 = new Date(p2.createdAt).getTime();
        return date2 - date1;
      });
      const userPromises = sortedPost.map(post => axios.get(`${Url}/api/user/${post.email}`))
      const userResponses = await Promise.all(userPromises) 
      const users = userResponses.map(response => response.data);
      const postsWithUser = sortedPost.map((post, index) => ({
          ...post,
          user: users[index],
      }));


      setPosts(postsWithUser);
    }

    fetchPosts()
    fetchUser()
  }, [])

  if(!user || !posts){
    return(
      <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
        <img src={Logo} alt="" className='md:w-[25%] w-[40%]' />
        <l-line-wobble size={isMobile?"200" :"500"} stroke="5" bg-opacity="0.1" speed="1.75" color="#572E56" />
      </div>
    )
  }

  return (
    <div className={isMobile ? 'ml-0' : 'mr-[4%] flex flex-col'}>
      <Hero data={user} post={posts?.length} />
      <ProfileFeed posts={posts} user={user}/>
    </div>
  )
}


export default OtherUserProfile