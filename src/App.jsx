import React from 'react'
import Navbar from './pages/Navbar'
import Hero from './pages/Hero'
import Testimonial from './pages/Testimonial'
import Store from './pages/Store'
import Marketing from './pages/Marketing'
import Footer from './pages/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Testimonial/>
      <Store/>
      <Marketing/>
      <Footer/>
    </div>
  )
}

export default App