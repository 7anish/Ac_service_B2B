import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../assets/iwlogo.png'

const Adminlogin = () => {
  const [isprocessing, setisprocessing] = useState(false)
  const navigate = useNavigate()
  const checkmail = (email) => {
    return /^[a-z0-9\._%+\-]+@[a-z0-9\.\-]+\.[a-z]{1,}[^\._%+\-,!@#$%^&*()0-9{}<>?:"<;'|/\\=_]$/.test(
      email
    );
  };

  const checkothers = (value) => {
    return /^(?!\s*$).+/.test(value);
  };

  const submitform = async (e) => {
    e.preventDefault()
    setisprocessing(true)

    const details = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    if (
      checkmail(e.target.email.value) &&
      checkothers(e.target.password.value)
    ) {
    }
    else {
      Swal.fire("Enter All the fields Properly");
      setisprocessing(false)
      return
    }

    try {
      const res = await axios.post("http://localhost:8000/api/v1/admin/loginasadmin", details)

      if (res.status == 200) {
        const date = new Date();
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // days converted to milliseconds
        const expires = "expires=" + date.toUTCString();
        document.cookie = `csdtpls=${res.data.token};${expires}`
        Swal.fire({
          title: "Sucessfully LogedIn",
          icon: "success"
        }).then(navigate('/admindashboard'))
        setisprocessing(false)
        return
      }
      if (res.status == 400) {
        console.log(res.data)
        setisprocessing(false)
        return
      }
      if (res.status == 403) {
        console.log("User unothorised")
        setisprocessing(false)
        return
      }
      else {
        alert("some error")
        setisprocessing(false)
        return
      }
    } catch (e) {
      console.log(e)
      setisprocessing(false)
      alert("User or password is incorrect")
    }
  }

  return (
    <div className='w-full h-[90vh] flex justify-center items-center p-3 relative'>
      <svg class="absolute -z-10 -top-10 opacity-20 " width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)' /><path d='M3.25 10h13.5M10 3.25v13.5' stroke-linecap='square' stroke-width='0.5' stroke='hsla(258.5,59.4%,59.4%,1)' fill='none' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
      <form className='w-[340px] sm:w-[400px] h-fit   rounded-2xl flex flex-col justify-evenly gap-10 items-center p-5 border-4 shadow-card  bg-slate-400' onSubmit={(e) => submitform(e)}>
            <img src={logo} alt="" className='w-32' />
        <input name='email' type="text" placeholder='Email-ID' className=' w-full h-[40px] font-roboto p-2 font-medium rounded-lg' />
        <input name="password" type="password" placeholder='Password' className=' w-full h-[40px] font-roboto p-2 font-medium rounded-lg' />
        <div className='w-full h-10 flex justify-center items-center bg-blue-500 rounded-xl'>
          {
            isprocessing ?
              <div class="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
              :
              <input className='w-full h-10 bg-[#fb823f] font-roboto font-bold text-white rounded-2xl hover:scale-105 duration-300  cursor-pointer' type="submit" value={"Login"} />
          }
        </div>
      </form>
    </div>
  )
}

export default Adminlogin