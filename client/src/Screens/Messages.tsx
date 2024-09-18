import { SendDiagonal } from 'iconoir-react'
import Friends from '../Components/MessagesComponent/Friends'
import MessageBox from '../Components/MessagesComponent/MessageBox'
import { lorem, Shared, Url } from '../assets/Shared'
import { useEffect, useState } from 'react'
import { useClerk } from '@clerk/clerk-react'
import axios from 'axios'

const Messages = () => {

  const [conversations, setConversations] = useState([])
  const {user} = useClerk()

  useEffect(()=>{
    const getConversations =async()=>{
      const res = await axios.get(`${Url}/api/conversations/${user?.username}`)
      setConversations(res.data)
    }
    getConversations()
  },[])

  return (
    <div className='w-[75%] flex flex-col gap-7'>
        <Friends conversations={conversations}/>
        <div className='w-full flex flex-col gap-7 h-[55vh] overflow-y-scroll'>
            <MessageBox name='Shaggy' text={lorem} time='2' />
            <MessageBox name='Shaggy' text={lorem} time='2' own/>
            <MessageBox name='Shaggy' text={lorem} time='2' />
            <MessageBox name='Shaggy' text={lorem} time='2' />
            <MessageBox name='Shaggy' text={lorem} time='2' own/>
            <MessageBox name='Shaggy' text={lorem} time='2' own/>
        </div>

        <div className='flex gap-[2%]'>
            <textarea placeholder='Send a message' className='w-full rounded-full pt-2 pl-2'/>
            <button style={{fontSize:Shared.Text.small}} className="p-3 flex justify-center items-center rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none focus:border-[#797da9]">
                <SendDiagonal/>
            </button>
        </div>
    </div> 
  )
}

export default Messages