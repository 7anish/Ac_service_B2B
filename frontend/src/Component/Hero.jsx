import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'
import img1 from '../assets/image8.jpg'
import img4 from '../assets/image6.jpg'
import img3 from '../assets/image7.jpg'
import { FaArrowLeft , FaArrowRight } from 'react-icons/fa';
import { HashLink } from 'react-router-hash-link';

const Hero = () => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showIndicators={true}
      showThumbs={false}
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      stopOnHover={false}
      swipeable={true}
      className='w-full h-[50vh] sm:h-[80vh] object-cover'
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && <Arrows onClick={onClickHandler} direction="left"  />
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && <Arrows onClick={onClickHandler} direction="right" />
            }
      >
      <div className='w-full h-full relative'>
        <img className='w-full h-[50vh] sm:h-[80vh] brightness-50 md:brightness-90' src={img1} />
        <div className='sm:w-[80%] md:w-[48%] h-full flex flex-col items-start justify-center pl-3 px-3 sm:px-0 sm:pl-10 absolute top-0 gap-3 sm:gap-8'>
          <h1 className='text-3xl md:text-6xl font-semibold font-popines text-start text-white sm:text-[#190d06]'>Book AC Installation Service <span className='text-[#fb823f]'>In Delhi NCR</span> By Professional</h1>
          <p className='text-sm sm:text-sm md:text-lg text-start font-roboto'>Welcome to Installation World - one-call for delhi NCR best home appliances service at your doorstep we providing ac service, ac repair.</p>
          <HashLink to={'/#services'}><button className='p-2 md:p-3 px-4 md:px-10 hover:bg-[#004E89] duration-300 bg-[#ff8f33] text-white  rounded-xl text-sm md:text-lg font-bold self-baseline font-roboto'>Service</button></HashLink>
        </div>
      </div>
      <div className='w-full h-full relative'>
        <img className='w-full h-[50vh] sm:h-[80vh] brightness-50 md:brightness-90' src={img3} />
        <div className='sm:w-[80%] md:w-[48%] h-full flex flex-col items-start justify-center pl-3 px-3 sm:px-0 sm:pl-10 absolute top-0 gap-3 sm:gap-8'>
          <h1 className='text-3xl md:text-6xl font-semibold font-popines text-start text-white sm:text-[#190d06]'>Book AC Installation Service <span className='text-[#fb823f]'>In Delhi NCR</span> By Professional</h1>
          <p className='text-sm sm:text-sm md:text-lg text-start font-roboto'>Welcome to Installation World - one-call for delhi NCR best home appliances service at your doorstep we providing ac service, ac repair.</p>
          <HashLink to={'/#services'}><button className='p-2 md:p-3 px-4 md:px-10 hover:bg-[#004E89] duration-300 bg-[#ff8f33] text-white  rounded-xl text-sm md:text-lg font-bold self-baseline font-roboto'>Service</button></HashLink>
        </div>
      </div>
      <div className='w-full h-full relative'>
        <img className='w-full h-[50vh] sm:h-[80vh] brightness-50 md:brightness-90' src={img4} />
        <div className='sm:w-[80%] md:w-[48%] h-full flex flex-col items-start justify-center pl-3 px-3 sm:px-0 sm:pl-10 absolute top-0 gap-3 sm:gap-8'>
          <h1 className='text-3xl md:text-6xl font-semibold font-popines text-start text-white sm:text-[#190d06]'>Book AC Installation Service <span className='text-[#fb823f]'>In Delhi NCR</span> By Professional</h1>
          <p className='text-sm sm:text-sm md:text-lg text-start font-roboto'>Welcome to Installation World - one-call for delhi NCR best home appliances service at your doorstep we providing ac service, ac repair.</p>
          <HashLink to={'/#services'}><button className='p-2 md:p-3 px-4 md:px-10 hover:bg-[#004E89] duration-300 bg-[#ff8f33] text-white  rounded-xl text-sm md:text-lg font-bold self-baseline font-roboto'>Service</button></HashLink>
        </div>
      </div>
    </Carousel>
  )
}

const Arrows = ({ onClick, direction }) => {
  return (
      <div
          className='hidden md:flex'
          onClick={onClick}
          style={{
              position: 'absolute',
              top: 'calc(50% + 10px)', // Position 10px lower
              transform: 'translateY(-50%)',
              zIndex: 2,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, .2)',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              transition: 'background-color 0.3s ease',
              left: direction === 'left' ? '10px' : undefined,
              right: direction === 'right' ? '50px' : undefined // Shift right arrow 30px to the left
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, .6)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, .2)'}
      >
          <span
              style={{
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  lineHeight: '1'
              }}
          >
              {direction === 'left' ? <FaArrowLeft fontSize={'16px'} /> : <FaArrowRight fontSize={'16px'} />}
          </span>
      </div>
  )
}
export default Hero
