import PropTypes from 'prop-types';
import Post from '../Post'
import FriendsMobile from '../FriendsMobile'
import Friends from '../Friends'
import { useRecoilValue } from 'recoil'
import { FriendsState } from '../../state/atoms/FriendsState'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserState } from '../../state/atoms/UserState';
import { isMobile, Url } from '../../assets/Shared';

const ProfileFeed = () => {

  const [userPosts, setUserPosts] = useState([])
  const friendState = useRecoilValue(FriendsState)
  const user = useRecoilValue(UserState)

  const fetchPosts = async () => {
    const res = await axios.get(`${Url}/api/posts/profile/${user?.username}`);
    setUserPosts(res.data); // Update state with fetched posts
  }

  useEffect(() => { fetchPosts() }, [])

  const UserPosts = () => {
    return (
      <div className='flex flex-col md:gap-12 gap-6'>



        {userPosts.length === 0
          ? <p className='md:w-[50vw] w-screen text-center'>No Posts yet</p>
          : (userPosts.map((item, index) => (
            <Post key={index}
              photo={item?.image}
              date={item?.createdAt}
              // profilePicture={Users[item.userId].profilePicture} 
              // comment={item.comment} 
              desc={item?.desc}
              like={item?.like}
              postsDetails={item}
              fetchPosts={fetchPosts}
            // username={Users[item.userId].username}
            />
          )))
        }

      </div>
    )
  }

  return (

    <div className='flex gap-7'>
      <UserPosts />

      {isMobile && friendState ?
        <FriendsMobile /> :
        <div className={isMobile && 'hidden'}>
          <Friends />
        </div>
      }
    </div>
  )
}

ProfileFeed.propTypes = {
  isMobile: PropTypes.any
}

export default ProfileFeed