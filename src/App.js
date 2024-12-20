// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import OtpVerify from './pages/OtpVerify';
import VerifyForgotOtp from './pages/VerifyForgotOtp';
import Profile from './pages/Profile';
import PinPassword from './pages/PinPassword';
import ForgotPin from './pages/ForgotPin';
import IdentityVerify from './pages/IdentityVerify';
import Dashboard from './layout/dashboard/Dashboard';
import Calls from './pages/Calls';
import Group from './pages/Group';
import Chat from './pages/Chat';
import EnterPin from './pages/EnterPin';
import ResetPassword from './pages/ResetPassword';
import LayoutContextToggleProvider from './context/LayotContextToggleProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import About from './pages/About';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import NotFound from './pages/NotFound';
// Socket.IO Server URL (Replace with your backend URL)
// const SOCKET_SERVER_URL = 'https://api.gatsbychat.com'; 
const SOCKET_SERVER_URL = 'https://api.gatsbychat.com'; 


function App() {
  const location = useLocation();
  const [socket, setSocket] = useState(null);


  // Initialize Socket.IO connection when the component mounts
  useEffect(() => {

    const newSocket = io(SOCKET_SERVER_URL, { autoConnect: false });

    // Connect the socket
    newSocket.connect();
    setSocket(newSocket);

    // Notify user when connected
    newSocket.on('connect', () => {
      // toast.success('Connected to server!');
      console.log(" socket Connected to server!")
    });

    // Listen for 'notification' events from the server
    newSocket.on('notification', (data) => {
      toast.info(`New notification: ${data.message}`);
    });

    // Clean up the socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Define routes where the header and footer should be hidden
  const noHeaderFooterRoutes = [
    '/get-started',
    '/reset-password',
    '/enterPin',
    '/otpverify',
    '/profile',
    '/id-verify',
    '/password',
    '/dashboard',
    '/call',
    '/forgot',
    '/group',
    '/chat',
    "/verify-otp"
  ];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      <Routes>
        {/* Authentication Routes */}
        <Route element={<PublicRoute />}>
        <Route path="/get-started" element={<Login />} />
        <Route path="/enterPin" element={<EnterPin />} />
        <Route path="/otpverify" element={<OtpVerify />}/>
        <Route path="/verify-otp" element={<VerifyForgotOtp />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/id-verify" element={<IdentityVerify />} />
        <Route path="/password" element={<PinPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot" element={<ForgotPin />} />
        <Route path="/" element={<Home />} />
        
        </Route>
        
          {/* Main App Routes */}

        <Route element={<PrivateRoute />}>
        <Route path="/blog" element={<Blog />} />
        <Route path="/call" element={<Calls />} />
        <Route path="/group" element={<Group />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
        <Route path="/about" element={<About/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      
      </Routes>
      {!hideHeaderFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

function AppWrapper() {
  return (
    <LayoutContextToggleProvider>
      <Router>
        <App />
      </Router>
    </LayoutContextToggleProvider>
  );
}

export default AppWrapper;
