import React, { useEffect } from 'react'
import Login from './Login'
import Register from './Register'
import Hero from './Hero'
import AOS from 'aos';
import 'aos/dist/aos.css'; 


const Home = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div>
      <Hero/>
    </div>
  )
}

export default Home