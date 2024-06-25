import splash from '../assets/splash.svg'
import { Shared } from '../assets/Shared'
import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { Mail } from 'iconoir-react';
import toast from 'react-hot-toast';

interface Props{
  setActives: (value: number) => void
}

const EmailVerification : React.FC<Props> =({setActives}) => {
  
  const {isLoaded, signUp, setActive} =useSignUp()
  
  const [formFocus, setFormFocus] = useState(false)
  
  const [loading, setLoading] = useState(false)
  
  
  const [code, setCode]= useState('')
  
  
  const verify =async()=>{
    
    setLoading(true)
    
    if(!isLoaded){return}
    
    try {
      
      const completeSignUp = await signUp.attemptEmailAddressVerification({code})
      
      if (completeSignUp.status === 'complete') {
        await setActive({session: completeSignUp.createdSessionId}), console.log(completeSignUp.createdSessionId);
        setTimeout(()=>{
          setLoading(false)
          toast.success('logged in successfully')
          window.location.reload()
        },2000)
      }
      else{
        setLoading(false)
        console.log(completeSignUp)
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
    <div className='flex flex-col-reverse md:flex-row md:gap-36 gap-8 items-center h-full'>
    
    
    
    {/* create account */}
    <div className='md:w-[40%] w-full flex flex-col md:gap-11 gap-5 md:px-14 px-5'>
    <p style={{fontSize:Shared.Text.xxl, fontWeight:'700'}}>Verify Email</p>
    
    <p style={{fontSize:Shared.Text.small}} className='flex gap-2'>enter a digit otp to verify your email</p>
    
    {/* inputs */}
    <div className='flex flex-col md:gap-5 gap-2 w-full'>
    
    {/* Email */}
    <div 
    className='flex gap-3 px-3 w-full rounded-2xl border-[1px] outline-none h-full items-center'
    style={{borderColor:formFocus?'#5979b7':'#445B8A',fontSize:Shared.Text.small}}>
    <div className='bg-[#2F406480] border-[1px] border-[#445B8A] p-1 rounded-full'>
    <Mail />
    </div>
    <input
    onFocus={()=>setFormFocus(true)}
    onBlur={()=>setFormFocus(false)}
    onChange={(e)=>setCode(e.target.value)}
    type='number'
    placeholder={'OTP'} 
    className="p-3 w-full rounded-l-full bg-transparent outline-none" />
    </div>
    
    
    <button style={{fontSize:Shared.Text.small}} onClick={()=>setActives(1)} className='flex gap-2 text-[#aabee6]'>Go Back ??</button>
    </div>
    
    
    <button
    onClick={verify}
    style={{fontSize: Shared.Text.large}}
    className="md:px-12 md:py-2 px-3 py-3 w-full border-[1px] border-[#445B8A] rounded-xl font-bold bg-[#2F4064BF]"
    >
    {loading
      ?<l-waveform size="35" stroke="3.5" speed="1" color="white"/>
      :'Verify'}
      </button>
      </div>
      
      {/* splash & slogan */}
      <div className='flex justify-center items-center md:bg-[#2F406480] md:p-14 p-5 md:h-screen'>
      <img src={splash} alt="" className='md:w-[80%] w-[60%]'/>
      </div>
      </div>
    )
  }
  
  export default EmailVerification