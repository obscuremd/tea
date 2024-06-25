import splash from '../assets/splash.svg'
import {  gradientTextStyle, Shared, ToasterStyle } from '../assets/Shared'
import { useState } from 'react';
import { EyeClosed, EyeSolid } from 'iconoir-react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from "framer-motion"
import { dotStream } from 'ldrs'
import { useSignIn } from '@clerk/clerk-react';
import GradientButton from '../Atoms/Buttons/GradientButton';

interface Props{
  setActive: (value: number) => void
}

const Login : React.FC<Props> = ({ setActive }) => {


  dotStream.register()

  const {isLoaded, signIn} =useSignIn()

  const [loading, setLoading] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [focus, setFocus] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")



  const Login =async()=>{
    
    if(!isLoaded){return}
    
    if(email =='' || password === ''){
      setLoading(true)
      setTimeout(()=>{
        toast.error('Please enter your email/ password')
        setLoading(false)  
      },1000)
    }
    else{
      
      setLoading(true)

      try {
        await signIn.create({
          strategy:'email_link',
          redirectUrl:`${window.location.origin}/`,

          identifier: email,
          // password: password
        })


      
      setTimeout(()=>{
        toast.success('code sent')
        setActive(1)
        setLoading(false)
          // window.location.reload()
        },2000)
        
        
      } catch (err:unknown) {
        
        const error = err as { errors?: { code: string }[] };
        
        setLoading(false)
        if(error.errors && error.errors[0]?.code === 'form_param_format_invalid'){
          toast.error('Email/Password is invalid')
        }else{
          toast.error(JSON.stringify(error.errors && error.errors[0]?.code))
          console.log(JSON.stringify(error));
          console.log(error)
        }
      }
    }
    
  }




  return (
    <div className='grid md:grid-flow-col md:px-14 px-5 md:gap-36 gap-8'>
      <Toaster reverseOrder={false} toastOptions={{ style: ToasterStyle }} />

      {/* splash & slogan */}
      <div className='flex md:flex-col flex-col-reverse justify-center items-center'>
        <motion.p
          initial={{ x: '50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: Shared.Text.xxl, fontWeight: '700' }}>Spill The Real Tea</motion.p>
        <motion.img initial={{ x: '50%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} src={splash} alt="" className='md:w-[80%] w-[60%]' />
      </div>

      {/* create account */}
      <div className='w-full md:col-span-4 flex flex-col md:gap-11 gap-5 items-center'>
        <motion.p initial={{ x: '50%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontSize: Shared.Text.xxl, fontWeight: '700' }}>Login</motion.p>

        {/* inputs */}
        <div className='flex flex-col md:gap-5 gap-2 w-full'>
          {/* email */}
          <motion.input
            initial={{ x: '50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileFocus={{ borderColor: '#797da9' }}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder="E-mail"
            style={{ fontSize: Shared.Text.small }}
            className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none" />

          {/* password */}
          <motion.div
            initial={{ x: '50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='flex gap-3 pr-3 w-full rounded-full bg-[#292B3B] border-[1px] outline-none'
            style={{ borderColor: focus ? '#797da9' : '#62668980' }}>
            <motion.input
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={(e) => setPassword(e.target.value)}
              type={passwordVisible ? 'text' : 'password'}
              placeholder={'Password'}
              style={{ fontSize: Shared.Text.small }}
              className="p-3 w-full rounded-l-full bg-[#292B3B] outline-none" />
            <button onClick={() => setPasswordVisible(!passwordVisible)} style={{ fontSize: Shared.Text.large }}>
              {passwordVisible ? <EyeSolid /> : <EyeClosed />}
            </button>
          </motion.div>
        </div>

        <motion.p
          initial={{ x: '50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ fontSize: Shared.Text.small }} className='self-end flex gap-2'>Dont have an Account?
          <button onClick={() => setActive(0)} style={gradientTextStyle}>Create One</button>
        </motion.p>

        <GradientButton state={loading} func={Login} text={'Login'}/>
      </div>
    </div>
  )
}

export default Login