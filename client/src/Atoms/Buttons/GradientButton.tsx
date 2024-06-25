import React from 'react'
import { motion } from 'framer-motion';
import { gradient, Shared } from '../../assets/Shared';

interface Props {
    state:boolean,
    text:string,
    func:()=>void
}

const GradientButton:React.FC <Props> = ({state, text, func}) => {
  return (
    <motion.button
          initial={{ x: '50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.7 } }}
          whileHover={{ scale: 1.1, boxShadow: '0 0 10px rgba(74, 83, 169, 0.25)', }}
          onClick={func}
          style={{
            background: gradient,
            fontSize: Shared.Text.large,
            borderWidth: 1
          }}
          className="md:px-12 md:py-2 px-3 py-3 w-full border-[#626689] rounded-xl font-bold"
        >
          {state ? <l-dot-stream size="70" speed="2.5" color="white" /> : text}
        </motion.button>
  )
}

export default GradientButton