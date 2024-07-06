import React, { useState } from 'react'
import { Check, Mail, MapPin} from 'iconoir-react';
import { Input } from '../Atoms/AuthInput/AuthInput';
import { AuthDropdown } from '../Atoms/AuthInput/AuthDropDown';
import { useCountries } from "use-react-countries";
import { Shared, Url } from '../assets/Shared';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';
import { waveform } from 'ldrs';
import { TextArea } from '../Atoms/AuthInput/AuthTextArea';

waveform.register()
interface ModalProps{
  name: string
  value: boolean 
  func: ()=>void
}

const UserForm = () => {

  const { user } = useClerk();

  const [loading, setLoading] = useState(false)

  const { countries } = useCountries();
  const countryNames = countries.map(country => country.name);

    // dropdown state
    const locationData = countryNames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    

    // dropdown visible state
    const [dropdown, setDropdown] = useState(false)
    const [location , setLocation] = useState('')

    console.log(location)

  
    const [emailFocus, setEmailFocus]= useState(false)
    const [fullName, setFullName]= useState('')
    
    const [bioFocus, setBioFocus]= useState(false)
    const [bio, setBio]= useState('')

    console.log(bio)
    const [gender, setGender]= useState('')

  console.log()

  const save = async() =>{

    setLoading(true)


    if (fullName === '')        {toast.error('please provide your full name'), setLoading(false)}
    else if(gender === '') {toast.error('please select a gender '), setLoading(false)}
    else if(bio === '')         {toast.error('please provide a bio'), setLoading(false)}

    else{
        try {
          await axios.post(`${Url}/api/user/register`,{
            username:   user?.username,
            email:      user?.emailAddresses[0].emailAddress,
            fullName:   fullName,
            location:   location,
            gender:     gender,
            bio:        bio   
          })
          setTimeout(() => {
            toast.success('details saved')
            setLoading(false)
            window.location.reload()
          }, 2000);
        } catch (error) {
          setLoading(false)
          toast.error('error')
        }
    }
    
  }

  const CheckBox:React.FC<ModalProps> =({name, value, func})=>(
    <div className="flex items-center text_small gap-5">
        <button onClick={func} className="box md:w-5 w-6 h-6 md:h-5 rounded-full flex items-center justify-center">
        <AnimatePresence>
            {value && 
                <motion.div initial={{scale:0}} animate={{scale:1}} exit={{scale:0}}>
                    <Check/>
                </motion.div>}
        </AnimatePresence>
        </button>

        <p>{name}</p>
    </div>
)

  return (
    <div className='flex w-full items-center justify-center'>
      <div className='box w-[90%] md:w-[70%] flex flex-col items-center justify-center rounded-2xl md:px-16 px-4 py-8 gap-5'>

        <p className='text_large font-bold capitalize'>let's know you more</p>

        {/* full name and photo */}
        <div className='flex w-full gap-5'>
          <Input icon={<Mail />} isFocused={emailFocus} focus={()=>setEmailFocus(true)} blur={()=>setEmailFocus(false)} onChange={(e)=>setFullName(e.target.value)} placeholder={'Full name'} type={'email'}/>
        </div>
        {/* location */}
        <AuthDropdown placeholder='Please choose your location' data={locationData} dropdown={dropdown} setDropdown={setDropdown} setData={setLocation} icon={<MapPin/>} zIndex='50'/>


        {/* gender */}
        <div className='w-full flex flex-col items-center gap-5'>
          <p className='opacity-50 font-bold text_medium'>Gender</p>
          <div className='flex justify-between w-full'>
            <CheckBox name='Male' func={()=>setGender('Male')} value={gender === 'Male'}/>
            <CheckBox name='Female' func={()=>setGender('Female')} value={gender === 'Female'}/>
            <CheckBox name='Other' func={()=>setGender('Other')} value={gender === 'Other'}/>
          </div>
        </div>
          {/* bio */}
        <TextArea icon={<Mail />} isFocused={bioFocus} focus={()=>setBioFocus(true)} blur={()=>setBioFocus(false)} onChange={(e)=>setBio(e.target.value)} placeholder={'Bio'} height='h-[17vh]'/>

        
        <motion.button
        initial={{x:'-50%', opacity:0}} animate={{x:0, opacity:1, transition:{delay:0.5}}}
        whileHover={{scale:1.05, boxShadow:'0 0 10px #2F4064BF'}}
        onClick={save}
        style={{fontSize: Shared.Text.large}}
        className="box md:px-12 md:py-2 px-3 py-3 w-full rounded-xl font-bold "
        >
        {loading
          ?<l-waveform size="35" stroke="3.5" speed="1" color="white"/>
          :'Save'} 
          </motion.button>

      </div>
    </div>
  )
}

export default UserForm