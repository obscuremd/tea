import { Bookmark, ChatLines, ForwardMessage, HelpCircle, HomeSimple, Plus, Settings} from 'iconoir-react'
import { useState } from 'react'
import { gradient, Shared } from '../assets/Shared'
import { Users } from '../assets/Data'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil'
import { CreatePostState } from '../state/atoms/CreatePostState'
import { motion } from 'framer-motion'



const NavBarPc = () => {
    const [active, setActive] = useState(0)

    const Button = ({icon, state, name, link}) =>{
        return(
            <Link to={link}>
                <motion.button
                    whileHover={{backgroundColor:'#62668980'}} 
                    onClick={()=>setActive(state)}
                    style={{fontSize:Shared.Text.large, 
                            background:active === state ? '#62668980' : 'transparent',
                            borderColor:'#626689',
                            borderWidth:active === state ? 1 : 0}} 
                    className='flex gap-8 p-3 w-[15vw] rounded-2xl capitalize'>
                        {icon}{name}
                </motion.button>
            </Link>
        )
    }

    Button.propTypes = {
        icon: PropTypes.node.isRequired, // Assumes icon is a React element
        state: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        link: PropTypes.string // Add more specific validation if necessary
    };

    const [isCreatePostVisible, setCreatePostVisible] = useRecoilState(CreatePostState)

  return (
    <div className='h-screen sticky top-[10%] flex flex-col gap-7 ml-[2%]'>
        {/* Home and Message */}
        <div className='p-5 flex flex-col gap-8 bg-[#292B3B] rounded-3xl'>
            <Button icon={<HomeSimple/>} state={0} name={'Home'} link={'/'}/>
            <Button icon={<ChatLines/>} state={1} name={'Messages'}/>
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
        <div className='p-5 flex flex-col gap-8 bg-[#292B3B] rounded-3xl'>
            <Button icon={<Bookmark/>} state={2} name={'Saved'}/>
            <Button icon={<Settings/>} state={3} name={'settings'}/>
            <Button icon={<img src={Users[0].profilePicture} className='w-9 h-9 rounded-full object-cover'/>} state={5} name={'profile'} link={'/profile'}/>
        </div>
    </div>
  )
}

export default NavBarPc