import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaBuilding } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import Swal from 'sweetalert2';
import { useState } from "react";

const ContactCard = ({Name ,  PHno , email , mess , id}) => {
    const [isupdatestatus , setisupdatestatus] = useState(false)
    const updatestatus =async ()=>{
        console.log("gsej")
        try {
            const token = (document.cookie?.split('; ')?.find((ele) => {
                return ele?.split('=')[0] == "csdtpls"
            }))?.split('=')[1]

            const res = await axios.patch(`https://acservice-production.up.railway.app/api/v1/contact/updatestatus/${id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (res.status == 200) {
                setisupdatestatus(true)
                Swal.fire({
                    title: "Upadeted Sucessfully",
                    icon: "success"  
                })
            }

        } catch (e) {
            if (e.status == 401) {
                alert("Unauthorised")
            }
        }
    }
    return (
      <div className='w-[270px] sm:w-[320px] h-fit  shadow-card bg-white rounded-xl z-10 p-5 flex flex-col gap-2'>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><IoPerson />{Name}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><FaPhoneAlt />+91{PHno}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><MdEmail />{email}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'>Message-:</h3>
        <p className='text-justify'>
          {mess}
        </p>
        <button className={`w-[98%] h-10 p-2 font-roboto  mt-3  bg-${isupdatestatus ? '[#4BB543]' : '[#fb823f]'} cursor-pointer font-semibold text-lg text-white rounded-md`} onClick={updatestatus}>
            {
                isupdatestatus ? 
                "Updated"
                :
                "Done"
            }
        </button>
      </div>
    )
}

export default ContactCard