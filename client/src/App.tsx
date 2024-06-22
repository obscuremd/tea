import './App.css'
import Header from './Components/Header';
import Navigation from './Screens/Navigation';
import { BrowserRouter } from 'react-router-dom'
import { UserState } from './state/atoms/UserState';
import { useRecoilState } from 'recoil';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import axios from 'axios';
import { Url } from './assets/Shared';
import Auth from './Auth/Auth';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

function App() {

  // const token = window.localStorage.getItem('token');

  // // console.log(jwtDecode(token));

  // const [user, setUser] = useRecoilState(UserState)

  // useEffect(() => {
  //   token && fetchUser()
  // }, [token])

  // const fetchUser = async () => {
  //   try {
  //     const req = await axios.get(`${Url}/api/users/?username=${jwtDecode(token).user.username}`)
  //     setUser(req.data)
  //   } catch (error) {
  //     if (error.response && error.response.status === 304) {
  //       window.localStorage.removeItem('token');
  //       setUser(null);
  //       // Redirect to login or show a message
  //     }
  //   }
  // }


  return (
    <BrowserRouter>
      <div className='min-w-full bg-[#191A23] text-white md:px-0 px-[17px] '>
        <Header />

          <SignedIn>
            <Navigation /> 
          </SignedIn>
          <SignedOut>
            <Auth />
          </SignedOut>

      </div>
    </BrowserRouter>
  )
}

export default App
