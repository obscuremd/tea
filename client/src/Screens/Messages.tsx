import { SendDiagonal } from 'iconoir-react'
import Friends from '../Components/MessagesComponent/Friends'
import MessageBox from '../Components/MessagesComponent/MessageBox'
import { Shared, Url } from '../assets/Shared'
import { useEffect, useState } from 'react'
import { useClerk } from '@clerk/clerk-react'
import axios from 'axios'
import { getFriends } from '../Utils/FetchFunctions/FetchFriends'
import { Users } from '../assets/Data';
import toast from 'react-hot-toast';


const Messages = () => {

  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState<Array<Messages>>([])
  const [currentChat, setCurrentChat] = useState('')
  const [friends, setFriends] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(false)
  const {user} = useClerk()

 const [convo, setConvo] = useState('')
 
  useEffect(()=>{
    const getConversations =async()=>{
      const res = await axios.get(`${Url}/api/conversations/${user?.username}`)
      setConversations(res.data)
    }
    getConversations()
  },[])

  useEffect(() => {
    if (conversations.length > 0) {
      getFriends(conversations, user?.username || '', setFriends, setLoading);
    }
  }, [conversations, user?.username]); // Run when conversations or username changes

  useEffect(()=>{
    const fetchChats =async()=>{
      const res = await axios.get(`${Url}/api/messages/${currentChat}`)
      setMessages(res.data)
      console.log(res.data)
    }

    fetchChats()
  },[currentChat, messages])

  const sendMessage = async()=>{
    if(convo === ''){
      toast.error('please add a message')
    }else{
      const res = await axios.post(`${Url}/api/messages/`,{
        conversationId:currentChat,
        sender:user?.username,
        text:convo
      })
      console.log(res.data)
    }
  }

  return (
    <div className='w-[75%] flex flex-col gap-7'>
        <Friends friends={friends} loading={loading} setChat={setCurrentChat} conversations ={conversations} username={user?.username || ''}/>
        <div className='w-full flex flex-col gap-7 h-[55vh] overflow-y-scroll'>
            {currentChat === ""
              ?'start chatting'
              :<>
                {messages.map((item)=>(
                  <MessageBox user={user?.imageUrl || ""} profile={Users[0].profilePicture} name={item.sender} text={item.text} time='2' own = {item.sender === user?.username}/>
                ))}
              </>
            }
        </div>

        <div className='flex gap-[2%]'>
            <textarea placeholder='Send a message' className='w-full rounded-full pt-2 pl-2' onChange={(e)=>setConvo(e.target.value)}/>
            <button onClick={sendMessage} style={{fontSize:Shared.Text.small}} className="p-3 flex justify-center items-center rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]">
                <SendDiagonal/>
            </button>
        </div>
    </div> 
  )
}

export default Messages