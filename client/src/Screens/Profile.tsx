import Hero from '../Components/ProfleComponents/Hero';
import ProfileFeed from '../Components/ProfleComponents/ProfileFeed';
import { isMobile } from '../assets/Shared';

const Profile = () => {
  
    
  return (
    <div className={isMobile? 'ml-0':'mr-[4%] w-full flex flex-col'}>
      <Hero/>
      <ProfileFeed />
    </div>
  )
}

export default Profile