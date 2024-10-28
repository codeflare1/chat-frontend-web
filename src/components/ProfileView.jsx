import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, InputAdornment, TextField } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import { styled } from '@mui/material/styles';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import WaveIcon from './svgicon/WaveIcon';
import ShutIcon from './svgicon/ShutIcon';
import ThumbIcon from './svgicon/ThumbIcon';
import OffIcon from './svgicon/OffIcon';
import CoffeeIcon from './svgicon/CoffeeIcon';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { getData, postData } from '../api/apiService';

const ProfileView = () => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [userdata, setUserData] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState('');
  const [aboutIcon, setAboutIcon] = useState(<AddReactionOutlinedIcon />);


  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await getData(`/fetchUser`);
      if (response?.success === true) {
        setUserData(response?.user);
      }
    } catch (error) {
      console.log(error?.response?.message);
      setUserData([]);
    } finally {
    }
  };


  console.log("userdatauserdatauserdatauserdata",userdata)
  const handleButtonClick = (text, icon) => {
    setAboutText(text);
    setAboutIcon(icon);
  };

  const handleClearText = () => {
    setAboutText('');
    setAboutIcon(<AddReactionOutlinedIcon />);
  };


  const handleEditName = () => {
    setIsEditingName(true);
    setIsEditingAvatar(false);
  };

  const handleEditUsername = () => {
    setIsEditingUsername(true);
    setIsEditingAvatar(false);
  };

  const handleEditAbout = () => {
    setIsEditingAbout(true);
    setIsEditingAvatar(false);
  };

  const handleCloseAbout = () => {
    setIsEditingAbout(false);
    setIsEditingAvatar(false);
  };
  const handleClosePopup = () => {
    setIsEditingUsername(false);
    setIsEditingAvatar(false);
  };

  const handleCancelEdit = () => {
    setIsEditingAvatar(false);
    setIsEditingName(false);
    setIsEditingUsername(false);
  };

  const handleEditAvatar = () => {
    setIsEditingAvatar(true);
  };

  const handleCancelAvatarEdit = () => {
    setIsEditingAvatar(false);
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const AddImage =async()=>{
    try {
      const formData = new FormData();
      formData.append("profileImage","https://picsum.photos/200/300" );
      const response = await postData("/updateUserProfile", formData);
      if (response?.code === 400) {
        toast.error(response.code.message);
      } else if (response?.success) {
        toast.success(`${response?.message}`);
        handleCancelEdit()
        getUserData()
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  }

  return (
    <div className='p-5 w-full'>
      {!isEditingAvatar && !isEditingAbout && !isEditingName && !isEditingUsername ? (
        // Profile Content
        <>
          <div className="profile_header mb-3">
            <h2>Profile</h2>
          </div>
          <div className="profile_img">
            <div className="img flex flex-col items-center justify-center w-full gap-4 mb-5 font-medium -tracking-wide">
              <Avatar className="first_last_name p-8 rounded-full bg-gray-200 max-w-20 h-20 w-full flex justify-center items-center text-3xl font-semibold text-Newblack">
                JS
              </Avatar>
              <Button
                variant='contained'
                className='font-semibold text-xs tracking-tight capitalize bg-[#DDD] text-Newblack rounded-full leading-4 hover:bg-gray-400 shadow-none hover:shadow-none'
                // onClick={handleEditAvatar}
                onChange={AddImage}
              >
                Edit photo
              </Button>
            </div>
          </div>

          <div className="name_field">
            <Button
              onClick={handleEditName}
              variant="text"
              className='name_field w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack uppercase text-xs'
              startIcon={<Person2OutlinedIcon className=' text-gray-500 w-6 h-6' />}
            >
              {userdata?.firstName}  {userdata?.lastName}
            </Button>
            <div className="about_btn mb-3">
              <Button onClick={handleEditAbout} variant="text" className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs' startIcon={<CreateOutlinedIcon className=' text-gray-500 w-6 h-6' />}>
                
                {userdata?.about}
            
              </Button>
            </div>
            <div className="stat-content pb-4 border-b mb-3">
              <p className='text-sm text-newgray'>Your profile and changes to it will be visible to people you message, contacts and groups.</p>
            </div>
            <div className="user_name mb-3">
              <Button
                onClick={handleEditUsername}
                variant="text"
                className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs'
                startIcon={<AlternateEmailOutlinedIcon className='text-gray-500 w-6 h-6' />}
              >
                 {userdata?.userName}
              </Button>
            </div>
            <div className="stat-content pb-4">
              <p className='text-sm text-newgray'>People can now message you using your optional username so you don’t have to give out your phone number.</p>
            </div>
          </div>
        </>
      ) : isEditingName ? (
        // Profile edit content


        <>
          <Formik
            initialValues={{
              firstName:  userdata?.firstName || '',
              lastName:  userdata?.lastName || '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required('First Name is required'),
              lastName: Yup.string().required('Last Name is required'),
            })}
            onSubmit={ async(values) => {
              console.log('Form Values:', values);
              try {
                const formData = new FormData();
                formData.append("firstName", values?.firstName);
                formData.append("lastName", values?.lastName);
                const response = await postData("/updateUserProfile", formData);
        
                if (response?.code === 400) {
                  toast.error(response.code.message);
                } else if (response?.success) {
                  toast.success(`${response?.message}`);
                  handleCancelEdit()
                  getUserData()
                }
              } catch (error) {
                const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred";
                toast.error(errorMessage);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box>
                  <div className="profile_header mb-3">
                    <h2>Your Name</h2>
                  </div>

                  <Box className="flex flex-col gap-4 py-5">
                    <Field
                      as={TextField}
                      label="First Name"
                      name="firstName"
                      variant="outlined"
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={<ErrorMessage name="firstName" />}
                    />
                    <Field
                      as={TextField}
                      label="Last Name"
                      name="lastName"
                      variant="outlined"
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={<ErrorMessage name="lastName" />}
                    />
                  </Box>

                  <div className="avatar_actions flex justify-end gap-3 mt-5">
                    <Button
                      variant="outlined"
                      onClick={handleCancelEdit}
                      className="font-semibold text-xs tracking-tight capitalize"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      className="font-semibold text-xs tracking-tight capitalize bg-primary text-white"
                    >
                      Save
                    </Button>
                  </div>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      ) : isEditingAbout ? (
        <>
          <Formik
            initialValues={{ aboutText:  userdata?.about|| '' }}
            validationSchema={Yup.object({
              aboutText: Yup.string().required('This field is required'),
            })}
            onSubmit={ async(values) => {
              console.log('Form Values:', values);

              try {
                const formData = new FormData();
                formData.append("about", values?.aboutText);
                const response = await postData("/updateUserProfile", formData);
        
                if (response?.code === 400) {
                  toast.error(response.code.message);
                } else if (response?.success) {
                  toast.success(`${response?.message}`);
                  handleCancelEdit()
                  getUserData()
                }
              } catch (error) {
                const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred";
                toast.error(errorMessage);
              }
      

            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <Box className="rounded-lg max-w-sm w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium text-gray-900">About</h2>
                  </div>

                  <Box className="py-5">
                    <Box className="mb-3">
                      <Field
                        as={TextField}
                        name="aboutText"
                        className="w-full about_text"
                        placeholder="Write Something about yourself..."
                        variant="outlined"
                        value={values.aboutText}
                        onChange={(e) => setFieldValue('aboutText', e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              {aboutIcon}
                            </InputAdornment>
                          ),
                          endAdornment: (
                            values.aboutText && (
                              <InputAdornment position="end">
                                <CloseOutlinedIcon
                                  className="cursor-pointer"
                                  onClick={() => setFieldValue('aboutText', '')}
                                />
                              </InputAdornment>
                            )
                          ),
                          sx: {
                            padding: '16px 10px',
                            '& input': {
                              padding: '0',
                              fontSize: '14px',
                            },
                            '& ::placeholder': {
                              color: '#212121',
                              fontSize: '14px',
                            },
                          },
                        }}
                        error={Boolean(values.aboutText === '' && 'This field is required')}
                        helperText={<ErrorMessage name="aboutText" />}
                      />
                    </Box>

                    <Box className="prebuild_button">
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => handleButtonClick('Say Anything', <span>👋</span>)}
                        startIcon={<span>👋</span>}
                      >
                        Say Anything
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => handleButtonClick('Locked Down', <span>🔒</span>)}
                        startIcon={<span>🔒</span>}
                      >
                        Locked Down
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => handleButtonClick('Available to Talk', <span>👍</span>)}
                        startIcon={<span>👍</span>}
                      >
                        Available to Talk
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => handleButtonClick('Short Break', <span>⏸️</span>)}
                        startIcon={<span>⏸️</span>}
                      >
                        Short Break
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => handleButtonClick('Espresso Lover', <span>☕</span>)}
                        startIcon={<span>☕</span>}
                      >
                        Espresso Lover
                      </Button>
                    </Box>
                  </Box>

                  <Box className="flex justify-end gap-3">
                    <Button
                      variant="outlined"
                      onClick={handleCloseAbout}
                      className="font-semibold text-xs tracking-tight capitalize"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      className="font-semibold text-xs tracking-tight capitalize bg-primary text-white"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      ) : isEditingUsername ? (
        // Username Popup
        <>
           <Formik
      initialValues={{ username: userdata?.userName || ''}}
      validationSchema={Yup.object({
        username: Yup.string()
          .required('Username is required')
          .matches(/^\w+\d+$/, 'Username must end with numbers'),
      })}
      onSubmit={async(values) => {
        console.log('Form Values:', values);
        try {
          const formData = new FormData();
          formData.append("userName", values?.username);
          const response = await postData("/updateUserProfile", formData);
  
          if (response?.code === 400) {
            toast.error(response.code.message);
          } else if (response?.success) {
            toast.success(`${response?.message}`);
            handleCancelEdit()
            getUserData()
          }
        } catch (error) {
          const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred";
          toast.error(errorMessage);
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Box className="rounded-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900">Username</h2>
            </div>

            <Box className="flex flex-col items-center justify-center">
              <Avatar className="bg-gray-200 mb-4 p-2 w-20 h-20">
                <AlternateEmailOutlinedIcon className="text-gray-500 w-10 h-10" />
              </Avatar>
              <h3 className="text-sm font-semibold text-gray-600 mb-4">
                Choose your username
              </h3>
            </Box>

            <Box className="mb-0">
              <Field
                as={TextField}
                name="username"
                label="Username"
                variant="outlined"
                className="mb-3"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <AlternateEmailOutlinedIcon className="mr-2 text-gray-400" />
                  ),
                }}
                error={Boolean(values.username === '' || values.username.match(/\D$/))}
                helperText={<ErrorMessage name="username" />}
              />
              <p className="text-xs text-gray-500 mt-1">
                Usernames are always paired with a set of numbers.
              </p>
            </Box>

            <Box className="flex justify-end gap-3">
              <Button
                variant="outlined"
                onClick={handleClosePopup}
                className="font-semibold text-xs tracking-tight capitalize"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                type="submit"
                className="font-semibold text-xs tracking-tight capitalize bg-primary text-white"
              >
                Save
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
        </>
      ) : (
        // Avatar Selection Content
        <>
          <Box>
            <div className="profile_header">
              <h2>Your avatar</h2>
            </div>
            <Box className='flex flex-col gap-4 items-center py-5 border-b border-gray-300'>
              <Avatar className="first_last_name p-8 rounded-full bg-gray-200 max-w-20 h-20 w-full flex justify-center items-center text-3xl font-semibold text-Newblack">
                JS
              </Avatar>
              <Button
                component="label"
                variant="contained"
                className='font-semibold text-xxs tracking-tight capitalize bg-[#DDD] text-Newblack rounded-md leading-4 hover:bg-gray-400 shadow-none hover:shadow-none flex'
                startIcon={<InsertPhotoOutlinedIcon />}
              >
                Photo
                <VisuallyHiddenInput
                  type="file"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </Button>
            </Box>
          </Box>
          <Box className='pt-5'>
            <div className="avatar_selection_header mb-3">
              <h2>Select an Avatar</h2>
            </div>
            <div className="avatar_selection grid grid-cols-6 place-items-center gap-4 mb-5 items py-2">
              {/* Avatar options */}
              <Avatar alt="Avatar 1" className="cursor-pointer" src="../assets/img/avatar-1.png" />
              <Avatar alt="Avatar 2" className="cursor-pointer" src="../assets/img/avatar-2.png" />
              <Avatar alt="Avatar 3" className="cursor-pointer" src="../assets/img/avatar-3.png" />
              <Avatar alt="Avatar 4" className="cursor-pointer" src="../assets/img/avatar-4.png" />
              <Avatar alt="Avatar 5" className="cursor-pointer" src="../assets/img/avatar-5.png" />
              <Avatar alt="Avatar 6" className="cursor-pointer" src="../assets/img/avatar-6.png" />
              <Avatar alt="Avatar 7" className="cursor-pointer" src="../assets/img/avatar-7.png" />
              <Avatar alt="Avatar 8" className="cursor-pointer" src="../assets/img/avatar-8.png" />
              <Avatar alt="Avatar 9" className="cursor-pointer" src="../assets/img/avatar-9.png" />
              <Avatar alt="Avatar 10" className="cursor-pointer" src="../assets/img/avatar-10.png" />
              <Avatar alt="Avatar 11" className="cursor-pointer" src="../assets/img/avatar-11.png" />
              <Avatar alt="Avatar 12" className="cursor-pointer" src="../assets/img/avatar-12.png" />
              <Avatar alt="Avatar 13" className="cursor-pointer" src="../assets/img/avatar-13.png" />
              <Avatar alt="Avatar 14" className="cursor-pointer" src="../assets/img/avatar-14.png" />
              <Avatar alt="Avatar 15" className="cursor-pointer" src="../assets/img/avatar-15.png" />
              <Avatar alt="Avatar 16" className="cursor-pointer" src="../assets/img/avatar-16.png" />
              <Avatar alt="Avatar 17" className="cursor-pointer" src="../assets/img/avatar-17.png" />
              <Avatar alt="Avatar 18" className="cursor-pointer" src="../assets/img/avatar-18.png" />
              <Avatar alt="Avatar 19" className="cursor-pointer" src="../assets/img/avatar-19.png" />
              <Avatar alt="Avatar 20" className="cursor-pointer" src="../assets/img/avatar-20.png" />
              <Avatar alt="Avatar 21" className="cursor-pointer" src="../assets/img/avatar-21.png" />
            </div>
            <div className="avatar_actions flex justify-end gap-3">
              <Button
                variant="outlined"
                onClick={handleCancelAvatarEdit}
                className='font-semibold text-xs tracking-tight capitalize'
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleCancelAvatarEdit}
                className='font-semibold text-xs tracking-tight capitalize bg-primary text-white'
              >
                Save
              </Button>
            </div>
          </Box>
        </>
      )}
    </div>
  );
};

export default ProfileView;
