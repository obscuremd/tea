import { Users } from '../../assets/Data'
import { Shared } from '../../assets/Shared'


const Hero = ({data}) => {

  const UserData = data

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
                <img src={UserData?.profilePicture} className="md:w-[175px] w-[102px] md:h-[179px] h-[102px] object-cover rounded-full"/>
            </div>         
        </div>
        {/* text */}
        <div className="w-full items-center flex flex-col md:gap-5 gap-1" style={{background:'none'}}>
          <p style={{fontSize:Shared.Text.xl, fontWeight:'700'}}>{Users[0].username}</p>     
          <p style={{fontSize:Shared.Text.large, fontWeight:'400', opacity:0.5}}>{UserData?.desc}</p>     

          <div className='flex gap-7 p-3'>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>23 posts</p>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>{UserData?.followers.length} followers</p>
            <p style={{fontSize:Shared.Text.large, fontWeight:'700'}}>{UserData?.following.length} following</p>
          </div>

          <div className='flex gap-7'>
                      <button
                          style={{
                                  background: 'linear-gradient(129deg, #D64975 -54.57%, #152046 94.11%)',
                                  fontSize: Shared.Text.large,
                              }}
                              className="md:px-12 md:py-2 px-2 py-1 border-[#62668980] border-[1px] rounded-xl font-bold"
                          >
                              Follow
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