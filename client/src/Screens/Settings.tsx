import React from 'react'
import { motion } from 'framer-motion';
import { gradient, gradientRed } from '../assets/Shared';
import { BinFull, LogOut } from 'iconoir-react';
import { useClerk } from '@clerk/clerk-react';

interface GeneralSettingsProps{
  func?:()=>void
  text:string
}
interface AuthorizationSettingsProps{
  func?:()=>void
  text:string
  secondText?:string
  style:string
  element:string | React.ReactNode
}

const Settings = () => {

  const {signOut} = useClerk()

  const handleSignOut =async()=>{
    await signOut()
  }

  const GeneralSettings:React.FC<GeneralSettingsProps> =({func, text})=>(
    <motion.button
      whileHover={{scale:1.01}} 
      onClick={func}
      className='flex items-center py-2 px-5 border-b-[1px] border-[#62668980] rounded-3xl w-[90%]'>
        <p className='text_medium capitalize'>{text}</p>
    </motion.button>
  )
  const SettingsWithButton:React.FC<AuthorizationSettingsProps> =({func, text, secondText, style, element})=>(
    <motion.div
      whileHover={{scale:1.01}} 
      
      className='flex items-center justify-between py-2 px-5 border-[1px] border-[#62668980] rounded-3xl w-[90%]'>
      <div className='flex flex-col items-start'>
        <p className='text_medium capitalize'>{text}</p>
        <p className='text_small capitalize'>{secondText}</p>
      </div>

      <button onClick={func} className={`py-3 px-5 rounded-lg`} style={{background:style}}>
        {element}
      </button>
    </motion.div>
  )

  return (
    <div className='w-full flex flex-col gap-12 p'>
      <p className='text_xl font-bold'>Settings</p>
      
      {/* general settings */}
      <div className='flex flex-col gap-6'>
        <p className='text_xl font-bold'>General</p>
        <div className='flex flex-col gap-8'>
          <GeneralSettings text='Email Address'/>
          <GeneralSettings text='username'/>
          <GeneralSettings text='full name'/>
          <GeneralSettings text='password'/>
        </div>
      </div>
      
      {/* general settings */}
      <div className='flex flex-col gap-6'>
        <p className='text_xl font-bold'>Account Authorization</p>
        <div className='flex flex-col gap-5'>
          <SettingsWithButton text='Email Address' secondText='Connect to log in to Tea with your Google account' style={gradient} element='Connect'/>
          <SettingsWithButton text='Apple' secondText='Connect to log in to Tea with your Apple account' style={gradient} element='Connect'/>
          <SettingsWithButton text='Two-Factor Authentication' secondText='Connect to log in to Tea with your Google account' style={gradient} element='Connect'/>
          </div>
      </div>
      
      {/* general settings */}
      <div className='flex flex-col gap-6'>
        <p className='text_xl font-bold'>Advanced</p>
        <div className='flex flex-col gap-5'>
          <SettingsWithButton text='Log-out' style={gradientRed} element={<LogOut/>} func={handleSignOut}/>
          <SettingsWithButton text='Delete Account' style={gradientRed} element={<BinFull/>}/>
          </div>
      </div>
    </div>
  )
}

export default Settings