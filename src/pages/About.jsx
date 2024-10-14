import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Testimonial from '../components/Testimonial'

const About = () => {
    return (
        <div>
            <section className='about_section py-5 px-2 md:px-0 md:py-70  bg-grayLight'>
                <Box className='container mx-auto grid md:grid-cols-2 items-center'>
                    <Box className='flex flex-col gap-6'>
                        <Typography variant='h2' className='text-2xl md:text-40 text-Newblack font-bold'>About Us</Typography>
                        <Typography variant='body2' className='text-sm md:text-xl md:leading-150 font-medium non-italic text-newgray'>
                            Welcome to GatsbyChat, the next-generation social media platform designed with you in mind. Our mission is to provide a seamless, engaging, and secure space where users can connect, share, and interact in a friendly and safe environment.
                        </Typography>
                    </Box>
                    <Box className='flex justify-center'>
                        <img src="../assets/img/about.webp" alt="" className='max-w-27 w-full' />
                    </Box>
                </Box>
            </section>

            <section className='testimonial_section py-5 px-2 md:px-0 md:py-70'>
                <Box className='container mx-auto grid md:grid-cols-2 items-center'>
                    <Box className='flex justify-start'>
                        <img src="../assets/img/main.png" alt="" className='max-w-27 w-full' />
                    </Box>
                    <Box className='flex flex-col gap-6'>
                        <Typography variant='h2' className='text-2xl md:text-40 text-Newblack font-bold'>Our Mission: Empowering Millions to Connect and Grow Better</Typography>
                        <Typography variant='body2' className='text-sm md:text-xl md:leading-150 font-medium non-italic text-newgray'>
                            At GatsbyChat, we believe that online interactions should be as enjoyable as they are secure.
                            That's why we focus on making our platform incredibly easy to use, with an intuitive interface
                            that allows users of all ages and technical abilities to navigate effortlessly. Whether you're
                            chatting with friends, joining communities, or sharing content, your experience will always be
                            smooth and accessible.

                        </Typography>
                    </Box>
                </Box>
            </section>

            <Testimonial className='' />

            <section className='testimonial_section py-5 px-2 md:px-0 md:py-70 md:pb-20'>
                <Box className='container mx-auto grid md:grid-cols-2 items-center'>

                    <Box className='flex flex-col gap-6'>
                        <Typography variant='h2' className='text-2xl md:text-40 text-Newblack font-bold'>Your Security and Safety is Our Top Priority</Typography>
                        <Typography variant='body2' className='text-sm md:text-xl md:leading-150 font-medium non-italic text-newgray'>
                            Security is our top priority. We understand that privacy is a major concern for social media
                            users, which is why we implement the latest encryption technologies and robust privacy
                            measures to protect your data. You can enjoy all the features of GatsbyChat knowing that
                            your information is safe and your interactions are private.

                        </Typography>
                    </Box>

                    <Box className='flex justify-center'>
                        <img src="../assets/img/about.webp" alt="" className='max-w-27 w-full' />
                    </Box>
                </Box>
            </section>

            <section>
                <Box className='container mx-auto items-center max-w-4xl text-center bg-slate-200 py-20 px-8 rounded-2xl mb-10'>
                    <Box className='flex flex-col justify-center items-center gap-4'>
                        <Typography variant='h2' className='text-2xl md:text-4xl text-Newblack font-bold'>Real, Meaningful, and Secure Connections.</Typography>
                        <Typography variant='body2' className='max-w-2xl text-sm md:text-lg md:leading-150 font-medium non-italic text-newgray'>
                            Our goal is to create a platform where connections are real, conversations are meaningful,
                            and every user feels valued. Join us at GatsbyChat, where staying connected has never been
                            more secure or user-friendly.
                        </Typography>
                        <Box className='mt-2'>
                            <Button variant="contained" href='/get-started' className='px-50 py-5 bg-primary rounded-full text-white font-semibold text-lg leading-4 border border-primary'>Get Started</Button>
                        </Box>
                    </Box>
                </Box>
            </section>

        </div>
    )
}

export default About
