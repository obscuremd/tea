import { motion } from 'framer-motion';
import { Shared } from '../assets/Shared';

interface Props {
    focus: () => void;
    blur: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    isFocused: boolean;
    icon?:React.ReactNode    
    height?: string;
  }

export const Input: React.FC<Props>=({focus, blur, placeholder, type, isFocused, icon,onChange, height})=>(
    <motion.div 
              initial={{x:'-50%', opacity:0}} animate={{x:0, opacity:1, transition:{delay:0.3}}}
              className={`flex gap-3 px-3 w-full rounded-2xl border-[1px] outline-none items-center ${isFocused ? 'border-[#797da9]' : 'border-[#62668980]'}`}
              style={{fontSize:Shared.Text.small}}>
              <div className='box p-1 rounded-full'>
                {icon}
              </div>
              <input
                onChange={onChange}
                onFocus={focus}
                onBlur={blur}
                type={type}
                placeholder={placeholder} 
                className={`p-3 w-full rounded-l-full bg-transparent outline-none text-wrap ${height}`} />
            </motion.div>
  )