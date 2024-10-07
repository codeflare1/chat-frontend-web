import React from 'react'
import TestimonialSlider from './TestimonialSlider'


function Testimonial() {
    return (
        <div>
            <section className='testimonial_section py-5 px-2 md:px-0 md:py-70  bg-grayLight' >
                <div className="container mx-auto">
                    <div className="testimonial_section">
                        <div className="main-title inline-flex flex-col items-center justify-center mb-10 md:mb-78 w-full">
                            <h2 className='text-Newblack text-3xl lg:text-4xl font-extrabold uppercase border-b border-primary pb-5 mb-4'>Testimonial</h2>
                            <p className='text-newgray text-sm lg:text-xl lg:leading-200'>Voices of Gatsbychat: Hear From Our Satisfied Users</p>
                        </div>
                        <div className="slider_testimonial">
                            <TestimonialSlider />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial
