import React, { useState, useRef } from "react";
import { Box, FormControl, Link, TextField } from "@mui/material";

const SetupPin = () => {
  const [isConfirmPin, setIsConfirmPin] = useState(false); // state to track if we're in confirm pin stage
  const [pin, setPin] = useState(["", "", "", ""]); // state to track 4-digit pin
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]); // state for confirm pin

  // Create refs for each input for both PIN setup and confirm pin stages
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const confirmInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleNextClick = () => {
    if (!isConfirmPin) {
      // Clear the confirmPin array and move to confirm pin step
      setIsConfirmPin(true);
      setPin(["", "", "", ""]); // Reset the PIN fields
    } else {
      // Handle pin confirmation logic here
      console.log("PIN setup confirmed", confirmPin);
    }
  };

  const handleInputChange = (e, index, isConfirm = false) => {
    const value = e.target.value;

    // Allow only numbers and only 1 character
    if (/^[0-9]$/.test(value)) {
      if (isConfirm) {
        const newConfirmPin = [...confirmPin];
        newConfirmPin[index] = value;
        setConfirmPin(newConfirmPin);

        // Move focus to next input if exists
        if (index < 3 && value !== "") {
          confirmInputRefs[index + 1].current.focus();
        }
      } else {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Move focus to next input if exists
        if (index < 3 && value !== "") {
          inputRefs[index + 1].current.focus();
        }
      }
    }
  };

  const handleKeyDown = (e, index, isConfirm = false) => {
    // Move focus to previous input when backspace is pressed and current input is empty
    if (e.key === "Backspace") {
      if (isConfirm && confirmPin[index] === "" && index > 0) {
        confirmInputRefs[index - 1].current.focus();
      } else if (!isConfirm && pin[index] === "" && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  return (
    <div>
      <div className="login h-screen flex justify-center items-center">
        <div className="user_login max-w-xl w-full mx-auto text-left p-4 md:p-8 shadow-cardShad rounded-2xl">
          <h2 className='text-Newblack text-2xl md:text-3xl font-extrabold mb-2'>
            {isConfirmPin ? "Confirm your PIN" : "Create new PIN"}
          </h2>
          <p className='text-newgray text-sm md:text-lg leading-150 mb-10'>
            {isConfirmPin
              ? "Please confirm the 4-digit PIN you just created."
              : "Your New PIN Must Be Different from Previously Used PIN and must be at least 4 digits."}
          </p>
          <div className="input_form mb-10">
            <div className="inputIpin mb-5">
              <FormControl className="flex gap-6">
                {/* <InputLabel className="static">
                  {isConfirmPin ? "Confirm PIN" : "Create New PIN"}
                </InputLabel> */}
                <Box className="flex justify-center items-center flex-row gap-6">
                  {(isConfirmPin ? confirmPin : pin).map((digit, index) => (
                    <TextField
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleInputChange(e, index, isConfirmPin)}
                      onKeyDown={(e) => handleKeyDown(e, index, isConfirmPin)}
                      inputRef={isConfirmPin ? confirmInputRefs[index] : inputRefs[index]} 
                      inputProps={{
                        maxLength: 1, 
                        style: { textAlign: 'center' }
                      }}
                      className='w-12 h-12 rounded-2xl border focus:outline-primary focus:outline-1 text-center'
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
                  ))}

                  
                </Box>
              </FormControl>
              <Box className='flex justify-end mt-2'>
                <Link href='/forgot'>Forgot PIN?</Link>
              </Box>
            </div>
          </div>

          <div className="continue_btn">
            <button
              onClick={handleNextClick}
              className='bg-primary text-white py-4 rounded-full w-full leading-4 text-base font-medium border border-primary transition-all inline-flex justify-center items-center no-underline hover:bg-darkblue'
            >
              {isConfirmPin ? "Setup PIN" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPin;
