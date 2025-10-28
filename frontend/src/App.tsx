import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Hospitals from './pages/Hospitals';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import DonorRegistration from './pages/DonorRegistration';
import HospitalDashboard from './pages/HospitalDashboard';
import DonorsList from './pages/DonorsList';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/donors" element={<DonorsList />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<DonorRegistration />} />
          <Route path="/dashboard" element={<HospitalDashboard />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
