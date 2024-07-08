import Post from "../../Atoms/Post"
import Hero from "./Hero"
import { jellyTriangle } from 'ldrs'
import { useRecoilValue } from "recoil"
import { FetchLoading, UserPosts } from "../../state/atoms/UserPostsState"

const Feed = () => {


jellyTriangle.register()


    const userPosts = useRecoilValue(UserPosts)
    const loading = useRecoilValue(FetchLoading)
    const isMobile= window.innerWidth < 768
    
  return (
    <div>
        <Hero  />

        {loading 
        ?<div className="w-full flex justify-center md:py-10 md:px-[10vw] py-[30vh]">
            <l-line-wobble size={isMobile?"200" :"500"} stroke="5" bg-opacity="0.1" speed="1.75" color="#572E56" />
        </div>  
        
        :  <div className="mt-12 flex flex-col md:gap-12 gap-6">
                {userPosts && userPosts.map((item, index)=>(
                    <Post key={index} 
                        photo={item.image} 
                        date={item.location}
                        comment={0} 
                        desc={item.desc} 
                        like={item.likes.length} 
                        postsDetails={item}
                        username={item.user.username}
                        profilePicture={item.user.profilePicture}
                        />
                ))}
            </div>
        }
    </div>
  )
}

export default Feed