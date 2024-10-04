import React, { useState } from "react";
import Link from '@mui/material/Link';
import { TextField } from "@mui/material";

const ForgotPin = () => {

    return (
        <div>
            <div className="login h-screen flex justify-center items-center">
                <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
                    <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold mb-2'>Forgot your PIN</h2>
                    <p className='text-newgray text-sm md:text-lg leading-150 mb-6'>Please enter the phone number you'd like your password reset information sent to</p>
                    <div className="input_form mb-10">
                        <div className="inputIpin">
                            <TextField
                                type="email"
                                className='w-full rounded-2xl border focus:outline-primary focus:outline-1'
                                placeholder="Enter phone number"
                                fullWidth
                                InputProps={{
                                    className: 'bg-white  rounded-md',
                                    sx: {
                                        '& input': {
                                            paddingTop: '6px',
                                            paddingBottom: '6px',
                                            height: '36px',
                                            backgroundColor: 'white',
                                        },
                                    },
                                }}

                            />
                            {/* <p className='text-center text-xs text-grayc leading-150 mt-1.5'>PIN must be at least 4 digits</p> */}
                        </div>
                    </div>

                    <div className="continue_btn">
                        <Link href='/set-pin' className='bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline hover:bg-darkblue'>Next</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPin
