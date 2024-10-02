import React from 'react'
import Slider from "react-slick";

function TestimonialSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
         responsive: [
      {
        breakpoint: 1024, // Tablet and large mobile devices
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600, // Small mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
          slidesToScroll: 1,
        }
      }
    ]
    };
    return (
        <div>
            <div className="slider_new">
                <Slider {...settings}>
                       <div className="bg-white review_testimonial shadow-cardShadow pt-35 ps-35 pe-27 pb-35  md:pb-87 h-full rounded-2xl">
                         <div className="user_img mb-30">
                            <img src="../assets/img/user1.png" alt="" className='rounded-full' />
                         </div>
                         <div className="user_name mb-5">
                            <h4 className='text-left text-xl leading-8 font-normal text-Newblack mb-1'>Raul Fernandez</h4>
                            <p className='text-left text-grayc text-base leading-7 font-normal'>June 2024</p>
                         </div>
                         <div className="review">
                            <p className='text-left text-lg leading-200 font-normal text-newgray'>I love being able to connect with like-minded individuals and even monetize my passion. Signal is a game-changer!</p>
                         </div>
                       </div>
                       <div className="bg-white review_testimonial shadow-cardShadow pt-35 ps-35 pe-27 pb-35  md:pb-87 h-full rounded-2xl">
                         <div className="user_img mb-30">
                            <img src="../assets/img/user2.png" alt="" className='rounded-full' />
                         </div>
                         <div className="user_name mb-5">
                            <h4 className='text-left text-xl leading-8 font-normal text-Newblack mb-1'>Carlos Rodriguez</h4>
                            <p className='text-left text-grayc text-base leading-7 font-normal'>May 2024</p>
                         </div>
                         <div className="review">
                            <p className='text-left text-lg leading-200 font-normal text-newgray'>The ability to set up a digital storefront within my group has opened up new avenues for my business.</p>
                         </div>
                       </div>
                       <div className="bg-white review_testimonial shadow-cardShadow pt-35 ps-35 pe-27 pb-35  md:pb-87 h-full rounded-2xl">
                         <div className="user_img mb-30">
                            <img src="../assets/img/user3.png" alt=""  className='rounded-full'/>
                         </div>
                         <div className="user_name mb-5">
                            <h4 className='text-left text-xl leading-8 font-normal text-Newblack mb-1'>Martha Alonso</h4>
                            <p className='text-left text-grayc text-base leading-7 font-normal'>February 2024</p>
                         </div>
                         <div className="review">
                            <p className='text-left text-lg leading-200 font-normal text-newgray'>The monetization capabilities, from subscription-based access to pay-per-view content, have allowed me to turn my creativity into a profession.</p>
                         </div>
                       </div>
                   
                </Slider>
            </div>
        </div>
    )
}

export default TestimonialSlider
