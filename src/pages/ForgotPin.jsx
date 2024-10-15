import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from '@mui/material/Link';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postData } from '../api/apiService';

const ForgotPin = () => {
const navigate = useNavigate()
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .test('is-valid-phone', 'Phone number is not valid', (value) => isValidPhoneNumber(value || '')), // Using the phone number validation
  });

  // Initial form values
  const initialValues = {
    phoneNumber: '',
  };

  const handleSubmit =async (values) => {
    console.log('Form values:', values);

    const formData = new FormData();
    // Append form values to formData
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('method', "forgot-pin");

    try {
      const response = await postData("/forgot-pin", formData)
      console.log(response.data); // Handle success response
      const phone = { phone: values.phoneNumber }
      if (response?.code === 400) {
        toast.error(`${response.code.message}`)
      }

      if (response?.success === true) {
        toast.success(`${response?.response}`)
        console.log(response); // Handle success response
        navigate("/verify-otp", { state: phone });
      }
    } catch (error) {
      toast.error(`${error?.response.data.message}`)
      console.error('Error:', error.response ? error.response.data : error.message); // Handle error response
    }
  };

  return (
    <div className="login h-screen flex justify-center items-center">
      <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
        <h2 className="text-Newblack text-2xl md:text-3xl font-extrabold mb-2">Forgot your PIN</h2>
        <p className="text-newgray text-sm md:text-lg leading-150 mb-6">
          Please enter the phone number you'd like your password reset information sent to
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form>
              <div className="input_form mb-10">
                <div className="inputIpin">
                  <Field name="phoneNumber">
                    {({ field }) => (
                      <PhoneInput
                        {...field}
                        className={`border p-2.5 rounded-2xl h-12 ${errors.phoneNumber && touched.phoneNumber ? 'border-red-500' : ''}`}
                        placeholder="Enter phone number"
                        defaultCountry="IN"
                        international
                        countryCallingCodeEditable={false}
                        value={field.value}
                        onChange={(value) => setFieldValue('phoneNumber', value)}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
              <div className="continue_btn">
                <button
                  type="submit"
                  className="bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline hover:bg-darkblue"
                >
                  Next
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPin;
