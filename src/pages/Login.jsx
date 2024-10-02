import React from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useState } from 'react';
import Link from '@mui/material/Link'

const Login = () => {
    const [value, setValue] = useState()
    return (
        <div>
            <div className="login h-screen flex justify-center items-center">
                <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
                    {/* <div className='flex justify-center items-center mb-6'>
                        <a href="">
                            <img src="../logo.png" alt="" className='max-w-40 w-full' />
                        </a>
                    </div> */}
                    <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold capitalize mb-2'>Phone Number</h2>
                    <p className='text-newgray text-sm md:text-lg leading-150 mb-6'>Enter your Phone number to get started.</p>
                    <div className="input_form mb-10">
                        <PhoneInput
                            className='border p-2.5 rounded-2xl'
                            placeholder="Enter phone number"
                            value={value}
                            onChange={setValue} />
                    </div>

                        <div className="continue_btn">
                            <Link href='/otpverify' className='bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline'>Continue</Link>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Login
