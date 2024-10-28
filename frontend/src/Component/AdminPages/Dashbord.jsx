import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoReorderThree } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import logo from '../../assets/iwlogo.png'
import ContactCard from './ContactCard';
import OrderCard from './OrederCard';


const Admindashboad = () => {
    const [open , setopen] = useState(false)
    const navigate = useNavigate()
    const [Authorized, setAuthorizaed] = useState(false)
    const [contactdata , setcontactdata] = useState([])
    const [orderdata , setorderdata]  = useState([])
    const [iscontact , setiscontact] = useState("Contact") 


    const fetchcontactdata = async () => {
        try {
            const token = (document.cookie?.split('; ')?.find((ele) => {
                return ele?.split('=')[0] == "csdtpls"
            }))?.split('=')[1]

            const res = await axios.get("https://acservice-production.up.railway.app/api/v1/contact/getcontactlist", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (res.status == 200) {
                setAuthorizaed(true)
            }
            setcontactdata(res.data)
        } catch (e) {
            if (e.status == 401) {
                setAuthorizaed(false)
            }
        }
    }
    const fetchorderdata = async () => {
        try {
            const token = (document.cookie?.split('; ')?.find((ele) => {
                return ele?.split('=')[0] == "csdtpls"
            }))?.split('=')[1]

            const res = await axios.get("https://acservice-production.up.railway.app/api/v1/order/getallorder", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (res.status == 200) {
                setAuthorizaed(true)
            }
            setorderdata(res.data)
        } catch (e) {
            if (e.status == 401) {
                setAuthorizaed(false)
            }
        }
    }

    useEffect(() => {
        if (!document.cookie) {
            navigate('/')
            return
        }
        else {
            fetchcontactdata();
            fetchorderdata();
        }
    }, [])


    const handlelogout = () => {
        document.cookie = "csdtpls" + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = "./"
    }
    return (
        <div className=' overflow-x-hidden'>
            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-black rounded-lg sm:hidden  focus:outline-none focus:ring-2  absolute top-3 right-3 z-50" onClick={()=> setopen(!open)}>
            {open ? <RxCross2 fontSize={30} color='black' onClick={() => setopen(!open)} /> : <IoReorderThree fontSize={30} color='black' onClick={() => setopen(!open)} />}
            </button>
            <aside id="sidebar-multi-level-sidebar" className={`fixed top-[10vh] left-0 z-40 w-64 h-screen transition-transform -translate-x-full duration-500 sm:translate-x-0 ${open ?  'translate-x-0' : '-translate-x-full'  }`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-700">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div className="flex items-center p-2 text-gray-50 hover:text-gray-100 rounded-lg cursor-pointer" onClick={() => navigate('/')}>
                                <svg className="w-5 h-5 text-gray-50 hover:text-gray-100 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                                </svg>
                                <span className="ms-3">Home</span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center p-2 text-gray-50 hover:text-gray-100 rounded-lg cursor-pointer " onClick={() => {
                                setopen(!open)
                                setiscontact("Orders")
                                }}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-50 hover:text-gray-100 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
                            </div>
                        </li>
                        <li>
                            <div href="#" className="flex items-center p-2 text-gray-50 hover:text-gray-100 rounded-lg cursor-pointer" onClick={() => {
                                setopen(!open)
                                setiscontact("Contact")
                                }}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-50 hover:text-gray-100 transition duration-75 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Messages</span>
                            </div>
                        </li>
                        <li>
                            <div href="#" className="flex items-center p-2 text-gray-50 hover:text-gray-100 rounded-lg cursor-pointer" onClick={handlelogout}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-50 hover:text-gray-100 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
            <div class="">
            <div className='w-[100vw] min-h-[10vh] z-10  shadow-card flex sm:flex-row flex-col sticky px-3 sm:px-10'>
                <img src={logo} alt="" className='w-32 cursor-pointer' onClick={()=> navigate('/')} />
                <h1 className='text-black text-4xl font-bold w-full flex items-center justify-center font-popines py-5'>{`${iscontact} List`}</h1>
            </div>
            <div className='sm:ml-64 h-[90vh] flex flex-wrap justify-center p-4 gap-6 overflow-scroll py-10 dash'>
                   {
                    iscontact  === "Contact"? 
                    (
                        contactdata.map((item , i)=>{
                            return <ContactCard key={i} Name={item.name} email={item.email} PHno={item.phoneNumber} mess={item.message} id={item._id} />
                        })
                    )
                    :
                    (
                        orderdata.map((item , i)=>{
                            return <OrderCard  key={i} id={item._id} name={item.name} phonenumber={item.phonenumber} gmail={item.gmail} pincode={item.pincode} city={item.city} servicetype={item.servicetype} address={item.address} landmark={item.landmark} houseNo={item.houseNo} service={item.service}/>
                        })
                    )
                   }
            </div>
            </div>
        </div>
    )
}





export default Admindashboad