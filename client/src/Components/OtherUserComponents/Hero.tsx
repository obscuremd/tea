import toast from 'react-hot-toast';
import { Shared, Url } from '../../assets/Shared'
import profile from '../../assets/profile.png'
import { useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props{
  data:{
    _id: string;
    email: string;
    fullName: string;
    username: string;
    bio: string;
    coverPicture: string;
    profilePicture: string;
    location: string;
    gender: string;
    followers: string[];
    following: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  post:number
}

const Hero:React.FC<Props> = ({data, post}) => {

  
  useEffect(()=>{
    
    if(data.followers.includes(email || '')){
        setFollowing(true)
    }else{
        setFollowing(false)
    }
},[data])


  const UserData = data
  const {user} = useClerk()
  const email = user?.emailAddresses[0].emailAddress
  const [following , setFollowing] = useState(false)

  const followUser = async () => {
    if (email === data.email) {
        toast.error("you can't follow yourself")
    } else {
        try {
            const res = await axios.put(`${Url}/api/user/follow/${email}`, { email: data.email })
            console.log(res.data)

            if(res.data === 'user followed'){
                toast.success(`${data.username} followed`)
                setFollowing(true)
            }else if (res.data === 'user unfollowed'){
                toast.success(`${data.username} unfollowed`)
                setFollowing(false)
            }
        } catch (error) {
            toast.error('error')
            console.log(error)
        }
    }
}

  return (
    <div className='md:mb-[56px] mb-[35px]'>
        {/* hero */}
        <div style={{   backgroundImage: `url(${UserData?.coverPicture})`,
                        backgroundSize: 'cover', // This will make the background image cover the entire container
                        backgroundRepeat: 'no-repeat',
                    }} 
            className="w-full md:h-[357px] h-[192px] rounded-[35px]">
            <div style={{ background: 'linear-gradient(to top, #191A23, #191A2300)'}} className="w-full md:h-[357px] h-[192px] flex justify-center items-end">
                {/* image */}
                <img src={UserData?.profilePicture || profile} className="md:w-[175px] w-[102px] md:h-[179px] h-[102px] object-cover rounded-full"/>
            </div>         
        </div>
        {/* text */}
        <div className="w-full items-center flex flex-col md:gap-5 gap-1" style={{background:'none'}}>
          <p style={{fontSize:Shared.Text.xl, fontWeight:'700'}}>{UserData.username}</p>     
          <p style={{fontSize:Shared.Text.large, fontWeight:'400', opacity:0.5}}>{UserData?.email}</p>     

          <div className='flex gap-7 p-3'>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>{post || 0} posts</p>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>{UserData?.followers.length || 0} followers</p>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>{UserData?.following.length || 0} following</p>
          </div>

          <div className='flex gap-7'>
                      <button
                          onClick={followUser}
                          style={{
                                  background: 'linear-gradient(129deg, #D64975 -54.57%, #152046 94.11%)',
                                  fontSize: Shared.Text.large,
                              }}
                              className="md:px-12 md:py-2 px-2 py-1 border-[#62668980] border-[1px] rounded-xl font-bold"
                          >
                              {following?'Following':'Follow'}
                      </button>
                      <button
                          style={{
                                  background:'#82828280',
                                  fontSize: Shared.Text.large,
                              }}
                              className="md:px-12 md:py-2 px-2 py-1 border-[#62668980] border-[1px] rounded-xl font-bold"
                          >
                              Message
                      </button>
          </div>
        </div>
    </div>
  )
}

export default Hero