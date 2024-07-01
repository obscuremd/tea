import { lazy, Suspense, useEffect, useState } from 'react';
import NavBarMobile from '../Atoms/NavBarMobile'
import NavBarPc from '../Atoms/NavBarPc'
import { Route, Routes } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CommentState } from '../state/atoms/CommentState';
import { CreatePostState } from '../state/atoms/CreatePostState';
import { lineWobble } from 'ldrs'
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserState } from '../state/atoms/UserState';
import { Url } from '../assets/Shared';
import Logo from '../assets/LOGO.svg'

lineWobble.register()

const Home = lazy(()=> import('../Screens/Home'))
const Profile = lazy(()=> import('../Screens/Profile'))
const OtherUserProfile = lazy(()=> import('../Screens/OtherUserProfile'))
const CreatePost = lazy(()=> import('../Atoms/CreatePost'))
const Comments = lazy(()=> import('../Atoms/Comments'))
const Settings = lazy(()=> import('../Screens/Settings'))
const UserForm = lazy(()=> import('../Screens/UserForm'))

function Navigation() {

  const { user } = useClerk();

  const isMobile= window.innerWidth < 768

  const isCommentVisible = useRecoilValue(CommentState)

  const isCreatePostVisible = useRecoilValue(CreatePostState)

  const [Loading, setLoading] = useState(false)
  const [userState, setUserState] = useState(0)
  const [User, setUser] = useRecoilState(UserState)
  User

  const fetchUser =async() => {
    setLoading(true)
    try {
      const res = await axios.get(`${Url}/api/user/${user?.emailAddresses[0].emailAddress}`)
      setUserState(res?.status)
      setUser(res.data)
      setLoading(false)
    } catch (error) {
      toast.error('error')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser();
    
  }, []);

  if(Loading){
    return(
      <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
        <img src={Logo} alt="" className='md:w-[25%] w-[40%]' />
        <l-line-wobble size={isMobile?"200" :"500"} stroke="5" bg-opacity="0.1" speed="1.75" color="#572E56" />
      </div>
    )
  }
 

  if (userState === 0){
    return(
      <div>
        <UserForm/>
      </div>
    )
  }

  
  return (
    <Suspense fallback={ 
        <div className="flex flex-col gap-10 justify-center items-center min-h-screen">
          <img src={Logo} alt="" className='md:w-[25%] w-[40%]' />
          <l-line-wobble size={isMobile?"200" :"500"} stroke="5" bg-opacity="0.1" speed="1.75" color="#572E56" />
        </div> }>
      <div className='min-h-screen bg-[#191A23] text-white min-w-full flex flex-col-reverse md:flex-row gap-[3%]'>
          {isMobile? <NavBarMobile/> : <NavBarPc/>}
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/settings' element={<Settings/>}/>
              <Route path='/Userprofile' element={<OtherUserProfile/>}/>
              <Route path='/Userprofile/:username' element={<OtherUserProfile/>}/>
          </Routes> 
          {isCommentVisible && <Comments/>}
          {isCreatePostVisible && <CreatePost/>}
          
      </div>
    </Suspense>
  )
}

export default Navigation
