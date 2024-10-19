import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Formik, Form, } from 'formik';
import * as Yup from 'yup';
import { postData } from '../api/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

// Validation schema using Yup
const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\+[1-9]{1}[0-9]{3,14}$/, 'Phone number is not valid'), // Adjust the regex to match your requirements
});

const ForgotPin = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="login h-screen flex justify-center items-center">
        <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
          <h2 className="text-Newblack text-2xl md:text-3xl font-extrabold mb-2">Forgot your PIN</h2>
          <p className="text-newgray text-sm md:text-lg leading-150 mb-6">
            Please enter the phone number you'd like your password reset information sent to
          </p>

          <Formik
            initialValues={{ phoneNumber: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log('Form data:', values);
              const formData = new FormData();
              formData.append('phoneNumber', values.phoneNumber);
              formData.append('method', "forgot-pin");
              try {
                const response = await postData("/forgot-pin", formData)
                console.log(response.data); // Handle success response
                if (response?.code === 400) {
                  toast.error(`${response.message}`)
                }
                if (response?.success === true) {
                  localStorage.setItem("number", values.phoneNumber)
                    localStorage.setItem("otp_id", response?.response?.data?.otp_id)
                    toast.success(`${response?.response?.message}`)
                    navigate('/verify-otp');
                }
              } catch (error) {
                toast.error(`${error?.response.message}`)
                console.error('Error:', error.response ? error.response : error.message); // Handle error response
              }
            }}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form>
                <div className="input_form mb-10">
                  <PhoneInput
                    className="border p-2.5 rounded-2xl h-12"
                    placeholder="Enter phone number"
                    value={values.phoneNumber}
                    onChange={(value) => setFieldValue('phoneNumber', value)}
                    defaultCountry="IN"
                    international
                    countryCallingCodeEditable={false}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-red-500 mt-2">{errors.phoneNumber}</div>
                  )}
                </div>

                <div className="continue_btn">
                  <button
                    type="submit"
                    className="bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline hover:bg-darkblue"
                  >
                    Continue
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/*               
          <Box className="flex justify-end mt-2">
                  <Link href="/forgot">Forgot PIN?</Link>
                </Box> */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPin;
