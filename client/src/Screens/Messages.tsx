import { SendDiagonal } from 'iconoir-react'
import Friends from '../Components/MessagesComponent/Friends'
import MessageBox from '../Components/MessagesComponent/MessageBox'
import { lorem, Shared } from '../assets/Shared'

const Messages = () => {
  return (
    <div className='w-[75%] flex flex-col gap-7'>
        <Friends/>
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