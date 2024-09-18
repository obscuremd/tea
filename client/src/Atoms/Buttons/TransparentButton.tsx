import React from 'react'
import { motion } from 'framer-motion';
import { Shared } from '../../assets/Shared';
import { Link } from 'react-router-dom';

interface ButtonProps{
    icon: React.ReactNode
    state: number
    name: string,
    link: string,
    active:number,
    click:()=>void
}


const TransparentButton: React.FC<ButtonProps> = ({icon, state, name, link, active, click}) => {

  const handleClick = () => {
    click();
    window.scrollTo(0, 0);
  };

  return (
    <Link to={link}>
            <motion.button
                // whileHover={{backgroundColor:'#62668980'}} 
                onClick={handleClick}
                style={{fontSize:Shared.Text.large, 
                        background:active === state ? '#62668980' : 'transparent',
                        borderColor:'#626689',
                        borderWidth:active === state ? 1 : 0}} 
                className='flex gap-8 p-3 w-[15vw] rounded-2xl capitalize '>
                    {icon}{name}
            </motion.button>
        </Link>
  )
}



export default TransparentButton