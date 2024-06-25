import { lazy, Suspense } from 'react';
import NavBarMobile from '../Atoms/NavBarMobile'
import NavBarPc from '../Atoms/NavBarPc'
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CommentState } from '../state/atoms/CommentState';
import { CreatePostState } from '../state/atoms/CreatePostState';
import { jellyTriangle } from 'ldrs'

jellyTriangle.register()



const Home = lazy(()=> import('../Screens/Home'))
const Profile = lazy(()=> import('../Screens/Profile'))
const OtherUserProfile = lazy(()=> import('../Screens/OtherUserProfile'))
const CreatePost = lazy(()=> import('../Atoms/CreatePost'))
const Comments = lazy(()=> import('../Atoms/Comments'))
const Settings = lazy(()=> import('../Screens/Settings'))

function Navigation() {

  const isMobile= window.innerWidth < 768

  const isCommentVisible = useRecoilValue(CommentState)

  const isCreatePostVisible = useRecoilValue(CreatePostState)


  
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
