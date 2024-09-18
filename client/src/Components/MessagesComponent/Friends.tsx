import { Users } from '../../assets/Data'
import { motion } from 'framer-motion';

const Friends = () => {
  return (
    <div className=" flex items-center gap-9 bg-[#292B3B] rounded-[25px] p-5 w-full overflow-x-scroll">

        {Users.map((item, index) => (
          <motion.button whileHover={{backgroundColor:'#454862'}} key={index} className="flex flex-col gap-2 p-2 justify-center items-center">
            <img src={item.profilePicture} alt="" className="w-7 h-7 rounded-full object-cover" />
            <p className="w-[8em] truncate">{item.username}</p>
          </motion.button>
        ))}
    </div>
  )
}

export default Friends