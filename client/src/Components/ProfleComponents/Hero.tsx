import { Shared } from '../../assets/Shared'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ProfileFeedState, UserState } from '../../state/atoms/UserState'
import empty from '../../assets/profile.png'


const Hero = () => {
  const [feed, setFeed] = useRecoilState(ProfileFeedState)

  const user = useRecoilValue(UserState)


    const feedTypes = [
        { id: 0, label: "Posts", func:()=>setFeed(0) },
        { id: 1, label: "Saved", func:()=>setFeed(1) },
        { id: 2, label: "Edit Profile", func:()=>setFeed(2) },
    ];
  return (
    <div className='md:mb-[56px] mb-[35px]'>
        {/* hero */}
        <div style={{   backgroundImage: `url(${user?.coverPicture})`,
                        backgroundSize: 'cover', // This will make the background image cover the entire container
                        backgroundRepeat: 'no-repeat',
                    }} 
            className="w-full md:h-[357px] h-[192px] rounded-[35px]">
            <div style={{ background: 'linear-gradient(to top, #191A23, #191A2300)'}} className="w-full md:h-[357px] h-[192px] flex justify-center items-end">
                {/* image */}
                <img src={user?.profilePicture || empty} className="md:w-[175px] w-[102px] md:h-[179px] h-[102px] object-cover rounded-full"/>
            </div>         
        </div>
        {/* text */}
        <div className="w-full items-center flex flex-col md:gap-5 gap-1" style={{background:'none'}}>
          <p style={{fontSize:Shared.Text.xl, fontWeight:'700'}}>{user?.username}</p>     
          <p style={{fontSize:Shared.Text.large, fontWeight:'400', opacity:0.5}}>{user?.email}</p>     

          <div className='flex gap-7 p-3'>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>23 posts</p>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>{user?.followers?.length || 0} followers</p>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>{user?.following?.length || 0} following</p>
          </div>

          <div className='flex gap-7'>
            {feedTypes.map(({ id, label,func }) => (
                      <button
                          key={id}
                          onClick={func}
                          style={{
                                  background: feed === id ? 'linear-gradient(129deg, #D64975 -54.57%, #152046 94.11%)' :'#82828280',
                                  fontSize: Shared.Text.large,
                              }}
                              className="md:px-12 md:py-2 px-2 py-1 border-[#62668980] border-[1px] rounded-xl font-bold"
                          >
                              {label}
                      </button>
                  ))}
          </div>
        </div>
    </div>
  )
}

export default Hero