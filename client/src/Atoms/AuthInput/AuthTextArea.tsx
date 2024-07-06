import { motion } from 'framer-motion';
import { Shared } from '../../assets/Shared';

interface Props {
    focus: () => void;
    blur: () => void;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    isFocused: boolean;
    icon:React.ReactNode    
    height?: string;
  }

export const TextArea: React.FC<Props>=({focus, blur, placeholder, isFocused, icon,onChange, height})=>(
    <motion.div 
              initial={{x:'-50%', opacity:0}} animate={{x:0, opacity:1, transition:{delay:0.3}}}
              className={`flex gap-3 py-3 px-3 w-full rounded-2xl border-[1px] outline-none ${isFocused ? 'border-[#797da9]' : 'border-[#62668980]'}`}
              style={{fontSize:Shared.Text.small}}>
              <div className='box p-1 h-fit rounded-full'>
                {icon}
              </div>
              <textarea
                onChange={onChange}
                onFocus={focus}
                onBlur={blur}
                placeholder={placeholder} 
                className={`p-3 w-full bg-transparent outline-none text-wrap ${height}`} />
            </motion.div>
  )