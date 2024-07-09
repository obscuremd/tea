import './App.css'
import Header from './Atoms/Header';
import Navigation from './Navigation/Navigation';
import { BrowserRouter } from 'react-router-dom'
import { ToasterStyle } from './assets/Shared';
import Auth from './Auth/Auth';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <BrowserRouter>
      <Toaster reverseOrder={false} toastOptions={{ style: ToasterStyle }} />
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
