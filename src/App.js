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
import IdentityVerify from './pages/IdentityVerify';
import Dashboard from './layout/dashboard/Dashboard';

function App() {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/otpverify' || location.pathname === '/profile' || location.pathname === '/id-verify' || location.pathname === '/password' | location.pathname === '/dashboard';

  return (
    <div className="App">
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/id-verify" element={<IdentityVerify />} />
        <Route path="/password" element={<PinPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
