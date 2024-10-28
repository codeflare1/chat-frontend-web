import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, InputAdornment, TextField, Skeleton, Typography } from '@mui/material';
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
import axios from 'axios';

const ProfileView = () => {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [userdata, setUserData] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [aboutText, setAboutText] = useState('');
  const [aboutIcon, setAboutIcon] = useState(<AddReactionOutlinedIcon />);
  const [isLoading, setIsLoading] = useState(true);

  const imageUrls = [
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/3092ee8ff98396e379123e89da43cdd8.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/30270901a97bc5421eb14500c909a705.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/1c01244bcb69493a034defe7cda2a334.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/eb6c2b31274457d71de342246040349a.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/8f17553d1b39e8885aa8edf83ec0e638.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/e34f39cefc2f5be9c70fb3a33de66e16.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/66ee359f4c0bce2b79071e7766643fb2.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/bf6c82a3f2d252192a8bee93c83d38d0.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/e4e83ad33bbce62ce4aae2442831cebc.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/4f6b0c20a9f39ede37846d84b4c42e21.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/999a2ad64779e2c6e406a1aecc2a8db7.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/f7a896fff92d96134d8557019a0fb027.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/b3b31741522448cf8d9ec6663d4f1ee1.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/a69bf4c52a33121de0ee9b160bae9438.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/3831bdd6d8b8180fd45789c245b654f4.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/6101983865316eb251dc54e252be5ec2.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/9496a27a70b84634dbdf32486ef44544.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/6934fa7c455373745f234d70b573b0c2.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/7415f176bb53bf3fef1b6f20b79beaec.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/01144e15f1884af5fb4c13b4035cb7c6.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/f4d7205c99af6694213e95571eed4fab.png",
    "https://gatsbychat-bucket.s3.eu-north-1.amazonaws.com/image/d5f40b5a38e370043561e2dbb3a57ce4.png"
  ];


  useEffect(() => {
    // Mimic API call delay
    setTimeout(() => {
      getUserData();
    }, 500);
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
      setIsLoading(false);
    }
  };


  console.log("userdatauserdatauserdatauserdata", userdata)
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



  const handleSelectFile = async (event) => {
    const token = localStorage.getItem("token");
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("uploadDocument", selectedFile);
    formData.append("fileType", selectedFile?.type);
    try {
      // const response = await axios.post( `https://api.gatsbychat.com/v1/auth/uploadFiles`,formData,
      const response = await axios.post(`https://api.gatsbychat.com/v1/auth/uploadFiles`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        setSelectedAvatar(response?.data?.imageURI[0]?.imageURI)
      } else {
      }
    } catch (error) {
      console.error(error?.response?.data?.message || error.message);
    }
  };

  const AddImage = async (imgFile) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", imgFile);
      const response = await postData("/updateUserProfile", formData);
      if (response?.code === 400) {
        toast.error(response.code.message);
      } else if (response?.success) {
        toast.success(response?.message);
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
              {isLoading ? (
                <>
                  <Skeleton variant="circular" width={80} height={80} />
                  <Skeleton variant="circular" width={89} height={28} sx={{ borderRadius: '50px', transform: 'unset' }} />
                </>
              ) : (
                <>
                  <Avatar
                    alt={`${userdata?.firstName} ${userdata?.lastName}`}
                    src={userdata?.image || ''}
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: '#dfdfdf',
                      color: '#4A4A4A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {!userdata?.image && (
                      <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                        {`${userdata?.firstName?.charAt(0)}${userdata?.lastName?.charAt(0)}`.toUpperCase()}
                      </Typography>
                    )}
                  </Avatar>

                  <Button
                    variant='contained'
                    className='font-semibold text-xs tracking-tight capitalize bg-[#DDD] text-Newblack rounded-full leading-4 hover:bg-gray-400 shadow-none hover:shadow-none'
                    onClick={handleEditAvatar}

                  >
                    Edit photo
                  </Button>

                </>
              )}
            </div>
          </div>

          <div className="name_field">
            {isLoading ? (
              <Skeleton variant="text" width="100%" height='48px' className='mb-3 transform-none' />
            ) : (
              <Button
                onClick={handleEditName}
                variant="text"
                className='name_field w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack uppercase text-xs'
                startIcon={<Person2OutlinedIcon className=' text-gray-500 w-6 h-6' />}
              >
                {userdata?.firstName}  {userdata?.lastName}
              </Button>
            )}
            <div className="about_btn mb-3">
              {isLoading ? (
                <Skeleton variant="text" width="100%" height='48px' sx={{ transform: 'unset' }} />
              ) : (
                <Button onClick={handleEditAbout} variant="text" className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs' startIcon={<CreateOutlinedIcon className=' text-gray-500 w-6 h-6' />}>

                  {userdata?.about}

                </Button>
              )}
            </div>

            {isLoading ? (
              <Skeleton variant="text" width="100%" height={40} className='stat-content pb-4 border-b mb-3 !transform-none' />
            ) : (
              <div className="stat-content pb-4 border-b mb-3">
                <p className='text-sm text-newgray'>Your profile and changes to it will be visible to people you message, contacts and groups.</p>
              </div>

            )}

            <div className="user_name mb-3">
              {isLoading ? (
                <Skeleton variant="text" width="100%" height='48px' sx={{ transform: 'unset' }} />
              ) : (
                <Button
                  onClick={handleEditUsername}
                  variant="text"
                  className='w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs'
                  startIcon={<AlternateEmailOutlinedIcon className='text-gray-500 w-6 h-6' />}
                >
                  {userdata?.userName}
                </Button>
              )}
            </div>
            {isLoading ? (
              <Skeleton variant="text" width="100%" height={60} sx={{ transform: 'unset' }} />
            ) : (
              <div className="stat-content pb-4">
                <p className='text-sm text-newgray'>People can now message you using your optional username so you don’t have to give out your phone number.</p>
              </div>
            )}
          </div>
        </>
      ) : isEditingName ? (
        // Profile edit content


        <>
          <Formik
            initialValues={{
              firstName: userdata?.firstName || '',
              lastName: userdata?.lastName || '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required('First Name is required'),
              lastName: Yup.string().required('Last Name is required'),
            })}
            onSubmit={async (values) => {
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
            initialValues={{ aboutText: userdata?.about || '' }}
            validationSchema={Yup.object({
              aboutText: Yup.string().required('This field is required'),
            })}
            onSubmit={async (values) => {
              console.log('Form Values:', values);
              try {
                const formData = new FormData();
                formData.append("about", values?.aboutText);
                const response = await postData("/updateUserProfile", formData);

                if (response?.code === 400) {
                  toast.error(response.code.message);
                } else if (response?.success) {
                  toast.success(`${response?.message}`);
                  handleCloseAbout();
                  getUserData();
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
                        onClick={() => setFieldValue('aboutText', '👋 Say Anything')}
                        startIcon={<span>👋</span>}
                      >
                        Say Anything
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => setFieldValue('aboutText', '🔒 Locked Down')}
                        startIcon={<span>🔒</span>}
                      >
                        Locked Down
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => setFieldValue('aboutText', '👍 Available to Talk')}
                        startIcon={<span>👍</span>}
                      >
                        Available to Talk
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => setFieldValue('aboutText', '⏸️ Short Break')}
                        startIcon={<span>⏸️</span>}
                      >
                        Short Break
                      </Button>
                      <Button
                        className="w-full h-12 hover:bg-sidebar justify-start ps-14d text-Newblack capitalize text-xs"
                        variant="text"
                        onClick={() => setFieldValue('aboutText', '☕ Espresso Lover')}
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
            initialValues={{ username: userdata?.userName || '' }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required('Username is required')
                .matches(/^\w+\d+$/, 'Username must end with numbers'),
            })}
            onSubmit={async (values) => {
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


              {selectedAvatar ? (
                <Avatar
                  alt="avatar"
                  src={selectedAvatar}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: '#dfdfdf',
                    color: '#4A4A4A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              ) : (

                <Avatar
                  alt={`${userdata?.firstName} ${userdata?.lastName}`}
                  src={userdata?.image || ''}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: '#dfdfdf',
                    color: '#4A4A4A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {!userdata?.image && (
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                      {`${userdata?.firstName?.charAt(0)}${userdata?.lastName?.charAt(0)}`.toUpperCase()}
                    </Typography>
                  )}
                </Avatar>
              )}

              <Button
                component="label"
                variant="contained"
                className='font-semibold text-xxs tracking-tight capitalize bg-[#DDD] text-Newblack rounded-md leading-4 hover:bg-gray-400 shadow-none hover:shadow-none flex'
                startIcon={<InsertPhotoOutlinedIcon />}
              >
                Photo
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleSelectFile}
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
              {imageUrls.map((url, index) => (
                <Avatar key={index} alt={`image-${index}`} className="cursor-pointer" src={url} onClick={() => setSelectedAvatar(url)} />
              ))}
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
                // onClick={handleCancelAvatarEdit}
                className='font-semibold text-xs tracking-tight capitalize bg-primary text-white'
                onClick={()=>AddImage(selectedAvatar)}
                disabled={selectedAvatar !== "" ? false :true }
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
