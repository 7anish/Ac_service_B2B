import React from 'react'
import logo from '../assets/iwlogo.png'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail  , MdLocationOn} from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';


const Footer = () => {
    const locaion = useLocation()
    return (
        <footer className={`w-full bg-gray-800 ${locaion.pathname === '/admindashboard' ? 'hidden' : ''}`} >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
                    <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                        <img src={logo} alt="" className='md:w-40 w-28 cursor-pointer md:items-start items-center' />
                        <p className="py-8 text-sm text-white lg:max-w-xs text-center lg:text-left font-bold font-popines">Trusted By 27k+ Coustumers With 10 year of exprinces</p>
                    </div>
                    <div className="lg:mx-auto text-left font-popines">
                        <h4 className="text-lg text-white font-medium mb-7">Usefull Links</h4>
                        <ul className="text-sm  transition-all duration-500">
                            <li className="mb-6"><a href="./#" className="text-gray-300 font-medium hover:text-orange-600 duration-300">Home</a></li>
                            <li className="mb-6"><a href="./#about" className=" text-gray-300 font-medium hover:text-orange-600 duration-300">About</a></li>
                            <li className="mb-6"><a href="./#contact" className=" text-gray-300 font-medium hover:text-orange-600 duration-300">Contact</a></li>
                            <li><a href="./privacy" className=" text-gray-300 font-medium hover:text-orange-600 duration-300">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="lg:mx-auto text-left font-popines">
                        <h4 className="text-lg text-white font-medium mb-7">Services</h4>
                        <ul className="text-sm  transition-all duration-500">
                            <li className="mb-6"><a href="./#services" className="text-gray-300 font-medium hover:text-orange-600 duration-300">AC Repair</a></li>
                            <li className="mb-6"><a href="./#services" className=" text-gray-300 font-medium hover:text-orange-600 duration-300">AC Service</a></li>
                            <li className="mb-6"><a href="./#services" className=" text-gray-300 font-medium hover:text-orange-600 duration-300">AC Gas Filling</a></li>
                            <li className="mb-6"><a href="./#services" className=" text-gray-300 font-medium hover:text-orange-600 duration-300">Split AC Installation</a></li>
                            <li><a href="javascript:;" className=" text-gray-300 font-medium hover:text-orange-600 duration-300">Window AC Installation</a></li>
                        </ul>
                    </div>
                    <div className="w-fit lg:mx-auto text-left font-popines flex-col justify-start items-start overflow-hidden">
                        <h4 className="text-lg text-white font-medium mb-7">Contact</h4>
                        <li className="w-full  mb-6 flex items-center justify-start gap-1 text-gray-300 font-medium"><FaPhoneAlt />+91 8376996688</li>
                        <li className="mb-6 flex items-center justify-center gap-1 text-gray-300 font-medium"><MdEmail />installationworld5858@gmail.com</li>
                        <li className="mb-6 flex items-center justify-center gap-1 text-gray-300 font-medium text-sm"><MdLocationOn size={24}/>F 48 Shopping Centre 1 Mansarovar Garden New Delhi 110015</li>
                    </div>
                </div>
                <div className="py-7 border-t border-gray-200">
                    <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
                        <span className="text-sm text-gray-200 font-popines">©Instalationworld 2024, rights reserved.</span>
                        <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                            <h1 className='flex  justify-center items-center gap-2 text-gray-200' >Developed By <a href='https://github.com/7anish' target='_blank' className='flex gap-1 justify-center items-center hover:text-blue-500 hover:underline'><FaGithub />Anish</a></h1>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
