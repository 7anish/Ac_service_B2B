import React, { useState } from 'react'
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from '../assets/iwlogo.png'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail  , MdLocationOn} from "react-icons/md";
import { HashLink } from 'react-router-hash-link';



const Header = () => {
    const [open, setopen] = useState(false)
    const [dropdown, stedropdown] = useState(false)
    return (
        <>
        <div className='w-full h-[5vh] bg-[#fb823f] hidden md:flex  items-center justify-end gap-6 px-20'>
        <h2  className='flex justify-center items-center gap-1 text-[#190d06] font-bold'><FaPhoneAlt />+91 8376996688</h2>
        <h2 className='flex justify-center items-center gap-1 text-[#190d06] font-bold'><MdEmail />installationworld5858@gmail.com</h2>
        </div>
            <nav className='w-full h-[10vh]  bg-white flex items-center justify-between  lg:px-20 sm:px-10 px-4 z-40'>
            <div className='w-[80%]md:w-[50%] h-full flex items-center '>
                <img src={logo} alt="" className='w-32' />
            </div>
            <div className='h-full flex items-center md:hidden'>
                {open ? <RxCross2 fontSize={30} onClick={() => setopen(!open)} /> : <IoReorderThree fontSize={30} onClick={() => setopen(!open)} />}
            </div>
            <div className='absolute md:static w-full min-h-[20vh] md:w-[40%] md:min-h-full  top-[10%]  duration-500 flex items-start justify-start  md:justify-end bg-white md:bg-transparent z-50' style={{ left: open ? "0%" : "-100%" }}>
                <ul className='flex md:flex-row flex-col md:items-center  items-start gap-2 md:gap-10 pt-4 pl-3 md:pl-0 '>
                    <li>
                        <HashLink to={'/#home'} className='font-bold text-black hover:text-[#fb823f] duration-300' onClick={() => setopen(!open)}>Home</HashLink>
                    </li>
                    <li>
                        <HashLink to={'/#about'} className='font-bold text-black hover:text-[#fb823f] duration-300' onClick={() => setopen(!open)}>About</HashLink>
                    </li>
                    <li>
                        <HashLink to={"/#contact"} className='font-bold text-black hover:text-[#fb823f] duration-300' onClick={() => setopen(!open)}>Contact</HashLink>
                    </li>
                    <li className='relative'>
                        <button className='flex justify-center items-center  rounded-2xl md:p-2 md:px-3 font-medium md:bg-[#fb823f] text-black md:text-white' onClick={() => stedropdown(!dropdown)}>Services&nbsp;<IoIosArrowDown size={16} className={`translate-y-0.5 duration-300 ${dropdown ? '-rotate-180	' : 'rotate-0'}`} /></button>
                        <ul className={`min-w-[300px] h-fit px-10 py-4 rounded-xl   md:absolute flex-col gap-3 top-[120%] duration-300 right-0 z-50 ${dropdown ? 'flex' : 'hidden'} md:bg-white md:shadow-dropdown`}>
                            <li>
                                <a href="/#services" onClick={() => setopen(!open)}>AC Repair</a>
                            </li>
                            <li>
                                <a href="/#services" onClick={() => setopen(!open)}>AC Service</a>
                            </li>
                            <li>
                                <a href="/#services" onClick={() => setopen(!open)}>AC Gas Filling</a>
                            </li>
                            <li>
                                <a href="/#services" onClick={() => setopen(!open)}>Split AC Installation</a>
                            </li>
                            <li>
                                <a href="/#services" onClick={() => setopen(!open)}>Window AC Installation</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Header


{/* <h1 className='bg-pink-300 p-2 rounded-2xl font-medium cursor-pointer'>+91 6203821043</h1>
<button className='flex justify-center items-center bg-pink-300 rounded-2xl p-2 font-medium'>Services<IoMdArrowDropdown size={22}/></button> */}
