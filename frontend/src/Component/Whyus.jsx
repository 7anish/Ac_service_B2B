import React from 'react'
import { FaTools, FaHeadset, FaMoneyBillWave, FaSmile, FaCalendarAlt } from "react-icons/fa";



const services = [
    {
        heading: "Quality Services",
        desc: "We have a creative team, always ready to help you.",
        icon: <FaTools size={26} color='white'/>
    },
    {
        heading: "24/7 Home Service",
        desc: "Our team is available around the clock to assist you.",
        icon: <FaHeadset size={26} color='white'/>
    },
    {
        heading: "Affordability Price",
        desc: "We offer competitive prices to fit your budget.",
        icon: <FaMoneyBillWave size={26} color='white'/>
    },
    {
        heading: "Client Satisfaction",
        desc: "Ensuring our clients are satisfied is our top priority.",
        icon: <FaSmile size={26} color='white'/>
    },
    {
        heading: "10 Years Experience",
        desc: "A decade of expertise in delivering excellent services.",
        icon: <FaCalendarAlt size={26} color='white' />
    }
];

const Whyus = () => {
    return (
        <div className="w-full h-fit mt-10 p-5 bg-[#e4824c]">
            <div className="w-full h-fit rounded-3xl flex flex-col justify-between items-center ">
                <div className="w-full h-[20%] flex flex-col justify-center items-center py-10">
                    <h1 className="font-palyfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#190d06]"><span className="text-4xl md:text-5xl lg:text-6xl">W</span>HY US</h1>
                    <p className="w-[90%] md:w-[80%] text-center mt-4 sm:text-sm md:text-lg text-[#190d06] font-light font-popines">When you call us, you’ll get the most dependable, skilled service in the Delhi NCR region from our own in-house technician! We are the best doorstep servicing centre for all appliance brands</p>
                </div>
                {/* <div className="w-[90%] md:w-[70%] h-[30%] overflow-hidden my-4">
          <img src={img} alt="" className="w-full h-full" />
        </div> */}
                <ol className="w-[80%] gap-4 items-start justify-start lg:flex my-5 sm:mb-20">
                    {
                        services.map((ele, i) => {
                            return <ListItem key={i} heading={ele.heading} desc={ele.desc} icon={ele.icon} />
                        })
                    }
                </ol>
            </div>
        </div>
    )
}

const ListItem = ({ heading, desc, icon }) => {
    return (
        <li data-aos="zoom-in" className="relative mb-6 sm:mb-0">
            <div className="flex items-center">
                <div className="flex items-center justify-center p-2 bg-blue-100 my-4 rounded-full ring-0 ring-white dark:bg-black sm:ring-8 dark:ring-gray-900 shrink-0">
                    {icon}
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            </div>
            <div className="mt-3 sm:pe-8">
                <h3 className="text-lg font-bold text-[#190d06]">{heading}</h3>
                <p className="text-base  text-[#190d06]">{desc}</p>
            </div>
        </li>
    )
}

export default Whyus
