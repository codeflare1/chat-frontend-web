import React from 'react';
import { Checkbox, FormControlLabel, Select, MenuItem, FormGroup, Box, Button, Typography, FormControl, FormHelperText } from '@mui/material';

const NotificationSetting = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box className="setting-item">
            <Box className="tab_title border-b !p-4 flex justify-center items-center" >
                <h2 className='font-semibold text-Newblack'>Notification</h2>
            </Box>

            <Box className="personal_detail">
                <Box
                    className="rounded-lg bg-white"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        // gap: '20px',
                    }}
                >
                    {/* language Section */}
                    <Box className="!p-5 border-b">
                        <Box className="flex flex-col gap-3">
                            <Box className='notification_sound'>
                                <FormGroup >
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked color="primary" />}
                                        label="Enable notifications"
                                        className="text-sm text-gray-700"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked color="primary" />}
                                        label="Show notifications for calls"
                                        className="text-sm text-gray-700"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked color="primary" />}
                                        label="Draw attention to this window when a notification arrives"
                                        className="text-sm text-gray-700"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked color="primary" />}
                                        label="Include muted chats in badge count"
                                        className="text-sm text-gray-700"
                                    />
                                </FormGroup>
                            </Box>
                        </Box>
                    </Box>

                    {/* notification content Section */}
                    <Box className='!p-5 border-b'>
                        <Box className='flex items-center w-full h-12 hover:bg-transparent justify-between ps-14d px-3.5 rounded-none' >
                            <Typography variant="h6" className="text-Newblack capitalize text-base flex items-center gap-3">
                                notification content
                            </Typography>

                            <FormControl sx={{ minWidth: 140 }}  >
                                <Select
                                    value={age}
                                    onChange={handleChange}
                                    displayEmpty
                                    className='h-12 text-left capitalize text-sm'
                                >
                                    <MenuItem value="">Name, content and action</MenuItem>
                                    <MenuItem value={20}>Name Only</MenuItem>
                                    <MenuItem value={30}>No name or content</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    {/* notification content Section */}
                    <Box className='!p-5'>
                     <FormControlLabel className="text-sm text-gray-700"
 control={<Checkbox defaultChecked />} label="Push Notification Sounds" />

                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked color="primary" />}
                                label="In-Chat message sounds"
                                className="text-sm text-gray-700"
                            />
                            <FormHelperText className='m-0 ps-8'>Relay all calls through the Signal server to avoid revealing your IP address to your contact. Enabling will reduce call quality.</FormHelperText>
                        </FormGroup>

                    </Box>

                </Box>
            </Box>
        </Box>
    );
};

export default NotificationSetting;

