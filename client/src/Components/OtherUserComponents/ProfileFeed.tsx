import FriendsMobile from '../../Atoms/FriendsMobile'
import Friends from '../../Atoms/Friends'
import { useRecoilValue } from 'recoil'
import { FriendsState } from '../../state/atoms/FriendsState'
import { isMobile } from '../../assets/Shared';
import Post from '../../Atoms/Post';

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
  comments: string[];
  createdAt: string;
  updatedAt: string;
  user: User;
  __v: number;
}
interface Props{
  posts:posts[]
  user:User
}
const ProfileFeed:React.FC<Props> = ({posts, user}) => {

  console.log(posts)

    const friendState = useRecoilValue(FriendsState)

    const UserPosts =()=>{
        return(
            <div className='flex flex-col md:gap-12 gap-6'>
                {posts.map((item, index)=>(
                    <Post key={index} 
                        photo={item.image} 
                        date={item.location}
                        postsDetails={item}
                        profilePicture={user.profilePicture} 
                        comment={item.comments.length} 
                        desc={item.desc} 
                        like={item.likes.length} 
                        username={user.username}/>
                ))}
            </div>
        )
    }

  return (

    <div className='flex gap-7'>
        <UserPosts/>

        {isMobile && friendState ?
              <FriendsMobile/>:
              <div className={isMobile ? 'hidden' :''}>
                <Friends/>
              </div>
            }
    </div>
  )
}



export default ProfileFeed