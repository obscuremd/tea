import Friends from '../Atoms/Friends'
import { FriendsState } from '../state/atoms/FriendsState'
import { useRecoilValue } from 'recoil'
import FriendsMobile from '../Atoms/FriendsMobile'
import Feed from '../Components/HomeComponents/Feed'
import { isMobile } from '../assets/Shared'

const Home = () => {

  const friendState = useRecoilValue(FriendsState)

  return (
    <div className={isMobile? 'ml-0':' mr-[4%] flex gap-10'}>
          <Feed/>

            {isMobile && friendState 
              ? <FriendsMobile/>
              : <Friends/>
            }
    </div>
  )
}


export default Home