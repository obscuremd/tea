import { useEffect, useState } from 'react';
import logo from '../assets/LOGO.svg'
import { BellNotification, ChatBubbleEmpty } from 'iconoir-react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { FriendsState } from '../state/atoms/FriendsState';
import { gradientTextStyleBlue } from '../assets/Shared';

const Header = () => {
  
  const [friends, setFriends] = useRecoilState(FriendsState)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    
  
  
  return (
    <div className='bg-[#191A23] flex h-16 md:mb-10 md:border-b-[0.5px] border-[#62668980] md:px-16 items-center justify-between sticky top-0 z-10'>
      {/* logo and title */}
      <div className='flex items-center gap-9'>
        {/* logo */}
        <div className='md:w-16 w-10 h-10 md:h-12 bg-[#454862] border-[#62668980] border-[1px] rounded-3xl flex justify-center items-center'>
          <img src={logo} alt="" className='md:w-10 w-6' />
        </div>
        {!isMobile && <p style={gradientTextStyleBlue}>TEA</p>}
      </div>

      <div className='flex gap-4 md:gap-9 text-xs md:text-base'>
        <Link to={'#'}>
          <BellNotification/>
        </Link>

        <button onClick={()=>setFriends(!friends)}>
          <ChatBubbleEmpty/>
        </button>
      </div>
    </div>
  )
}

export default Header