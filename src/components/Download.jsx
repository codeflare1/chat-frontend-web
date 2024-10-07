import React from 'react'
import Link from '@mui/material/Link'

function Download() {
    return (
        <div>
            <section className='download_section py-5 px-2 md:pt-14 md:pb-0 relative' >
                <div className="container mx-auto">
                    <div className="download_section">
                        <div className="main_section grid grid-cols-1 md:grid-cols-2 gap-[108px] items-center">
                            <div className="content text-center md:text-left">
                                <div className="download_col flex flex-col gap-4 mb-10">
                                    <h2 className='text-2xl md:text-40 text-Newblack font-bold'>Download our app and get most out of it</h2>
                                    <p className='text-sm md:text-xl md:leading-200 font-medium non-italic text-newgray'>
                                        Get Gatsbychat: Your Gateway to a Vibrant Digital Ecosystem
                                    </p>
                                </div>
                                <div className="group_btn flex gap-5 items-center justify-center md:justify-start">
                                <Link href="/">
                                    <img src="../assets/img/appstore-black.png" alt="" />
                                </Link>
                                <Link href="/">
                                    <img src="../assets/img/googleplay-black.png" alt="" />
                                </Link>
                                </div>
                            </div>
                            <div className="download_img ">
                                <img src="../assets/img/download.png" alt="" className='w-[480px]'/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Download
