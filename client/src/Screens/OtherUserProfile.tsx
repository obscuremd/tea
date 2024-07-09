import Hero from '../Components/OtherUserComponents/Hero';
import ProfileFeed from '../Components/OtherUserComponents/ProfileFeed';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
  const [posts, setPosts] = useState<UserPosts | []>()

  console.log(username);

  useEffect(() => {
    

    const fetchPosts = async () => {
      const res = await axios.get(`${Url}/api/post/${username.username}`)
      const Post:Post[] = res.data
      const userPromises = Post.map(post => axios.get(`${Url}/api/user/${post.email}`))
      const userResponses = await Promise.all(userPromises) 
      const users = userResponses.map(response => response.data);

      const postsWithUser = Post.map((post, index) => ({
          ...post,
          user: users[index],
      }));

      setPosts(postsWithUser);
    }

    fetchPosts()
  }, [])

  return (
    <div className={isMobile ? 'ml-0' : 'mr-[4%] flex flex-col'}>
      <Hero data={posts} />
      <ProfileFeed posts={posts} />
    </div>
  )
}


export default OtherUserProfile