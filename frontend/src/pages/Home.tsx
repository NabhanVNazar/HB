import { Link } from 'react-router-dom';
import { Heart, Users, Shield, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Heart className="mx-auto h-16 w-16 text-teal-600 mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold text-teal-900 mb-6">
            Save Lives with Every Drop
          </h1>
          <p className="text-xl text-teal-700 mb-8 max-w-3xl mx-auto">
            Connect blood donors with hospitals in need. Join our community and make a difference today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Become a Donor
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-50 text-teal-600 px-8 py-3 rounded-lg font-semibold text-lg border border-teal-600 transition-colors"
            >
              Hospital Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-12">
            Why Choose BloodLink?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="mx-auto h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-teal-900 mb-2">
                Connect Donors & Hospitals
              </h3>
              <p className="text-teal-700">
                Seamlessly connect willing donors with hospitals in urgent need of blood.
              </p>
            </div>
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-teal-900 mb-2">
                Safe & Secure
              </h3>
              <p className="text-teal-700">
                All donations are screened and processed through certified medical facilities.
              </p>
            </div>
            <div className="text-center">
              <Award className="mx-auto h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold text-teal-900 mb-2">
                Life-Saving Impact
              </h3>
              <p className="text-teal-700">
                Every donation can save up to three lives. Your contribution matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-teal-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-teal-700 mb-8">
            Join thousands of donors who are saving lives every day.
          </p>
          <Link
            to="/register"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
