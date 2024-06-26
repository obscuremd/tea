import { Bookmark, ChatLines, HomeSimple, Plus, Settings} from 'iconoir-react'
import { useState } from 'react'
import { gradient, Shared } from '../assets/Shared'
import { useRecoilState } from 'recoil'
import { CreatePostState } from '../state/atoms/CreatePostState'
import TransparentButton from './Buttons/TransparentButton'
import { useClerk } from '@clerk/clerk-react'



const NavBarPc = () => {

    const {user} = useClerk()

    const [active, setActive] = useState(0)

    console.log(active)

    const [isCreatePostVisible, setCreatePostVisible] = useRecoilState(CreatePostState)

  return (
    <div className='h-screen sticky top-[10%] flex flex-col gap-7 ml-[2%]'>
        {/* Home and Message */}
        <div className='box p-5 flex flex-col gap-8 rounded-3xl'>
            <TransparentButton active={active} click={()=>setActive(0)}  icon={<HomeSimple/>} state={0} name={'Home'} link={'/'}/>
            <TransparentButton active={active} click={()=>setActive(1)}  icon={<ChatLines/>} state={1} name={'Messages'} link={'/'}/>
        </div>
        {/*create post */}
        <button 
            onClick={()=>setCreatePostVisible(!isCreatePostVisible)}
            style={{fontSize:Shared.Text.large, 
                    background: '#292B3B',
                    borderColor:'#626689',
                    borderWidth: 1}} 
            className='flex gap-8 p-2 w-full rounded-2xl capitalize items-center'>
                    <div className='p-2 rounded-xl' style={{background: gradient}}>
                        <Plus/>
                    </div>
                    Create Post
            </button>
        {/*others */}
        <div className='box p-5 flex flex-col gap-8 rounded-3xl'>
            <TransparentButton active={active} click={()=>setActive(2)}  icon={<Bookmark/>} state={2} name={'Saved'} link={'/'}/>
            <TransparentButton active={active} click={()=>setActive(3)}  icon={<Settings/>} state={3} name={'settings'} link={'/settings'}/>
            <TransparentButton active={active} click={()=>setActive(4)}  icon={<img src={user?.imageUrl} className='w-9 h-9 rounded-full object-cover'/>} state={4} name={'profile'} link={'/profile'}/>
        </div>
    </div>
  )
}

export default NavBarPc