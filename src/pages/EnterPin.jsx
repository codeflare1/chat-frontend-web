import React, { useRef } from "react";
import { Box, FormControl, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../api/apiService";

const EnterPin = () => {
  const navigate = useNavigate();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  // Validation Schema
  const validationSchema = Yup.object({
    pin: Yup.string()
      .required("PIN is required")
      .matches(/^[0-9]{4}$/, "PIN must be exactly 4 digits"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      pin: "", // Store PIN as a string
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const phone = localStorage.getItem("number");
        const formData = new FormData();
        formData.append("pin", values.pin);
        const response = await postData("/loginWithPin", formData);

        if (response?.code === 400) {
          toast.error(response.code.message);
        } else if (response?.success) {
          toast.success(`${response?.message}`);
          localStorage.setItem("statusCode",response?.statusCode)
          navigate("/chat")
        }
      } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred";
        toast.error(errorMessage);
        console.error("Error:", error?.response?.data || error.message);
      }
    },
  });

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const currentValue = formik.values.pin.split("");

    if (/^[0-9]$/.test(value) || value === "") {
      currentValue[index] = value || "";
      formik.setFieldValue("pin", currentValue.join(""));

      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    const currentPin = formik.values.pin.split("");

    if (e.key === "Backspace" && currentPin[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="login h-screen flex justify-center items-center">
      <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
        <h2 className="text-Newblack text-2xl md:text-3xl font-extrabold mb-2">
          Enter PIN
        </h2>
        <p className="text-newgray text-sm md:text-lg leading-150 mb-10">
          Your PIN must be exactly 4 digits.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="input_form mb-10">
            <FormControl className="flex gap-6">
              <Box className="flex justify-center items-center flex-row gap-6">
                {[0, 1, 2, 3].map((index) => (
                  <TextField
                    key={index}
                    type="text"
                    value={formik.values.pin[index] || ""}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputRef={inputRefs[index]}
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

            {formik.touched.pin && formik.errors.pin && (
              <Box className="text-red-600 mt-2">{formik.errors.pin}</Box>
            )}
          </div>

          <div className="continue_btn">
            <button
              type="submit"
              className="bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline hover:bg-darkblue"
            >
             Submit
            </button>
          </div>
        </form>            
          <Box className="flex justify-end mt-5">
                  <Link to="/forgot">Forgot PIN?</Link>
                </Box>
      </div>
    </div>
  );
};

export default EnterPin;
