import { useState } from "react"
import Post from "../Post"
import axios from "axios"
import Hero from "./Hero"
import { jellyTriangle } from 'ldrs'

const Feed = () => {


jellyTriangle.register()


    const [userPosts, setUserPosts] = useState([])
    const [fetchPosts, setFetchPosts] = useState()
    const [loading, setLoading] = useState(true)
    const isMobile= window.innerWidth < 768
    
  return (
    <div>
        <Hero setUserPosts={setUserPosts} userPosts={userPosts} setFetchPosts={setFetchPosts} setLoading={setLoading}/>

        {loading 
        ?<div className="w-full flex justify-center md:py-10 md:px-[25vw] py-[30vh]">
            <l-jelly-triangle size={isMobile?"30":"40"} speed="1.8" color="#572E56"/>
        </div>  
        
        :  <div className="mt-12 flex flex-col md:gap-12 gap-6">
                {userPosts && userPosts.map((item, index)=>(
                    <Post key={index} 
                        photo={item.image} 
                        date={item.createdAt}
                        // comment={item.comment} 
                        fetchPosts={fetchPosts}
                        desc={item.desc} 
                        like={item.likes.length} 
                        postsDetails={item}
                        />
                ))}
            </div>
        }
    </div>
  )
}

export default Feed