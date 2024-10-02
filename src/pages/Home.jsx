import React from 'react'
import HeroSection from '../components/HeroSection'
import Testimonial from '../components/Testimonial'
import Download from '../components/Download'
import AboutUs from '../components/AboutUs'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <Testimonial/>
      <Download/>
    </div>
  )
}

export default Home
