import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function HeroSection() {
    return (
        <div>
            <section className='hero_section bg-primary pt-14 px-2 md:px-0 md:pt-28 pb-[14rem] relative after:bg-cover after:bg-no-repeat after:absolute after:w-full after:h-[11rem] after:left-0 after:-bottom-1 after:right-0' >
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="content md:text-left">
                            <h1 className='text-4xl md:text-64 font-bold text-white'>
                                Signal, an Connection and Commerce App
                            </h1>
                            <p className='text-sm md:text-xl text-white leading-loose mb-30'>
                                Welcome to muhiris, a revolutionary platform for social networking, instant messaging, e-commerce, and real-time communication. We empower users to connect, share, and thrive in a vibrant digital ecosystem.
                            </p>
                            <Stack spacing={2} direction="row" className='btn flex gap-4 md:gap-2 items-center mb-30 justify-center md:justify-start'>
                                <Button variant="contained" className='px-50 py-5 bg-white rounded-full text-Newblack font-semibold text-lg leading-4 border border-white'>Download</Button>
                                <Button variant="text" className='px-50 py-5 text-white underline underline-offset-2 font-semibold text-lg rounded-full' >Learn more</Button>
                            </Stack>
                            <div className="App__download flex justify-center md:justify-start items-center gap-2.5">
                                <a href="/">
                                    <img src="../assets/img/appstore.png" alt="" />
                                </a>
                                <a href="/">
                                    <img src="../assets/img/googleplay.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="img-main max-w-493 w-full">
                            <img src="../assets/img/main.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HeroSection
