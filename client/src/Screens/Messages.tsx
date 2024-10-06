import { SendDiagonal } from 'iconoir-react'
import Friends from '../Components/MessagesComponent/Friends'
import MessageBox from '../Components/MessagesComponent/MessageBox'
import { Shared, Url } from '../assets/Shared'
import { useEffect, useRef, useState } from 'react'
import { useClerk } from '@clerk/clerk-react'
import axios from 'axios'
import { getFriends } from '../Utils/FetchFunctions/FetchFriends'
import { Users } from '../assets/Data';
import toast from 'react-hot-toast';
import {io, Socket} from 'socket.io-client'


const Messages = () => {

  const socket = useRef<Socket>()

 
  useEffect(()=>{
    socket.current = io('ws://localhost:8800')
    socket.current.emit('addUser', user?.username)
    socket?.current.on("getMessage",data=>{
      setArrivalMessages({
        sender:data.senderName,
        text:data.text,
        createdAt:Date.now().toString()
      })
    })
    // socket.current.on("getUsers",(users)=>{
    //   setOnlineUsers(users)
    // })
  },[])

  

  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState<Array<Messages>>([])
  const [arrivalMessages, setArrivalMessages] = useState<Messages|null>(null)
  // const [onlineUsers, setOnlineUsers] = useState<Messages|null>(null)
  const [currentChat, setCurrentChat] = useState('')
  const [friends, setFriends] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(false)
  const {user} = useClerk()

 const [convo, setConvo] = useState('')
 const scrollRef = useRef<HTMLDivElement>(null)
 
 useEffect(()=>{
  if (arrivalMessages?.sender && receiver[0]?.members.includes(arrivalMessages.sender)) {
    setMessages(prev => [...prev, arrivalMessages]);
  }
},[arrivalMessages])

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
    }
    fetchChats()

    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    
  },[currentChat, messages])
  

  const receiver:Conversation[] = conversations.filter((conversation:Conversation)=>currentChat === conversation._id)
  const receiverName = receiver[0]?.members.find((member: string| undefined) => member !== user?.username)



  const sendMessage = async()=>{

    if(convo === ''){
      toast.error('please add a message')
    }else{

      socket.current?.emit('sendMessage',{
        senderName:user?.username,
        receiverName,
        text:convo
      })
      try {
          const res = await axios.post(`${Url}/api/messages/`,{
            conversationId:currentChat,
            sender:user?.username,
            text:convo
          })
          console.log(res.data)
      } catch (error) {
        console.log(error)
      }
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
                  <div ref={scrollRef}>
                    <MessageBox user={user?.imageUrl || ""} profile={Users[0].profilePicture} name={item.sender || ""} text={item.text || ""} time='2' own = {item.sender === user?.username}/>
                  </div>
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