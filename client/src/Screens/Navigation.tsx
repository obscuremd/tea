import { lazy, Suspense } from 'react';
import NavBarMobile from '../Components/NavBarMobile'
import NavBarPc from '../Components/NavBarPc'
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CommentState } from '../state/atoms/CommentState';
import { CreatePostState } from '../state/atoms/CreatePostState';

const Home = lazy(()=> import('./Home'))
const Profile = lazy(()=> import('./Profile'))
const OtherUserProfile = lazy(()=> import('./OtherUserProfile'))
const CreatePost = lazy(()=> import('../Components/CreatePost'))
const Comments = lazy(()=> import('../Components/Comments'))

function Navigation() {

  const isMobile= window.innerWidth < 768

  const isCommentVisible = useRecoilValue(CommentState)

  const isCreatePostVisible = useRecoilValue(CreatePostState)


  
  return (
    <Suspense fallback={<l-jelly-l-jelly-triangle size={isMobile?"30":"40"} speed="1.8" color="#572E56"/>}>
      <div className='min-h-screen bg-[#191A23] text-white min-w-full flex flex-col-reverse md:flex-row gap-[3%]'>
          {isMobile? <NavBarMobile/> : <NavBarPc/>}
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/profile' element={<Profile/>}/>
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
