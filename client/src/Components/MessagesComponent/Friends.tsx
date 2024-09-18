import { motion } from 'framer-motion';

interface Props {
  conversations: Array<Text>
}

const Friends:React.FC<Props> = ({conversations}) => {
  return (
    <div className=" flex items-center gap-9 bg-[#292B3B] rounded-[25px] p-5 w-full overflow-x-scroll">

        {conversations.map((item, index) => (
          <motion.button whileHover={{backgroundColor:'#454862'}} key={index} className="flex flex-col gap-2 p-2 justify-center items-center">
            {/* <img src={item.profilePicture} alt="" className="w-7 h-7 rounded-full object-cover" />
            <p className="w-[8em] truncate">{item.username}</p> */}
            pp
          </motion.button>
        ))}
    </div>
  )
}

export default Friends