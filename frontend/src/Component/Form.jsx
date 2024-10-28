import React, { useState , useEffect } from 'react'
import { DiVim } from 'react-icons/di';
import { RxCross2 } from "react-icons/rx";

const Form = () => {
    const [isopen , setisopen] = useState(false)
    const handleopen = ()=>{
        setisopen(!isopen)
    }

    useEffect(() => {
        document.body.style.overflowY = isopen ? "hidden" : "scroll"
    }, [isopen])
    return (
        <>
            <button className='w-[120px] h-[40px] flex justify-center items-center fixed rounded-t-2xl font-medium bg-[#fb823f] text-white -rotate-90 top-[80%] z-50 right-[-11%] sm:right-[-6%] md:right-[-5%] lg:right-[-3%]' onClick={()=> setisopen(!isopen)}>Book Now</button>
            <div className={`fixed top-0 w-full h-[100vh] bg-[#00000080] items-center justify-center z-50 ${isopen ?"flex" :"hidden"}`}>
                <div className='w-[320px] sm:w-[400px] h-fit py-4 bg-white rounded-md p-3 relative'>
                    <form className='w-full h-full '>
                        <RxCross2 fontSize={24} className='absolute top-1 right-1 cursor-pointer' onClick={handleopen} />
                        <h1 className='w-full text-center p-3 font-semibold text-xl font-popines'>AC REPAIR</h1>
                        <hr className='h-1 bg-black' />
                        <div className='flex flex-wrap gap-2 py-3 justify-center'>
                            <input type="text" placeholder='Full Name' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="text" placeholder='10 digit Mobile Number' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="text" placeholder='Your Email' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <select className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400'>
                                <option value="">Select Pin Code</option>
                                <option value="">123456</option>
                                <option value="">123456</option>
                                <option value="">123456</option>
                                <option value="">123456</option>
                            </select>
                            <select className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400'>
                                <option value="">Select City</option>
                                <option value="">Ghaziabad</option>
                                <option value="">Delhi</option>
                                <option value="">Faridabad</option>
                                <option value="">Noidas</option>
                            </select>
                            <input type="text" readOnly value={"Ac repair service"} className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="text" placeholder='Address' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="text" placeholder='House No./Building No.' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="text" placeholder='Land Mark' className='w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="submit" placeholder='Land Mark' className='w-[98%] h-10 p-2 font-roboto    bg-[#fb823f] cursor-pointer font-semibold text-lg text-white rounded-md' />
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Form
