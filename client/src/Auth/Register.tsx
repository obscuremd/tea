import splash from '../assets/splash.svg'
import { characters, gradient, gradientTextStyle, Shared, ToasterStyle, Url } from '../assets/Shared'
import { useState } from 'react';
import { EyeClosed, EyeSolid } from 'iconoir-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { dotStream } from 'ldrs';
import { useSignUp } from '@clerk/clerk-react';


interface Props{
  setActive: (value: number) => void
}

const Register : React.FC<Props> = ({setActive}) => {

 

dotStream.register()

const {isLoaded, signUp} =useSignUp()

  const [loading, setLoading] = useState(false)
  const [focus, setFocus] = useState(false)

  const [passwordVisible, setPasswordVisible] = useState(false)

  const [username, setUsername]= useState('')
  const [firstName, setFirstName]= useState('')
  const [lastName, setLastName]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')


  const register =async()=>{

    setLoading(true)

    if(!isLoaded){
      return
    }

    if(username === '' && email === '' && password === '' || username === '' && email === '' && password === ''){
      setTimeout(()=>{
        toast.error('fields must not be empty')
        setLoading(false)
      },2000)
    }

    else if(username.length < 4 || username.length > 64){
      setTimeout(()=>{
        toast.error('username must be between 4 and 64 characters')
        setLoading(false)
      },2000)
    }

    else if(password.length < 8){
      setTimeout(()=>{
        toast.error('password must be at least 8 characters long')
        setLoading(false)
      },2000)
    }

    else if (!characters.test(password)){
      setTimeout(()=>{
        toast.error('password must include at least one special character')
        setLoading(false)
      }, 2000)
    }


    else {
      try {
        await signUp.create({
          emailAddress: email,
          username:username,
          password:password
        })

        await signUp.prepareEmailAddressVerification({ strategy:'email_code'})
        toast.success('user created successfully');
        setTimeout(()=>{setActive(2)},2000)
        
      } catch (err:unknown) {

        const error = err as { errors?: { code: string }[] };

        if( error?.errors && error?.errors[0]?.code === 'form_identifier_exists'){
          setTimeout(()=>{
            toast.error('That email address is taken. Please try another.')
            setLoading(false)
          },2000)
        }
        else if(error?.errors && error?.errors[0]?.code === 'form_param_format_invalid'){
          setTimeout(()=>{
            toast.error('invalid email format')
            setLoading(false)
          },2000)
        }
        else{
          toast.error(JSON.stringify(error?.errors && error?.errors[0]?.code))
          setLoading(false)
          console.log(JSON.stringify(error))
          console.log(error);
        }
      }
    }
  }


  return (
    <div className='grid md:grid-flow-col md:px-14 px-5 md:gap-36 gap-8'>
        <Toaster reverseOrder={false} toastOptions={{style:ToasterStyle}}/>
      
      {/* splash & slogan */}
      <div className='flex md:flex-col flex-col-reverse justify-center items-center'>
      <motion.p 
          initial={{x:'50%', opacity:0}} 
          animate={{x:0, opacity:1}}
          transition={{delay:0.1}} 
          style={{fontSize:Shared.Text.xxl, fontWeight:'700'}}>Spill The Real Tea</motion.p>
        <motion.img initial={{x:'50%', opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.2}}  src={splash} alt="" className='md:w-[80%] w-[60%]'/>
      </div>
      
      {/* create account */}
      <div className='w-full md:col-span-4 flex flex-col md:gap-11 gap-5 items-center'>
        <motion.p initial={{x:'50%', opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.3}} style={{fontSize:Shared.Text.xxl, fontWeight:'700'}}>
          Create A New Account
        </motion.p>
        
        {/* inputs */}
        <div className='flex flex-col md:gap-5 gap-2 w-full'>
            {/* username */}
            <motion.input 
              initial={{x:'50%', opacity:0}}
              animate={{x:0, opacity:1}}
              transition={{delay:0.4}}
              whileFocus={{borderColor:'#797da9'}} 
              onChange={(e)=>setUsername(e.target.value)}
              type='text' 
              placeholder={'Username'} 
              style={{fontSize:Shared.Text.small}} 
              className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none" />
          <div className='flex gap-5'>
            {/* first name */}
            <motion.input 
              initial={{x:'50%', opacity:0}}
              animate={{x:0, opacity:1}}
              transition={{delay:0.5}}
              whileFocus={{borderColor:'#797da9'}}
              onChange={(e)=>setFirstName(e.target.value)}
              type='text' 
              placeholder={'first name'} 
              style={{fontSize:Shared.Text.small}} 
              className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none" />
            {/* last name */}
            <motion.input 
              initial={{x:'50%', opacity:0}}
              animate={{x:0, opacity:1}}
              transition={{delay:0.6}}
              whileFocus={{borderColor:'#797da9'}}
              onChange={(e)=>setLastName(e.target.value)}
              type='text' 
              placeholder={'Last name'} 
              style={{fontSize:Shared.Text.small}} 
              className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none" />
          </div>
            {/* email */}
            <motion.input 
              initial={{x:'50%', opacity:0}}
              animate={{x:0, opacity:1}}
              transition={{delay:0.7}}
              whileFocus={{borderColor:'#797da9'}}
              onChange={(e)=>setEmail(e.target.value)}
              type='email' 
              placeholder={'E-mail'} 
              style={{fontSize:Shared.Text.small}} 
              className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none" />
            {/* password */}
            <motion.div 
              initial={{x:'50%', opacity:0}}
              animate={{x:0, opacity:1}}
              transition={{delay:0.8}}
              className='flex gap-3 pr-3 w-full rounded-full bg-[#292B3B] border-[1px] outline-none'
              style={{borderColor:focus?'#797da9':'#62668980'}}>
              <input
                onFocus={()=>setFocus(true)}
                onBlur={()=>setFocus(false)}
                onChange={(e)=>setPassword(e.target.value)}
                type={passwordVisible?'text':'password'} 
                placeholder={'Password'} 
                style={{fontSize:Shared.Text.small}} 
                className="p-3 w-full rounded-l-full bg-[#292B3B] outline-none" />
                <button onClick={()=>setPasswordVisible(!passwordVisible)} style={{fontSize:Shared.Text.large}}>
                  {passwordVisible?<EyeSolid/>:<EyeClosed/>}
                </button>
            </motion.div>
        </div>

        <motion.p
          initial={{x:'50%', opacity:0}} 
          animate={{x:0, opacity:1}} 
          transition={{delay:0.9}}  
          style={{fontSize:Shared.Text.small}} className='self-end flex gap-2'>Already Have An Account?  
          <button onClick={()=>setActive(1)} style={gradientTextStyle}>Log In</button>
        </motion.p>

        <motion.button
            initial={{x:'50%', opacity:0}}
            animate={{x:0, opacity:1,transition:{delay:0.7}}}
            whileHover={{scale:1.1, boxShadow:'0 0 10px rgba(74, 83, 169, 0.25)',}}
            onClick={register}
            style={{
              background: gradient,
              fontSize: Shared.Text.large,
              borderWidth:1
            }}
            className="md:px-12 md:py-2 px-3 py-3 w-full border-[#626689] rounded-xl font-bold"
          >
            {loading? <l-dot-stream size="70" speed="2.5" color="white"/> : 'Create Account'}
        </motion.button>
      </div>
    </div>
  )
}

export default Register