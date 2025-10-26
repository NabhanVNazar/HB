import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Hospitals = () => {
  const hospitals = [
    {
      id: 1,
      name: 'City General Hospital',
      address: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      email: 'info@citygeneral.com',
      bloodTypes: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      emergency: true,
    },
    {
      id: 2,
      name: 'Metropolitan Medical Center',
      address: '456 Healthcare Ave, Medical District',
      phone: '+1 (555) 234-5678',
      email: 'contact@metro-med.com',
      bloodTypes: ['A+', 'B+', 'O+', 'O-'],
      emergency: false,
    },
    {
      id: 3,
      name: 'Regional Blood Bank',
      address: '789 Donor Plaza, Westside',
      phone: '+1 (555) 345-6789',
      email: 'donations@regionalblood.org',
      bloodTypes: ['All Types'],
      emergency: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-teal-900 mb-4">
            Partner Hospitals
          </h1>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto">
            Our network of trusted hospitals and blood banks working together to save lives.
            Find a location near you and see current blood type needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-teal-900">
                    {hospital.name}
                  </h3>
                  {hospital.emergency && (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Emergency
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-teal-600 mt-0.5" />
                    <span className="text-gray-700">{hospital.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-teal-600" />
                    <span className="text-gray-700">{hospital.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-teal-600" />
                    <span className="text-gray-700">{hospital.email}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-teal-900 mb-2">
                    Currently Needed:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hospital.bloodTypes.map((type) => (
                      <span
                        key={type}
                        className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Open 24/7 for emergencies</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-4">
            Become a Partner Hospital
          </h2>
          <p className="text-gray-700 mb-6">
            Join our network of life-saving institutions. Partner with us to access our donor database
            and streamline blood donation processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
            <button className="border border-teal-600 text-teal-600 hover:bg-teal-50 px-6 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
