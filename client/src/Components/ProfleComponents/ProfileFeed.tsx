import Post from '../../Atoms/Post'
import FriendsMobile from '../../Atoms/FriendsMobile'
import Friends from '../../Atoms/Friends'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FriendsState } from '../../state/atoms/FriendsState'
import { useEffect,} from 'react';
import axios from 'axios';
import { isMobile, Url } from '../../assets/Shared';
import { useClerk } from '@clerk/clerk-react';
import toast from 'react-hot-toast'
import { FetchLoading, UserPosts } from '../../state/atoms/UserPostsState';
import InfiniteScroll from 'react-infinite-scroll-component';
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


const ProfileFeed = () => {

  const [Posts, setPosts] = useRecoilState(UserPosts)
  const [loading, setLoading]= useRecoilState(FetchLoading)
  const friendState = useRecoilValue(FriendsState)
  const {user} = useClerk()

  const fetchPosts = async () => {
    setLoading(true)
        try {
            const res = await axios.get(`${Url}/api/post/profile/${user?.emailAddresses[0].emailAddress}`);
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
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error('error')
        }
  }

  useEffect(() => { fetchPosts() }, [])

  const UsersPosts = () => {
    return (
      <>
        {Posts && Posts.length === 0
          ? <p className='md:w-[50vw] w-screen text-center'>No Posts yet</p>
          :<InfiniteScroll
            className='flex flex-col md:gap-12 gap-6'
            dataLength={Posts.length} //This is important field to render the next data
            next={fetchPosts}
            hasMore={false}
            loader={<h4>Loading...</h4>}
            endMessage={ <p className='py-10 text-center'> <b>Yay! You have seen it all</b> </p> }
            >
            {Posts && Posts.map((item, index) => (
            <Post key={index}
                  photo={item?.image}
                  date={item?.location}
                  profilePicture={item.user.profilePicture}
                  comment={item.comments.length} 
                  desc={item?.desc}
                  like={item?.likes.length}
                  postsDetails={item}
                  username={item.user.username}
                />
          ))}
          </InfiniteScroll>
        }

      </>
    )
  }

  return (

    <div className='flex gap-7'>
      {loading
        ? <div className="w-full flex justify-center md:py-10 md:px-[10vw] py-[30vh]">
            <l-line-wobble size={isMobile?"200" :"500"} stroke="5" bg-opacity="0.1" speed="1.75" color="#572E56" />
          </div>
        :<UsersPosts />}

      {isMobile && friendState ?
        <FriendsMobile /> :
        <div className={isMobile ? 'hidden' :''}>
          <Friends />
        </div>
      }
    </div>
  )
}


export default ProfileFeed