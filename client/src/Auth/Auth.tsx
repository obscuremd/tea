import { useState } from 'react'
import Login from './Login'
import Register from './Register'
import EmailVerification from './EmailVerification'
import LoginVerification from './LoginVerification'

const Auth = () => {
  const [active, setActive] = useState(1)
  return (
    <div>
        {active === 0 && <Register setActive={setActive}/> }
        {active === 1 && <Login setActive={setActive}/>}
        {active === 2 && <EmailVerification setActives={setActive}/>}
        {active === 3 && <LoginVerification setActives={setActive}/>}
    </div>
  )
}

export default Auth