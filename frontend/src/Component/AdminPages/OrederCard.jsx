import axios from "axios";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaBuilding } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import Swal from 'sweetalert2';
import { MdHomeRepairService } from "react-icons/md";
import { BsFillFlagFill } from "react-icons/bs";
import { FaHammer } from "react-icons/fa6";




const OrderCard = ({name ,  phonenumber , gmail , pincode , city , servicetype , address , houseNo , landmark ,service, id}) => {
    const updatestatus =async ()=>{
        try {
            const token = (document.cookie?.split('; ')?.find((ele) => {
                return ele?.split('=')[0] == "csdtpls"
            }))?.split('=')[1]

            const res = await axios.patch(`https://acservice-production.up.railway.app/api/v1/order/updateorder/${id}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            if (res.status == 200) {
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
      <div className='w-[270px] sm:w-[320px] h-[350px]  shadow-card bg-white rounded-xl z-10 p-5 flex flex-col gap-2 justify-evenly'>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><IoPerson />{name}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><FaPhoneAlt />{`+91 ${phonenumber}`}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><MdEmail />{gmail}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><FaHammer />{`Service For-"${service}"`}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><MdHomeRepairService />{`Service Type-"${servicetype}"`}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><FaBuilding/>{`${address},${city} , ${pincode}`}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'><BsFillFlagFill />{`${houseNo} , ${landmark}`}</h3>
        <h3 className='flex justify-start items-center text-sm font-semibold gap-1'></h3>
        <button className={`w-[98%] h-10 p-2 font-roboto  mt-3  bg-[#4BB543] cursor-pointer font-semibold text-lg text-white rounded-md`} onClick={updatestatus}>Done</button>
      </div>
    )
}
export default OrderCard