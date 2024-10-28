import React ,{ useState }from 'react'
import img from '../assets/image1.jpeg'
import Swal from 'sweetalert2'
import axios from 'axios'
import { TbLoader3 } from "react-icons/tb";

const Contact = () => {
    const [isprocessing, setisprocessing] = useState(false)
    const checkphoneNumber = (phone) => {
        return /^[6-9]{1}[0-9]{9}$/.test(phone);
    };

    // check email
    const checkmail = (email) => {
        return /^[a-z0-9\._%+\-]+@[a-z0-9\.\-]+\.[a-z]{1,}[^\._%+\-,!@#$%^&*()0-9{}<>?:"<;'|/\\=_]$/.test(
            email
        );
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
            name : e.target.name.value,
            phoneNumber : e.target.Phone.value,
            email : e.target.mail.value,
            message : e.target.message.value,
        }


        if (
            checkmail(e.target.mail.value) &&
            checkphoneNumber(e.target.Phone.value) &&
            checkname(e.target.name.value) &&
            checkothers(e.target.message.value)
        ) {
        }
        else {
            Swal.fire("Enter All the fields Properly");
            setisprocessing(false)
            return
        }
        try {
            const res = await axios.post("https://acservice-production.up.railway.app/api/v1/contact/createcontact", detail)

            if (res.status == 201) {
                Swal.fire({
                    title: "Message Sent Sucessfully",
                    text: "One of our executive contact you soon",
                    icon: "success"
                });

                e.target.name.value = "",
                e.target.Phone.value = "",
                e.target.mail.value = "",
                e.target.message.value = "",
                setisprocessing(false)
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
        <section class="md:pt-10 md:pb-10 mb-10 sm:mb-0  bg-white sm:bg-custom-gradient" id='contact'>
            <div class="mx-auto max-w-full md:px-28 px-3">
                <div class="grid lg:grid-cols-2 grid-cols-1">
                    <div class="lg:mb-0 mb-10">
                        <div class="group w-full  h-full">
                            <div class="relative  h-full md:block hidden rounded-l-2xl">
                                <img src={img} alt="ContactUs tailwind section" class="w-full h-full  bg-blend-multiply  object-cover" />
                                {/* <h1 class="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">Contact us</h1> */}
                                <div class="absolute bottom-0 w-full lg:p-11 p-5">
                                    <div class="bg-white rounded-lg p-6 block">
                                        <a href="javascript:;" class="flex items-center mb-6">
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z" stroke="#ff8119" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <h5 class="text-black text-base font-normal leading-6 ml-5">+91 8376996688</h5>
                                        </a>
                                        <a href="javascript:;" class="flex items-center mb-6">
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z" stroke="#ff8119" stroke-width="2" stroke-linecap="round" />
                                            </svg>
                                            <h5 class="text-black text-base font-normal leading-6 ml-5">installationworld5858@gmail.com</h5>
                                        </a>
                                        <a href="javascript:;" class="flex items-center">
                                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z" stroke="#ff8119" stroke-width="2" />
                                                <path d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z" stroke="#ff8119" stroke-width="2" />
                                            </svg>
                                            <h5 class="text-black text-base font-normal leading-6 ml-5">F 48 Shopping Centre 1 Mansar- over Garden New Delhi 110015</h5>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form class="bg-gray-50 p-5 lg:p-11" onSubmit={(e)=> sumbitForm(e)}>
                        <h2 class="text-orange-500 text-2xl sm:text-4xl font-semibold leading-10 mb-11 font-popines">Send Us A Message</h2>
                        <input name='name' type="text" class="w-full h-12 text-gray-600 placeholder-gray-400  shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Name" />
                        <input name='mail' type="text" class="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Email" />
                        <input name='Phone' type="text" class="w-full h-12 text-gray-600 placeholder-gray-400 shadow-sm bg-transparent text-lg font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Phone" />
                        <input name='message' type="text" class="w-full h-12 text-gray-600 placeholder-gray-400 bg-transparent text-lg shadow-sm font-normal leading-7 rounded-full border border-gray-200 focus:outline-none pl-4 mb-10" placeholder="Message" />
                        <button class="w-full h-12 text-white text-base font-semibold leading-6 rounded-full transition-all duration-700 hover:bg-orange-400 bg-orange-600 shadow-sm">{isprocessing? (
                                <div className='w-full h-full flex justify-center items-center'>
                                <TbLoader3  className='animate-spin' size={30}/>
                                </div>
                            ):
                            "Submit"
                            }
                            </button>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default Contact
