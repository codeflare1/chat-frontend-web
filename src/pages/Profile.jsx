import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link'


const Profile = () => {
    // State for first name, last name, and uploaded image
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [imagePreview, setImagePreview] = useState('../assets/img/user.png'); // Default image

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set preview to the uploaded image
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="login h-screen flex justify-center items-center">
                <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
                    <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold capitalize mb-2'>Setup your profile</h2>
                    <p className='text-newgray text-sm md:text-lg leading-150 mb-6'>
                        Profiles are visible to people you message, contact, and groups. <a href="/" className='text-primary underline'>Learn more</a>
                    </p>

                    <div className="input_form mb-10">
                        <div className="upload_img relative flex justify-center items-center mb-2">
                            <div className='relative'>
                                {/* Image preview */}
                                <img src={imagePreview} alt="Profile" className='w-20 h-20 rounded-full object-cover' />
                                <span className='bg-primary w-6 p-1 h-6 rounded-full inline-block absolute bottom-0 right-0'>
                                    <img src="../assets/img/photo.svg" alt="" />
                                </span>
                            </div>
                            <input
                                type="file"
                                className='w-20 h-20 absolute opacity-0 cursor-pointer'
                                onChange={handleImageChange} // Handle image upload
                            />
                        </div>

                        {/* Show the dynamic name as user types */}
                        <div className="name mb-4 flex justify-center items-center">
                            <span className='capitalize h-6'>
                                {firstName || lastName ? `${firstName} ${lastName}` : ''}
                            </span>
                        </div>

                        <div className="input_fields flex flex-col gap-5">
                            <div className="fname">
                                <TextField
                                     id="outlined-basic" label="First name" variant="outlined"
                                    className='p-0'
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    value={firstName}
                                    fullWidth
                                    InputProps={{
                                      className: 'bg-white rounded-md',
                                      sx: {
                                        '& input': {
                                          padding: '', 
                                          backgroundColor: 'white',
                                        },
                                      },
                                    }}
                                  
                                />
                            </div>
                            <div className="lname">
                                <TextField
                                     id="outlined-basic" label="Last name" variant="outlined"
                                    className='p-0  '
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    fullWidth
                                    InputProps={{
                                      className: 'bg-white rounded-md',
                                      sx: {
                                        '& input': {
                                          padding: '', 
                                          backgroundColor: 'white',
                                        },
                                      },
                                    }}
                                    
                                />
                            </div>
                        </div>
                    </div>

                    <div className="continue_btn">
                        <Link href='/id-verify' className='no-underline bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center'>
                            Next
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
