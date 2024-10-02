import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function About() {
    return (
        <div>
            <section className='about_section py-5 px-2 md:px-0 md:pt-9 relative' >
                <div className="container mx-auto">
                    <div className="about_section">
                        <div className="main-title inline-flex flex-col items-center justify-center mb-10 md:mb-78 w-full">
                            <h2 className='text-Newblack text-3xl lg:text-4xl font-extrabold uppercase border-b border-primary pb-5 mb-4'>About us</h2>
                            <p className='text-newgray text-sm lg:text-xl lg:leading-200'>At Signal, we believe in the power of community and creativity</p>
                        </div>
                        <div className="main_section grid grid-cols-1 md:grid-cols-2 md:gap-[108px]">
                            <div className="content text-center md:text-left order-2 sm:order-1">
                                <div className="about_col flex flex-col gap-4 mb-10">
                                    <h2 className='text-2xl md:text-40 text-Newblack font-bold'>Our platform allows users to create groups, share diverse content, and more.</h2>
                                    <p className='text-sm md:text-xl md:leading-200 font-medium non-italic text-newgray'>
                                        With robust monetization capabilities, users can turn their passion into a profession, offering exclusive content and products to their audience.
                                    </p>
                                </div>
                                {/* <div className="group_btn flex flex-wrap gap-5 items-center justify-center md:justify-start">
                                    <a href="/" >Download</a>
                                    <a href="/" >Get started</a>
                                </div> */}

                                <Stack spacing={2} direction="row" className='group_btn flex flex-wrap gap-5 items-center justify-center md:justify-start'>
                                    <Button variant="contained" className='flex-1 sm:flex-none font-semibold text-lg tracking-tight px-50 py-5 capitalize bg-primary border border-solid border-primary text-white rounded-full leading-4 hover:bg-darkblue shadow-none hover:shadow-none'>Download</Button>
                                    <Button variant="outlined" className='flex-1 sm:flex-none font-semibold text-lg tracking-tight px-50 py-5 capitalize border border-gray-300 text-Newblack rounded-full leading-4 hover:bg-none'>Get Started</Button>
                                </Stack>
                            </div>
                            <div className="about_img order-1 sm:order-2">
                                <img src="../assets/img/about.png" alt="" className='w-full'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
