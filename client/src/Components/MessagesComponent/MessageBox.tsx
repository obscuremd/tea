import React from 'react'
import { Users } from '../../assets/Data'
import { gradient } from '../../assets/Shared'
gradient

interface Props{
    own?:boolean
    name:string
    text:string
    time:string
}

const MessageBox:React.FC<Props> = ({own, name, text, time}) => {
  return (
    <div className={`w-full flex flex-col ${own && 'items-end'}`}>
      {/* profile */}
      <div className={`flex ${own && 'flex-row-reverse'} items-center gap-3`}>
        <img src={Users[0].profilePicture} alt="" className='w-8 h-8 object-cover rounded-full' />
        <div>
          <p className='text-xl font-bold'>{own?'You':name}</p>
          <p className='text-xs font-medium opacity-50'>{time}m ago</p>
        </div>
      </div>
      {/* Message */}
      <p className={`w-[50%] p-5 ${own && 'text-end'} border-[1px] border-[#62668980] rounded-xl`} style={{background:own?'#62668980':gradient}}>{text}</p>
    </div>
  )
}

export default MessageBox