import { motion } from 'framer-motion';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    icon?:React.ReactNode    
    height?: string;
    size?:string
  }

export const TextArea: React.FC<Props>=({ placeholder, type,onChange, height,size})=>(
              <motion.input
                onChange={onChange}
                type={type}
                placeholder={placeholder} 
                whileFocus={{borderColor: '#797da9'}}
                className={`p-3 w-full rounded-full text-wrap ${height} text_${size}` }/>
                
  )