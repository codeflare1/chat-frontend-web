import React from 'react'
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Link from '@mui/material/Link'

const OtpVerify = () => {
    const [otp, setOtp] = useState('');
    return (
        <div>
            <div className="login h-screen flex justify-center items-center">
                <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
                    <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold capitalize mb-2'>Verification Code</h2>
                    <p className='text-newgray text-sm md:text-lg leading-150 mb-6'>Enter the code we sent to +91 79863 42376</p>
                    <div className="input_form mb-10">
                        <OtpInput
                        containerStyle={'gap-6 justify-center'}
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            inputStyle={'p-4 border max-w-58 text-Newblack text-lg rounded-md !w-full focus:outline-primary'}
                            // renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>

                    <div className="continue_btn">
                        <Link href='/profile' className='no-underline bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center'>Continue</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpVerify
