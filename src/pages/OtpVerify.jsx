import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Ensure you're importing useLocation
import OtpInput from 'react-otp-input';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Link from '@mui/material/Link';
import { getData } from '../api/apiService';

// Validation schema using Yup
const validationSchema = Yup.object({
  otp: Yup.string()
    .required('OTP is required')
    .length(4, 'OTP must be exactly 4 digits'), // Ensure OTP is 4 digits
});

const OtpVerify = () => {
    const navigate = useNavigate()
  const location = useLocation();

  // Access the state passed through the navigate function
  const { phone } = location.state || {};

  return (
    <div>
      <div className="login h-screen flex justify-center items-center">
        <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
          <h2 className="text-Newblack text-2xl md:text-3xl font-extrabold capitalize mb-2">Verification Code</h2>
          <p className="text-newgray text-sm md:text-lg leading-150 mb-6">Enter the code we sent to {phone}</p>

          <Formik
            initialValues={{ otp: '' }}
            validationSchema={validationSchema}
            onSubmit={async(values) => {
              console.log('OTP submitted:', values);
              // Handle form submission (e.g., navigate to profile page)
          
              try {
                debugger
                const response = await getData(`/verify-otp?method=register&phoneNumber=${phone}&otp=${values?.otp}`)
                debugger
                console.log(response.data); // Handle success response
            
                navigate("/profile");
                
              } catch (error) {
                console.error('Error:', error.response ? error.response.data : error?.message); // Handle error response
              }

            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <div className="input_form mb-10">
                  <OtpInput
                    containerStyle={'gap-6 justify-center'}
                    value={values.otp}
                    onChange={(value) => setFieldValue('otp', value)}
                    numInputs={4}
                    inputStyle={'p-4 border max-w-12 h-12 text-Newblack text-lg rounded-md !w-full focus:outline-primary'}
                    renderInput={(props) => <input {...props} />}
                  />
                  {errors.otp && touched.otp && (
                    <div className="text-red-500 mt-2">{errors.otp}</div>
                  )}
                </div>

                <div className="continue_btn">
                  <button
                    type="submit"
                    className="no-underline bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center hover:bg-darkblue"
                  >
                    Continue
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

export default OtpVerify;
