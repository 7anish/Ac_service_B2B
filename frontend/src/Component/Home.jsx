import React, { Component } from 'react'
import Hero from './Hero'
import Services from './Services'
import Whyus from './Whyus'
import Company from './Company'
import Contact from './Contact'
import About from './About'
import Form from './Form'
import About2 from './About2'
const Home = () => {
  return (
    <>
        {/* <Form /> */}
        <Hero />
        <Services />
        <About />
        <About2 />
        <Whyus />
        <Company />
        <Contact />
    </>
  )
}

export default Home
