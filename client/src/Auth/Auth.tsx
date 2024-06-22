import { useState } from 'react'
import Login from './Login'
import Register from './Register'

const Auth = () => {
  const [active, setActive] = useState(1)
  return (
    <div>
        {active === 0 && <Register setActive={setActive}/> }
        {active === 1 && <Login setActive={setActive}/>}
    </div>
  )
}

export default Auth