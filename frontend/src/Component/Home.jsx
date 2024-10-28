import React, { Component } from 'react'
import Hero from './Hero'
import Services from './Services'
import Whyus from './Whyus'
import Company from './Company'
import Contact from './Contact'
import About from './About'
import Form from './Form'

const Home = () => {
  return (
    <>
        {/* <Form /> */}
        <Hero />
        <Services />
        <About />
        <Whyus />
        <Company />
        <Contact />
    </>
  )
}

export default Home
