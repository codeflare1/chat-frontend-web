import React, { useState, useRef } from "react";
import { Box, FormControl, Link, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from "../api/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SetupPin = () => {
  const navigate = useNavigate()
  const [isConfirmPin, setIsConfirmPin] = useState(false); // state to track if we're in confirm pin stage
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const confirmInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Validation Schema
  const validationSchema = Yup.object({
    pin: Yup.string()
      .required("PIN is required")
      .matches(/^[0-9]{4}$/, "PIN must be exactly 4 digits"),
    confirmPin: isConfirmPin
      ? Yup.string()
          .required("Confirm PIN is required")
          .oneOf([Yup.ref("pin"), null], "PINs must match")
      : Yup.string().notRequired(),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      pin: "", // Store as string
      confirmPin: "", // Store as string
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      if (!isConfirmPin) {
        setIsConfirmPin(true); // Move to confirm pin step
        formik.setFieldValue("confirmPin", ""); // Reset confirm pin field
      } else {
        console.log("PIN setup confirmed", values.confirmPin);
        const phone =  localStorage.getItem("number")
        const formData = new FormData();
        // Append form values to formData
        formData.append('pin', values.pin);
        formData.append('confirmPin', values.confirmPin);
        formData.append('method', "register"); // Ensure API expects 'method' field
        formData.append('phoneNumber', phone); // Assuming 'phoneNumber' is needed for PIN setup
        try {
          const response = await postData(`/set-pin`, formData); // Assuming 'postData' is your API request function
          // Check for the response code and display error if code is 400
          if (response?.code === 400) {
            toast.error(`${response.code.message}`); // Make sure `response.code.message` exists
          }
        
          // Handle success response
          if (response?.success === true) {
            debugger
            toast.success('PIN set Successfully'); // Assuming `response.data` contains the success message
            console.log(response.data); // For debugging
            localStorage.setItem("token", response?.tokens?.access?.token)
            navigate("/id-verify"); // Redirect to the profile page
          }
        
        } catch (error) {
          // Handle error response from server
          const errorMessage = error?.response?.data?.message || error?.message || 'An unexpected error occurred';
          toast.error(errorMessage);
          
          // For debugging purposes
          console.error('Error:', error?.response ? error.response.data : error?.message);
        }
        
      }
    },
  });

  const handleInputChange = (e, index, isConfirm = false) => {
    const value = e.target.value;
    const fieldName = isConfirm ? "confirmPin" : "pin";
    const currentValue = formik.values[fieldName].split("");

    // Allow only numbers and ensure exactly 1 character
    if (/^[0-9]$/.test(value) || value === "") {
      currentValue[index] = value || ""; // Set the value or empty if deleted
      formik.setFieldValue(fieldName, currentValue.join(""));

      // Move focus to next input if value is filled, otherwise stay
      if (value !== "" && index < 3) {
        const nextInputRef = isConfirm ? confirmInputRefs[index + 1] : inputRefs[index + 1];
        nextInputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e, index, isConfirm = false) => {
    const fieldName = isConfirm ? "confirmPin" : "pin";
    const currentPin = formik.values[fieldName].split("");

    // Move focus to previous input when backspace is pressed and current input is empty
    if (e.key === "Backspace" && currentPin[index] === "" && index > 0) {
      const prevInputRef = isConfirm ? confirmInputRefs[index - 1] : inputRefs[index - 1];
      prevInputRef.current.focus();
    }
  };

  return (
    <div>
      <div className="login h-screen flex justify-center items-center">
        <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
          <h2 className="text-Newblack text-2xl md:text-3xl font-extrabold mb-2">
            {isConfirmPin ? "Confirm your PIN" : "Create new PIN"}
          </h2>
          <p className="text-newgray text-sm md:text-lg leading-150 mb-10">
            {isConfirmPin
              ? "Please confirm the 4-digit PIN you just created."
              : "Your New PIN Must Be Different from Previously Used PIN and must be at least 4 digits."}
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="input_form mb-10">
              <div className="inputIpin mb-5">
                <FormControl className="flex gap-6">
                  <Box className="flex justify-center items-center flex-row gap-6">
                    {[0, 1, 2, 3].map((index) => (
                      <TextField
                        key={index}
                        type="text"
                        value={formik.values[isConfirmPin ? "confirmPin" : "pin"][index] || ""}
                        onChange={(e) => handleInputChange(e, index, isConfirmPin)}
                        onKeyDown={(e) => handleKeyDown(e, index, isConfirmPin)}
                        inputRef={isConfirmPin ? confirmInputRefs[index] : inputRefs[index]}
                        inputProps={{
                          maxLength: 1,
                          style: { textAlign: "center" },
                        }}
                        className="w-12 h-12 rounded-2xl border focus:outline-primary focus:outline-1 text-center"
                        InputProps={{
                          className: "bg-white rounded-md",
                          sx: {
                            "& input": {
                              paddingTop: "6px",
                              paddingBottom: "6px",
                              height: "36px",
                              backgroundColor: "white",
                            },
                          },
                        }}
                      />
                    ))}
                  </Box>
                </FormControl>

                {/* Display single error for the PIN field */}
                {formik.touched.pin && formik.errors.pin && !isConfirmPin && (
                  <Box className="text-red-600 mt-2">{formik.errors.pin}</Box>
                )}
                {formik.touched.confirmPin && formik.errors.confirmPin && isConfirmPin && (
                  <Box className="text-red-600 mt-2">{formik.errors.confirmPin}</Box>
                )}
              </div>
            </div>

            <div className="continue_btn">
              <button
                type="submit"
                className="bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline hover:bg-darkblue"
              >
                {isConfirmPin ? "Setup PIN" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupPin;
