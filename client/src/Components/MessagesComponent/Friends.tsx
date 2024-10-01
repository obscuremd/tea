import { motion } from 'framer-motion';
import empty from '../../assets/profile.png'

interface Conversation {
  _id: string;
  members: Array<string>;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  friends:Array<User>
  setChat: React.Dispatch<React.SetStateAction<string>>
  loading:boolean
  conversations:Conversation[]
  username:string
} 


const Friends:React.FC<Props> = ({friends, setChat, loading, conversations, username}) => {
 
  const handleSelectChat = (friendUsername: string) => {
    const matchingConversation = conversations.find(conversation =>
      conversation.members.includes(username) && conversation.members.includes(friendUsername)
    );
    
    if (matchingConversation) {
      setChat(matchingConversation._id);  // Set the chat to the conversation's ID
    }
  };

  return (
    <div className=" flex items-center gap-9 bg-[#292B3B] rounded-[25px] p-5 w-full overflow-x-scroll">
      {
        loading
        ?'loading'
        :(friends.map(({profilePicture, username}, index) => (
          <motion.button whileHover={{backgroundColor:'#454862'}} onClick={()=>handleSelectChat(username)} key={index} className="flex flex-col gap-2 p-2 justify-center items-center">
            <img src={profilePicture || empty} alt="" className="w-7 h-7 rounded-full object-cover" />
            <p className="w-[8em] truncate">{username}</p>
          </motion.button>
        )))
      }
    </div>
  )
}

export default Friends