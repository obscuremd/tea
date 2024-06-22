import PropTypes from 'prop-types';
import { Posts, Users } from '../../assets/Data'
import Post from '../Post'
import FriendsMobile from '../FriendsMobile'
import Friends from '../Friends'
import { useRecoilValue } from 'recoil'
import { FriendsState } from '../../state/atoms/FriendsState'

const ProfileFeed = ({isMobile}) => {

    const friendState = useRecoilValue(FriendsState)

    const UserPosts =()=>{
        return(
            <div className='flex flex-col md:gap-12 gap-6'>
                {Posts.map((item, index)=>(
                    Users[item.id]&&
                    <Post key={index} 
                        photo={item.photo} 
                        date={item.date}
                        profilePicture={Users[item.userId].profilePicture} 
                        comment={item.comment} 
                        desc={item.desc} 
                        like={item.like} 
                        username={Users[item.userId].username}/>
                ))}
            </div>
        )
    }

  return (

    <div className='flex gap-7'>
        <UserPosts/>

        {isMobile && friendState ?
              <FriendsMobile/>:
              <div className={isMobile && 'hidden'}>
                <Friends/>
              </div>
            }
    </div>
  )
}

ProfileFeed.propTypes = {
  isMobile: PropTypes.string
}

export default ProfileFeed