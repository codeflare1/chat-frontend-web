import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ChooseDocs from '../components/ChooseDocs';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IdentityVerify = () => {
  const navigate = useNavigate()
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        document_type: Yup.string()
            .required('Document type is required'),
            files: Yup.array()
            .min(2, 'You need to upload both front and back images')
            .max(2, 'You can only upload two images: front and back')
            .required('Please upload both front and back images'),
          
    });

    const initialValues = {
        document_type: '',
        files: [],
    };

    
    const handleSubmit = async (values) => {
      console.log('Form Submitted', values);
    
      const formData = new FormData();
      values.files.forEach((file) => {
        formData.append('uploadDocument', file); // Append each file individually
      });
      const token = localStorage.getItem('token');
      try {
        // Make an API call using axios with Bearer token in headers
        const response = await axios.put(
          `https://api.gatsbychat.com/v1/auth/upload-document?documentType=${values?.document_type}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`, // Bearer token in headers
            },
          }
        );
    
        console.log(response.data);
        if (response?.data?.success) {
          toast.success('Document uploaded successfully');
          navigate("/profile");
        } else {
          toast.error(response?.data?.message || 'Upload failed');
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message;
        toast.error(errorMessage);
        console.error('Error:', errorMessage); // Handle error response
      }
    };
    


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    <div className="login md:h-screen flex justify-center items-center">
                        <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
                            <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold capitalize mb-2'>
                                Document Verification
                            </h2>
                            <p className='text-newgray text-sm md:text-lg leading-150 mb-6'>
                                Gatsbychat INC. Requires a valid government issued ID (driver's license, passport, national ID)
                            </p>

                            <div className="document_upload mb-10">
                                <ChooseDocs
                                    selectedDocument={values.document_type}
                                    setFieldValue={setFieldValue}
                                />
                                <ErrorMessage name="document_type" component="div" className="text-red-500" />
                                {values.document_type && 
                                 <ErrorMessage name="files" component="div" className="text-red-500" />
                                 }
                            </div>

                            <div className="continue_btn">
                                <Button type="submit" className="bg-primary text-white py-4 rounded-full w-full">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default IdentityVerify;
