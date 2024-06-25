import { HomeSimple, Plus } from "iconoir-react"
import { Users } from "../assets/Data"
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil"
import { CreatePostState } from "../state/atoms/CreatePostState"
import { gradient } from "../assets/Shared"


const NavBarMobile = () => {

  const [isCreatePostVisible, setCreatePostVisible] = useRecoilState(CreatePostState)

  return (
    <div className='box sticky bottom-0 w-full px-20 py-4 flex justify-center items-center'>
      <div className="inline-flex justify-center items-center bg-[#292B3B] px-6 py-2 gap-8 rounded-full   ">
        <Link to={'/'}>
          <HomeSimple className="text-base"/>
        </Link>
        <button
            className="rounded-full p-1"
            style={{background:gradient}}
            onClick={()=>setCreatePostVisible(!isCreatePostVisible)}>

          <Plus/>
        </button>
        <Link to={'/profile'}>
          <img src={Users[0].profilePicture} className='w-6 h-6 rounded-full object-cover'/>
        </Link>
      </div>
    </div>
  )
}

export default NavBarMobile