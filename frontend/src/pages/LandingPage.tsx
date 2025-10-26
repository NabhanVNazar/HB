import { Link } from 'react-router-dom';
import { Heart, Users, Shield, MapPin } from 'lucide-react';

const LandingPage = () => {
  const hospitals = [
    { name: 'City General Hospital', location: 'Downtown', image: '/api/placeholder/300/200' },
    { name: 'Metro Medical Center', location: 'Midtown', image: '/api/placeholder/300/200' },
    { name: 'Regional Health Clinic', location: 'Uptown', image: '/api/placeholder/300/200' },
    { name: 'Community Care Hospital', location: 'Suburbs', image: '/api/placeholder/300/200' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connecting Life with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Smart Blood Donation Platform — Register as a donor today and help hospitals find you faster with AI.
            </p>
            <div>
              <Link
                to="/register"
                className="bg-lemon-400 hover:bg-lemon-500 text-teal-900 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-block"
              >
                Become a Donor Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes blood donation simple and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-teal-50 rounded-lg">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Register</h3>
              <p className="text-gray-600">Add your info and medical details to join our donor network</p>
            </div>

            <div className="text-center p-6 bg-teal-50 rounded-lg">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Get Verified</h3>
              <p className="text-gray-600">Hospitals review and approve your donor profile</p>
            </div>

            <div className="text-center p-6 bg-teal-50 rounded-lg">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Donate</h3>
              <p className="text-gray-600">Be notified when your blood is needed nearby</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Hospitals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-800 mb-4">Partner Hospitals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trusted healthcare partners working with us to save lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-32 bg-gradient-to-r from-teal-400 to-teal-600 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-teal-800 mb-1">{hospital.name}</h3>
                  <p className="text-gray-600 text-sm">{hospital.location}</p>
                  <button className="mt-3 text-teal-600 hover:text-teal-800 text-sm font-medium">
                    View Dashboard →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6" />
                <span className="font-bold text-lg">BloodLink</span>
              </div>
              <p className="text-teal-200">
                Connecting donors with hospitals through AI-powered matching.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-teal-200">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/hospitals" className="hover:text-white">Hospitals</Link></li>
                <li><Link to="/register" className="hover:text-white">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-teal-200">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-teal-200 mb-2">Follow us for updates</p>
              <div className="flex space-x-4">
                <a href="#" className="text-teal-200 hover:text-white">Facebook</a>
                <a href="#" className="text-teal-200 hover:text-white">Twitter</a>
                <a href="#" className="text-teal-200 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-teal-700 mt-8 pt-8 text-center text-teal-200">
            <p>&copy; 2024 BloodLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
