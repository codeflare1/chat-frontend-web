import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/apiService';
import { toast } from 'react-toastify';

const Profile = () => {
  const [imagePreview, setImagePreview] = useState('../assets/img/user.png'); // Default image

  const navigate = useNavigate()

  // Handle image change
  const handleImageChange = (e, setFieldValue) => {
    debugger
    const file = e.target.files[0];
    if (file) {
      setFieldValue("userProfileImage", file); // Set file in Formik
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview to the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    userProfileImage: null
  };

  return (
    <div>
      <div className="login h-screen flex justify-center items-center">
        <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
          <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold capitalize mb-2'>Setup your profile</h2>
          <p className='text-newgray text-sm md:text-lg leading-150 mb-6'>
            Profiles are visible to people you message, contact, and groups. <a href="/" className='text-primary underline'>Learn more</a>
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async(values) => {
              console.log(values);
              // Add submit logic

              const formData = new FormData();
              
              // Append form values to formData
              formData.append('firstName', values.firstName);
              formData.append('lastName', values.lastName);
              if (values.userProfileImage) {
                formData.append('userProfileImage', values.userProfileImage);
              }

              console.log(values?.userProfileImage,"fsdfsdfsdfsdf")
              try {

               
                const response = await postData("/register",formData)
                // Handle success response
                if (response?.success === true) {
                  debugger
                  toast.success(`${response.message}`); 
                  console.log(response);
                  
                }
              

                console.log(response.data); // Handle success response
                navigate("/chat");
              } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message); // Handle error response
              }

            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
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
                      onChange={(e) => handleImageChange(e, setFieldValue)} // Handle image upload
                    />
                  </div>

                  {/* Show the dynamic name as user types */}
                  <div className="name mb-4 flex justify-center items-center">
                    <span className='capitalize h-6'>
                      {values.firstName || values.lastName ? `${values.firstName} ${values.lastName}` : ''}
                    </span>
                  </div>

                  <div className="input_fields flex flex-col gap-5">
                    <div className="fname">
                      <Field
                        name="firstName"
                        as={TextField}
                        label="First name"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          className: 'bg-white rounded-md',
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
                      <ErrorMessage name="firstName" component="div" className="error text-red-600" />
                    </div>

                    <div className="lname">
                      <Field
                        name="lastName"
                        as={TextField}
                        label="Last name"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          className: 'bg-white rounded-md',
                          sx: {
                            '& input': {
                              paddingTop: '6px',
                              paddingBottom: '6px',
                              height: '36px',
                              backgroundColor: 'white',
                            },
                            '&:hover': {
                              borderColor: '#0d6efd',
                            },
                          },
                        }}
                      />
                      <ErrorMessage name="lastName" component="div" className="error text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="continue_btn">
                  <button type="submit" className='no-underline bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center hover:bg-darkblue'>
                    Next
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
