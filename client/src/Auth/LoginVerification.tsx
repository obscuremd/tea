import splash from '../assets/splash.svg'
import { gradientTextStyle, Shared } from '../assets/Shared'
import { motion } from 'framer-motion';
import GradientButton from '../Atoms/Buttons/GradientButton';
import { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

interface Props{
  setActives: (value: number) => void
}



const LoginVerification : React.FC<Props> =({setActives}) => {

  const {isLoaded, signIn, setActive} =useSignIn()
  
  
  const [loading, setLoading] = useState(false)
  
  
  const [code, setCode]= useState('')

  const verify =async()=>{
    
    setLoading(true)
    
    if(!isLoaded){return}
    
    try {
      
      const completeSignIn = await signIn.attemptFirstFactor({ strategy:'email_code', code})
      
      if (completeSignIn.status === 'complete') {
        await setActive({session: completeSignIn.createdSessionId}), console.log(completeSignIn.createdSessionId);
        setTimeout(()=>{
          setLoading(false)
          toast.success('logged in successfully')
          window.location.reload()
        },2000)
      }
      else{
        setLoading(false)
        console.log(completeSignIn)
      }
      
      
    } catch (err: unknown) {
      const error = err as { errors?: { code: string }[] };
    
      if (error.errors && error.errors[0]?.code === 'form_code_incorrect') {
        setTimeout(() => {
          setLoading(false);
          toast.error('Wrong code');
        }, 2000);
      } else if (error.errors && error.errors[0]?.code === 'verification_failed') {
        setTimeout(() => {
          setLoading(false);
          toast.error('Too many failed attempts, please go back');
        }, 2000);
      } else {
        console.log(JSON.stringify(error));
        console.log(error);
        setTimeout(() => {
          setLoading(false);
          toast.error(error.errors?.[0]?.code ?? 'Unknown error occurred');
        }, 2000);
      }
    }
  }
  
  return (
    <div className='grid md:grid-flow-col md:px-14 px-5 md:gap-36 gap-8 items-center'>
    
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
      <div className='w-full md:col-span-4 flex flex-col md:gap-12 gap-5 items-center'>
        <motion.p initial={{ x: '50%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontSize: Shared.Text.xxl, fontWeight: '700' }}>Verify Email</motion.p>

        <p className='text_small'>verify with the redirect link sent to your email</p>

        {/* inputs */}
        <div className='flex flex-col md:gap-10 gap-2 w-full'>
            {/* email */}
            <motion.input
              initial={{ x: '50%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileFocus={{ borderColor: '#797da9' }}
              onChange={(e) => setCode(e.target.value)}
              type='number'
              placeholder="OTP"
              style={{ fontSize: Shared.Text.small }}
              className="p-3 w-full rounded-full bg-[#292B3B] border-[1px] border-[#62668980] outline-none" />
        </div>
    
            <p  className='flex gap-2 text_small '>
              Didn't recieve the OTP ?
              <button style={gradientTextStyle} onClick={()=>setActives(1)}>Go Back</button>
            </p>
            <GradientButton state={loading} func={verify} text={'Verify'}/>

        </div>
    </div>
    )
  }
  
  export default LoginVerification