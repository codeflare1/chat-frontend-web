import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import OtpVerify from './pages/OtpVerify';
import Profile from './pages/Profile';
import PinPassword from './pages/PinPassword';
import ForgotPin from './pages/ForgotPin';
import IdentityVerify from './pages/IdentityVerify';
import Dashboard from './layout/dashboard/Dashboard';
import Calls from './pages/Calls';
import Group from './pages/Group';
import Chat from './pages/Chat';
import SetupPin from './pages/SetupPin';
import LayoutContextToggleProvider from './context/LayotContextToggleProvider'



function App() {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/otpverify' || location.pathname === '/profile' || location.pathname === '/id-verify' || location.pathname === '/password' | location.pathname === '/dashboard' || location.pathname === '/call' || location.pathname === '/forgot' || location.pathname === '/set-pin' || location.pathname === '/group' || location.pathname === '/chat';

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/id-verify" element={<IdentityVerify />} />
        <Route path="/password" element={<PinPassword />} />
        <Route path="/forgot" element={<ForgotPin />} />
        <Route path="/set-pin" element={<SetupPin />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/call" element={<Calls />} />
        <Route path="/group" element={<Group/>} />
        <Route path="/chat" element={<Chat/>} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
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
