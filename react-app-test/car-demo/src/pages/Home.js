import React from 'react';
import Navbar from '../components/Navbar';
import Carcards from '../components/Carcards';
import Footer from '../components/Footer';
import { useAuth } from '../components/Authcontext';
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
function Home() {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      
      <center>
        <img className='h-500 w-500' src={image1} alt='image1' />
      </center>


      <Carcards />

      <center>
      <p style={{ fontSize: '48px', color: 'red' }}>We deal in and with</p>
        <img className='h-500 w-800' src={image2} alt='image2' />
      </center>

      <Footer></Footer>
    </div>
  );
}

export default Home;