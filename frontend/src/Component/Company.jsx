import React from 'react'
import img1 from '../assets/samsung.png'
import img2 from '../assets/gode.png'
import img3 from '../assets/haier.png'
import img4 from '../assets/ls.png'
import img5 from '../assets/voltas.png'


const Company = () => {
    return (
        <div className='w-full h-fit rounded-3xl flex flex-col justify-between items-center py-10'>
            <div className="w-full h-[20%] flex flex-col justify-center items-center">
                <h1 className="font-palyfair text-2xl md:text-4xl lg:text-4xl font-bold text-[#fb823f]" data-aos="fade-up">Brands we repair</h1>
                <p className="w-[95%] md:w-[80%] text-center mt-4 font-roboto font-light sm:text-sm md:text-lg text-black" data-aos="fade-up">No matter where you bought it, we can fix it. We repair most major brands, makes, and models.</p>
            </div>
        <div className='w-full h-[15vh] flex items-center justify-center px-5 sm:px-20 overflow-hidden'>
            <marquee behavior="" direction="" scrolldelay="10" scrollamount="10px">
                <div className='flex px-3 sm:px-10 gap-20 items-center'>
                    <img src={img1} alt="" className='w-130 h-20' />
                    <img src={img2} alt="" className='w-130 h-11 '/>
                    <img src={img3} alt="" className='w-130 h-11 '/>
                    <img src={img4} alt="" className='w-130 h-11 '/>
                    <img src={img5} alt="" className='w-100 h-11'/>
                    <img src={img1} alt="" className='w-130 h-20' />
                    <img src={img2} alt="" className='w-130 h-11 '/>
                    <img src={img3} alt="" className='w-130 h-11 '/>
                    <img src={img4} alt="" className='w-130 h-11 '/>
                    <img src={img5} alt="" className='w-100 h-11'/>
                </div>
            </marquee>
        </div>
        </div>
    )
}

export default Company
