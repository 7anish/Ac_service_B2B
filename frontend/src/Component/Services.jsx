import React, { useState, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2'
import axios from 'axios'
import { TbLoader3 } from "react-icons/tb";

const Services = () => {
    const [isopen, setisopen] = useState(false)
    const [name, setname] = useState("none")
    const [servicetype, setservicetype] = useState("none")
    const [loading, setLoading] = useState(true)
    
    // Dynamic data states
    const [normalInstallationServices, setNormalInstallationServices] = useState([])
    const [pincodes, setPincodes] = useState([])
    const [cities, setCities] = useState([])

    const handleopen = (name, type) => {
        setname(name)
        setservicetype(type)
        setisopen(!isopen)
    }

    useEffect(() => {
        document.body.style.overflowY = isopen ? "hidden" : "scroll"
    }, [isopen])

    // Fetch services and pincodes on component mount
    useEffect(() => {
        fetchServices()
        fetchPincodes()
        fetchCities()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await axios.get('https://installationworld.yaytech.in/api/v1/service/getall')
            if (response.data.success) {
                const services = response.data.services
                // All services in one list
                setNormalInstallationServices(services)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching services:', error)
            setLoading(false)
        }
    }

    const fetchPincodes = async () => {
        try {
            const response = await axios.get('https://installationworld.yaytech.in/api/v1/pincode/getall')
            if (response.data.success) {
                setPincodes(response.data.pincodes)
            }
        } catch (error) {
            console.error('Error fetching pincodes:', error)
        }
    }

    const fetchCities = async () => {
        try {
            const response = await axios.get('https://installationworld.yaytech.in/api/v1/pincode/cities')
            if (response.data.success) {
                setCities(response.data.cities)
            }
        } catch (error) {
            console.error('Error fetching cities:', error)
        }
    }


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
            checkothers(e.target.pincode.value) &&
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
            const res = await axios.post("https://installationworld.yaytech.in/api/v1/order/createorder", detail)

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

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <TbLoader3 className="animate-spin" size={48} />
            </div>
        )
    }
    return (
        <>
            <div className="w-full h-fit rounded-3xl flex flex-col justify-between items-center py-7 px-4">
                <div className="w-full h-[20%] flex flex-col justify-center items-center">
                    <h1 className="font-palyfair text-2xl md:text-4xl lg:text-5xl font-bold text-[#fb823f]" data-aos="fade-up"><span className="text-4xl md:text-5xl lg:text-6xl" >O</span>ur Services</h1>
                    <p className="w-[95%] md:w-[80%] sm:text-center text-justify mt-4 px-4 font-roboto font-light sm:text-sm md:text-lg text-black" data-aos="fade-up">Installation World company provides complete home appliances service. <span className="text-xl font-semibold text-[#fb823f]">Installation World</span>  is at your service for the last Ten years mostly we provide ac service repair & installation our technicians are verified and experienced.</p>
                </div>
                {/* <h1 className="w-full text-center md:text-left sm:px-16 font-palyfair text-2xl md:text-3xl lg:text-3xl py-3 font-bold text-[#fb823f]" data-aos="fade-up">Our AC Services</h1> */}
                <div className='w-full h-fit  py-10 flex flex-wrap items-center justify-center gap-4' id='services'>
                    {normalInstallationServices.length > 0 ? (
                        normalInstallationServices.map((item, i) => <Card key={i} image={item.image} heading={item.name} color={item.backgroundColor} type={"AC Service"} features={item.features} handleopen={handleopen} />)
                    ) : (
                        <p className="text-gray-500">No services available</p>
                    )}
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
                                {pincodes.map((pin) => (
                                    <option key={pin._id} value={pin.pincode}>{pin.pincode}</option>
                                ))}
                            </select>
                            <select className='md:w-[48%] w-[98%] h-10 p-2 font-roboto  text-sm border-2 border-gray-400' name='city'>
                                <option value="">Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>{city}</option>
                                ))}
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

const Card = ({ image, heading, color, handleopen, type, features }) => {
    return (
        <div data-aos="fade-up" className="w-[350px] h-[520px] rounded-2xl shadow-card flex flex-col items-start cursor-pointer duration-300 hover:shadow-2xl relative overflow-hidden" onClick={() => handleopen(heading, type)}>
            <div className='w-full h-full absolute top-[10%] clip-path-service z-10'></div>
            <div className='w-full h-[200px] flex justify-center items-center z-20'>
                <img src={image} alt="" className=' object-contain rounded-lg bg-blue-100' />
            </div>
            <div className='w-full flex flex-col gap-3 z-20 p-6 flex-1'>
                <h1 className='text-xl font-bold text-left z-20 font-popines'>{heading}</h1>
                {features && features.length > 0 && (
                    <ul className='list-none space-y-2 flex-1 overflow-y-auto'>
                        {features.map((feature, index) => (
                            <li key={index} className='flex items-start gap-2 text-sm'>
                                <span className='text-[#fb823f] text-lg'>✓</span>
                                <span className='text-gray-700'>{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <button className='mt-auto bg-[#fb823f] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#e67332] transition' onClick={(e) => {
                    e.stopPropagation();
                    handleopen(heading, type);
                }}>
                    Enquiry now
                </button>
            </div>
        </div>
    )
}
export default Services
