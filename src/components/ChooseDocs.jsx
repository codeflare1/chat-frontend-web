import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const ChooseDocs = ({ selectedDocument, setFieldValue }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        setFieldValue('files', [...uploadedFiles, ...files]); // Update Formik files field
    };

    const removeFile = (index) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        setFieldValue('files', newFiles); // Update Formik files field
    };

    return (
        <div>
            <div className="choose_document mb-5">
                <FormControl component="fieldset" className='w-full'>
                    <FormLabel component="legend" className="text-base font-semibold text-Newblack mb-3">
                        Select your ID Type
                    </FormLabel>
                    <RadioGroup
                        row
                        className='justify-between'
                        aria-label="document_type"
                        name="document_type"
                        value={selectedDocument}
                        onChange={(e) => setFieldValue('document_type', e.target.value)}
                    >
                        <FormControlLabel
                            value="idcard"
                            control={<Radio />}
                            label="ID Card"
                        />
                        <FormControlLabel
                            value="passport"
                            control={<Radio />}
                            label="Passport"
                        />
                        <FormControlLabel
                            value="driving"
                            control={<Radio />}
                            label="Driving License"
                        />
                    </RadioGroup>
                </FormControl>
            </div>

            {selectedDocument && uploadedFiles.length === 0 && (
                <div className="upload_file relative mb-5">
                    <div className="files border border-dashed p-4 flex flex-col items-center gap-2 rounded-2xl border-primary relative">
                        <p className='text-grayc text-sm tracking-wide'>Drag & Drop your file here</p>
                        <p className='font-medium text-grayc uppercase text-sm'>Or</p>
                        <Button
                            variant="contained"
                            component="label"
                            className="font-semibold text-sm tracking-tight py-2 px-4 capitalize bg-primary border border-primary text-white rounded-lg leading-4"
                        >
                            Browse file
                            <input
                                type="file"
                                hidden
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>
                    </div>
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <div className="file_previews grid grid-cols-3 gap-4 mb-4">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="file_preview relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="h-32 w-full object-cover rounded-lg border"
                            />
                            <Button
                                onClick={() => removeFile(index)}
                                style={{ position: 'absolute', top: '-6px', right: '-10px' }}
                                size="small"
                                color="error"
                                className='min-w-4 h-4'
                                variant="contained"
                            >
                                &times;
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <div className="main_stat">
                <ul className='ps-4 flex flex-col gap-1.5'>
                    <li className='list-disc text-sm text-grayc leading-200'>
                        Please take photos of both the <strong className='font-semibold'>front</strong> and <strong className='font-semibold'>back</strong> of your ID.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ChooseDocs;
