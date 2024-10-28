import React from 'react'
import img from '../assets/image2.png'
const About = () => {
  return (
    <div className="w-full h-fit  py-20 p-5" id='about'>
            <div data-aos="fade-right" className='w-full h-fit rounded-2xl flex-col flex md:flex-row justify-between items-start'>
                <div data-aos="fade-left" className="w-[100%] md:w-[50%] h-full p-3 sm:p-7 flex flex-col justify-center items-start gap-7  md:pl-14">
                <h1 className="font-palyfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#fb823f]" data-aos="fade-up"><span className="text-4xl md:text-5xl lg:text-6xl">A</span>bout Us</h1>
                    <p className='text-sm lg:text-base text-justify font-light  font-popines' >Welcome to Installation World, your trusted partner in home appliance services, delivering convenience right to your doorstep. We specialize in AC services, including installation, repair, and gas filling, as well as refrigerator, washing machine, and geyser repairs. For the past five years, we've been solving the challenges of busy urban life by offering reliable, at-home appliance repair. Instead of disrupting your day to find a technician, just give Installation World a call, and our skilled team will come to you, saving you both time and money.</p>
                    
                </div>
                <div data-aos="fade-right" className="w-[100%] md:w-[50%] h-full flex justify-center items-center p-3 md:p-5">
                    <img src={img} alt="" className='rounded-2xl'/>
                </div>
            </div>
        </div>
  )
}

export default About
