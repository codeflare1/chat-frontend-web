import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ChooseDocs from '../components/ChooseDocs';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { postData, putData } from '../api/apiService';

const IdentityVerify = () => {
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

    const handleSubmit = async(values) => {
        console.log('Form Submitted', values);
        // Submit form values to the API
        const formData = new FormData();
        // Append form values to formData
        formData.append('files', values.files);

        try {
          const response = await putData(`/upload-document?documentType=${values?.document_type}`, formData)
          console.log(response.data); 
          if (response?.code === 400) {
            toast.error(`${response.code.message}`)
          }

          if (response?.success === true) {
            debugger
            toast.success(`${response?.response}`)
          }
        } catch (error) {
          toast.error(`${error?.response.data.message}`)
          console.error('Error:', error.response ? error.response.data : error.message); // Handle error response
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
