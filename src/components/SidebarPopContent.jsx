import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Brightness6OutlinedIcon from '@mui/icons-material/Brightness6Outlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import GeneralSetting from './GeneralSetting';
import AppearanceSetting from './AppearanceSetting';

const SidebarPopContent = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (
        <div className='w-full'>
            <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', borderRadius: '8px', width:'100%' }}>
                <Tabs
                className='setting_tabs'
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: 'divider', minWidth: '250px', paddingTop: '12px', backgroundColor: '#F4F4F4', borderRadius: '8px 0 0 8px',  }}
                >
                    <Tab
                        className='tabs_button items-center justify-start min-h-6 capitalize font-medium text-Newblack py-3 '
                        icon={<SettingsOutlinedIcon />}
                        iconPosition="start"
                        label="General"
                        {...a11yProps(0)}
                    />
                    <Tab
                        className='tabs_button items-center justify-start min-h-6 capitalize font-medium text-Newblack py-3 '
                        icon={<Brightness6OutlinedIcon />}
                        iconPosition="start"
                        label="Appearance"
                        {...a11yProps(1)}
                    />
                    <Tab
                        className='tabs_button items-center justify-start min-h-6 capitalize font-medium text-Newblack py-3 '
                        icon={<ChatBubbleOutlineOutlinedIcon />}
                        iconPosition="start"
                        label="Chats"
                        {...a11yProps(2)}
                    />
                    <Tab
                        className='tabs_button items-center justify-start min-h-6 capitalize font-medium text-Newblack py-3 '
                        icon={<CallOutlinedIcon />}
                        iconPosition="start"
                        label="Calls"
                        {...a11yProps(3)}
                    />
                    <Tab
                        className='tabs_button items-center justify-start min-h-6 capitalize font-medium text-Newblack py-3 '
                        icon={<NotificationsNoneOutlinedIcon />}
                        iconPosition="start"
                        label="Notification"
                        {...a11yProps(4)}
                    />
                    <Tab
                        className='tabs_button items-center justify-start min-h-6 capitalize font-medium text-Newblack py-3 '
                        icon={<HttpsOutlinedIcon />}
                        iconPosition="start"
                        label="Privacy"
                        {...a11yProps(5)}
                    />
                </Tabs>
                <TabPanel value={value} index={0} className='w-full inner_setting'>
                    <GeneralSetting />
                </TabPanel>
                <TabPanel value={value} index={1} className='w-full inner_setting'>
                    <AppearanceSetting />
                </TabPanel>
                <TabPanel value={value} index={2} className='w-full inner_setting'>
                    Content for Item Three
                </TabPanel>
                <TabPanel value={value} index={3} className='w-full inner_setting'>
                    Content for Item Four
                </TabPanel>
                <TabPanel value={value} index={4} className='w-full inner_setting'>
                    Content for Item Five
                </TabPanel>
                <TabPanel value={value} index={5} className='w-full inner_setting'>
                    Content for Item Six
                </TabPanel>
            </Box>
        </div>
    );
};

export default SidebarPopContent;
