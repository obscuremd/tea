import FriendsMobile from '../../Atoms/FriendsMobile'
import Friends from '../../Atoms/Friends'
import { useRecoilValue } from 'recoil'
import { FriendsState } from '../../state/atoms/FriendsState'
import { isMobile } from '../../assets/Shared';
import Post from '../../Atoms/Post';

interface Props{
  posts:[]
}
const ProfileFeed:React.FC<Props> = ({posts}) => {

    const friendState = useRecoilValue(FriendsState)

    const UserPosts =()=>{
        return(
            <div className='flex flex-col md:gap-12 gap-6'>
                {/* {posts.map((item, index)=>(
                    <Post key={index} 
                        photo={item.photo} 
                        date={item.date}
                        // profilePicture={Users[item.userId].profilePicture} 
                        comment={item.comment} 
                        desc={item.desc} 
                        like={item.like} 
                        username={Users[item.userId].username}/>
                ))} */}
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