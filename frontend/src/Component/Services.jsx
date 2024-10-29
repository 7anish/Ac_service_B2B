import React, { useState, useEffect } from 'react'
import windowac from '../assets/window-ac.png'
import ac from '../assets/air-conditioner.png'
import split from '../assets/split.png'
import center from '../assets/center.png'
import service from '../assets/service.png'
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2'
import axios from 'axios'
import { TbLoader3 } from "react-icons/tb";


const installationservices = [
    {
        name: "Window AC",
        image: windowac,
        backgroundColor: "#f0f0ff"  // Light gray-blue
    },
    {
        name: "Split Air Conditioners",
        image: split,
        backgroundColor: "#fffaf0"  // Light orange
    },
    {
        name: "Cassette AC",
        image: center,
        backgroundColor: "#f0fff4"  // Light green
    },
    {
        name: "VRF AC",
        image: service,
        backgroundColor: "#f9f0ff"  // Light purple
    },
    {
        name: "Ductable AC",
        image: ac,
        backgroundColor: "#f0f8ff"  // Light blue
    },
];
const Services = () => {
    const [isopen, setisopen] = useState(false)
    const [name, setname] = useState("none")
    const [servicetype, setservicetype] = useState("none")
    const handleopen = (name, type) => {
        setname(name)
        setservicetype(type)
        setisopen(!isopen)
    }

    useEffect(() => {
        document.body.style.overflowY = isopen ? "hidden" : "scroll"
    }, [isopen])


    const [isprocessing, setisprocessing] = useState(false)

    // check email
    const checkmail = (email) => {
        return /^[a-z0-9\._%+\-]+@[a-z0-9\.\-]+\.[a-z]{1,}[^\._%+\-,!@#$%^&*()0-9{}<>?:"<;'|/\\=_]$/.test(
            email
        );
    };

    // check phone number
    const checkphoneNumber = (phone) => {
        return /^[6-9]{1}[0-9]{9}$/.test(phone);
    };

    const checkpincode = (pin) => {
        return /^[0-9]{6}$/.test(pin);
    };

    // check shope name and owner name
    const checkname = (name) => {
        return /^[a-zA-Z]{1}[a-zA-Z\s]{2,}$/.test(name);
    };

    //check others
    const checkothers = (value) => {
        return /^(?!\s*$).+/.test(value);
    };


    const sumbitForm = async (e) => {
        e.preventDefault()
        setisprocessing(true)
        const detail = {
            name: e.target.name.value,
            phonenumber: e.target.Phone.value,
            gmail: e.target.mail.value,
            pincode: e.target.pincode.value,
            city: e.target.city.value,
            service: e.target.service.value,
            servicetype: e.target.servicetype.value,
            address: e.target.address.value,
            houseNo: e.target.houseNo.value,
            landmark: e.target.landmark.value
        }

        if (
            checkmail(e.target.mail.value) &&
            checkphoneNumber(e.target.Phone.value) &&
            checkpincode(e.target.pincode.value) &&
            checkname(e.target.name.value) &&
            checkothers(e.target.city.value) &&
            checkothers(e.target.service.value) &&
            checkothers(e.target.servicetype.value) &&
            checkothers(e.target.address.value) &&
            checkothers(e.target.houseNo.value) &&
            checkothers(e.target.landmark.value)
        ) {
        }
        else {
            Swal.fire("Enter All the fields Properly");
            setisprocessing(false)
            return
        }
        try {
            const res = await axios.post("https://acservice-production.up.railway.app/api/v1/order/createorder", detail)

            if (res.status == 201) {
                Swal.fire({
                    title: "Ordered Sucessfully Placed",
                    text: "One of our executive contact you soon",
                    icon: "success"
                });

                e.target.name.value = "",
                    e.target.Phone.value = "",
                    e.target.mail.value = "",
                    e.target.pincode.value = "",
                    e.target.city.value = "",
                    e.target.servicetype.value = "",
                    e.target.address.value = "",
                    e.target.houseNo.value = "",
                    e.target.landmark.value = ""
                setisprocessing(false)
                setisopen(false)
                return;

            } else {
                Swal.fire({
                    title: "Error In sending Message",
                    text: "Please Try after some time",
                    icon: "error"
                });
                setisprocessing(false)
                return
            }
        } catch (e) {
            console.log(e)
            Swal.fire({
                title: "Error In sending Message",
                text: "Please Try after some time",
                icon: "error"
            });
            setisprocessing(false)
        }
    }
    return (
        <>
            <div className="w-full h-fit rounded-3xl flex flex-col justify-between items-center py-7 px-4">
                <div className="w-full h-[20%] flex flex-col justify-center items-center">
                    <h1 className="font-palyfair text-2xl md:text-4xl lg:text-5xl font-bold text-[#fb823f]" data-aos="fade-up"><span className="text-4xl md:text-5xl lg:text-6xl">O</span>ur Services</h1>
                    <p className="w-[95%] md:w-[80%] sm:text-center text-justify mt-4 px-4 font-roboto font-light sm:text-sm md:text-lg text-black" data-aos="fade-up">Installation World company provides complete home appliances service. <span className="text-xl font-semibold text-[#fb823f]">Installation World</span>  is at your service for the last five years mostly we provide ac service repair & installation, refrigerator repair, washing wachine reapir etc our technicians are verified and experienced.</p>
                </div>
                <h1 className="w-full text-center md:text-left sm:px-16 font-palyfair text-2xl md:text-3xl lg:text-3xl py-3 font-bold text-[#fb823f]" data-aos="fade-up">Ac Installation Services</h1>
                <div className='w-full h-fit  py-10 flex flex-wrap items-center justify-center gap-4' id='services'>
                    {
                        installationservices.map((item, i) => <Card key={i} image={item.image} heading={item.name} color={item.backgroundColor} type={"Ac Installation Services"} handleopen={handleopen} />)
                    }
                </div>
                <h1 className="w-full text-center md:text-left sm:px-16 font-palyfair text-2xl md:text-3xl lg:text-3xl py-3 font-bold text-[#fb823f]" data-aos="fade-up">Ac Service , Repair Service, Uninstallation Service</h1>
                <div className='w-full h-fit  py-10 flex flex-wrap items-center justify-center gap-4' id='services'>
                    {
                        installationservices.map((item, i) => <Card key={i} image={item.image} heading={item.name} color={item.backgroundColor} type={"Ac Service"} handleopen={handleopen} />)
                    }
                </div>
                <h1 className="w-full text-center md:text-left sm:px-16 font-palyfair text-2xl md:text-3xl lg:text-3xl py-3 font-bold text-[#fb823f]" data-aos="fade-up">Ac Gas Filling Services</h1>
                <div className='w-full h-fit  py-10 flex flex-wrap items-center justify-center gap-4' id='services'>
                    {
                        installationservices.map((item, i) => <Card key={i} image={item.image} heading={item.name} color={item.backgroundColor} type={"Ac Gas Filling Services"} handleopen={handleopen} />)
                    }
                </div>
            </div>
            <div className={`fixed top-0 w-full h-[100vh] bg-[#00000080] items-center justify-center gap-10 z-50 ${isopen ? "flex" : "hidden"}`}>
                <div className='w-[320px] sm:w-[500px] h-fit sm:py-10 bg-white rounded-md p-3 relative'>
                    <form className='w-full h-full' onSubmit={(e) => sumbitForm(e)}>
                        <RxCross2 fontSize={24} className='absolute top-1 right-1 cursor-pointer' onClick={() => handleopen("none")} />
                        <h1 className='w-full text-center p-3 font-semibold text-xl font-popines'>{name}</h1>
                        <hr className='h-1 bg-black' />
                        <div className='flex flex-wrap gap-2 py-3 justify-center'>
                            <input type="text" name='name' placeholder='Full Name' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="tel" name='Phone' placeholder='10 digit Mobile Number' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="email" name='mail' placeholder='Your Email' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <select className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' name='pincode'>
                                <option value="">Select Pin Code</option>
                                <option value="110008">110008</option>
                                <option value="110012">110012</option>
                                <option value="110026">110026</option>
                                <option value="110027">110027</option>
                                <option value="110028">110028</option>
                                <option value="110015">110015</option>
                                <option value="110018">110018</option>
                                <option value="110046">110046</option>
                                <option value="110058">110058</option>
                                <option value="110060">110060</option>
                                <option value="110064">110064</option>
                                <option value="110063">110063</option>
                                <option value="110087">110087</option>
                                <option value="110007">110007</option>
                                <option value="110054">110054</option>
                                <option value="110035">110025</option>
                                <option value="110052">110052</option>
                            </select>
                            <select className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' name='city'>
                                <option value="">Select City</option>
                                <option value="Ghaziabad">Ghaziabad</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Faridabad">Faridabad</option>
                                <option value="Noida">Noida</option>
                            </select>
                            <input type="text" name='service' readOnly value={name} className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            {servicetype != "Ac Service" ?
                                <input type="text" name='servicetype' readOnly value={servicetype} className='w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                                :
                                <select className='w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' name='servicetype'>
                                    <option value="">Select Service</option>
                                    <option value="AC Service">AC Service</option>
                                    <option value="Repair Service">Repair Service</option>
                                    <option value="Uninstallation Service">Uninstallation Service</option>
                                </select>

                            }
                            <input type="text" name='address' placeholder='Address' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="text" name='houseNo' placeholder='House No./Building No.' className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            <input type="text" name='landmark' placeholder='Land Mark' className='w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' />
                            {/* <input type="submit" placeholder='Land Mark' className='w-[98%] h-10 p-2 font-roboto    bg-[#fb823f] cursor-pointer font-semibold text-lg text-white rounded-md' /> */}
                            <button className={`w-[98%] h-10 p-2 font-roboto    bg-[#fb823f] cursor-pointer font-semibold text-lg text-white rounded-md`}>{isprocessing ? (
                                <div className='w-full h-full flex justify-center'>
                                    <TbLoader3 className='animate-spin' size={24} />
                                </div>
                            ) :
                                "Submit"
                            }</button>
                        </div>

                    </form>
                </div>
            </div>
        </>

    )
}

const Card = ({ image, heading, color, handleopen, type }) => {
    return (
        <div data-aos="fade-up" className="w-[240px] h-[170px]  rounded-2xl  shadow-card flex flex-col justify-between items-center p-3 py-5 cursor-pointer duration-300 hover:shadow-2xl relative overflow-hidden gap-3" onClick={() => handleopen(heading, type)}>
            <div className='w-full h-full absolute top-[10%] clip-path-service z-10'></div>
            <img src={image} alt="" className='w-[100px]rounded-lg bg-blue-100  p-2 rounded-xl' />
            <div className='h-[60%] flex flex-col items-center gap-4 z-20'>
                <h1 className='text-lg font-semibold text-center z-20 font-popines'>{heading}</h1>
            </div>
        </div>
    )
}
export default Services
