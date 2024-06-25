import { lazy, Suspense, useEffect, useState } from 'react';
import NavBarMobile from '../Atoms/NavBarMobile'
import NavBarPc from '../Atoms/NavBarPc'
import { Route, Routes } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CommentState } from '../state/atoms/CommentState';
import { CreatePostState } from '../state/atoms/CreatePostState';
import { jellyTriangle } from 'ldrs'
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import UserForm from '../Screens/UserForm';
import toast from 'react-hot-toast';
import { UserState } from '../state/atoms/UserState';
import { Url } from '../assets/Shared';

jellyTriangle.register()



const Home = lazy(()=> import('../Screens/Home'))
const Profile = lazy(()=> import('../Screens/Profile'))
const OtherUserProfile = lazy(()=> import('../Screens/OtherUserProfile'))
const CreatePost = lazy(()=> import('../Atoms/CreatePost'))
const Comments = lazy(()=> import('../Atoms/Comments'))
const Settings = lazy(()=> import('../Screens/Settings'))

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
      console.log(res.data)
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
      <div className="flex justify-center items-center min-h-screen">
        <l-jelly-triangle size={isMobile?"30":"40"} speed="1.8" color="#572E56"/>
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
    <Suspense fallback={ <l-jelly-triangle size={isMobile?"30":"40"} speed="1.8" color="#572E56"/> }>
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
