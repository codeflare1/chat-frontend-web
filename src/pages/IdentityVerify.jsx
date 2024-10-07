import React, { useState } from 'react';
import ChooseDocs from '../components/ChooseDocs';
import Link from '@mui/material/Link';

const IdentityVerify = () => {
    // const [showDocumentUpload, setShowDocumentUpload] = useState(false);

    // const handleButtonClick = () => {
    //     setShowDocumentUpload(true);
    // };

    return (
        <div>
            <div className="login md:h-screen flex justify-center items-center">
                <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
                    <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold capitalize mb-2'>Document Verification</h2>
                    <p className='text-newgray text-sm md:text-lg leading-150 mb-6'>Gatsbychat INC. Requires a valid government issued ID (driver's license, passport, national ID)</p>
                        {/* {showDocumentUpload && ( */}
                        <div className="document_upload mb-10">
                            <ChooseDocs />
                        </div>

                    <div className="continue_btn">
                            <Link
                                href='/password'
                                className='bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline hover:bg-darkblue'>
                                Next
                            </Link>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdentityVerify;
