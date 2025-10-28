import { useEffect, useState } from 'react';
import { Heart, Mail, Phone, MapPin, Droplet, User, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

interface Donor {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  medicalConditions?: string;
  donationHistory?: string;
  location?: string;
  status: string;
  createdAt: string;
}

const DonorsList = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/donors`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch donors');
      }
      
      const data = await response.json();
      setDonors(data);
    } catch (error) {
      console.error('Error fetching donors:', error);
      toast.error('Failed to load donors. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDonors = donors.filter(donor => {
    const matchesBloodGroup = filter === 'all' || donor.bloodGroup === filter;
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.state.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBloodGroup && matchesSearch;
  });

  const bloodGroups = ['all', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const getBloodGroupColor = (bloodGroup: string) => {
    const colors: Record<string, string> = {
      'A+': 'bg-red-100 text-red-700',
      'A-': 'bg-red-200 text-red-800',
      'B+': 'bg-blue-100 text-blue-700',
      'B-': 'bg-blue-200 text-blue-800',
      'AB+': 'bg-purple-100 text-purple-700',
      'AB-': 'bg-purple-200 text-purple-800',
      'O+': 'bg-green-100 text-green-700',
      'O-': 'bg-green-200 text-green-800',
    };
    return colors[bloodGroup] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto mb-4"></div>
          <p className="text-teal-700 text-lg font-semibold">Loading donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-teal-600" />
          </div>
          <h1 className="text-4xl font-bold text-teal-800 mb-2">Our Blood Donors</h1>
          <p className="text-gray-600">Connect with {donors.length} registered donors ready to save lives</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-2">Search Donors</label>
              <input
                type="text"
                placeholder="Search by name, city, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-2">Filter by Blood Group</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                {bloodGroups.map(group => (
                  <option key={group} value={group}>
                    {group === 'all' ? 'All Blood Groups' : group}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-teal-700">{filteredDonors.length}</span> of {donors.length} donors
            </p>
            <button
              onClick={fetchDonors}
              className="text-teal-600 hover:text-teal-700 font-medium text-sm"
            >
              Refresh List
            </button>
          </div>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-12 text-center">
            <Droplet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No donors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-teal-100 hover:border-teal-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-teal-100 p-3 rounded-full">
                      <User className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-teal-800">{donor.name}</h3>
                      <p className="text-sm text-gray-600">{donor.age} years, {donor.gender}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getBloodGroupColor(donor.bloodGroup)}`}>
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                    <span className="text-sm truncate">{donor.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{donor.phone}</span>
                  </div>
                  
                  <div className="flex items-start text-gray-700">
                    <MapPin className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{donor.city}, {donor.state}</span>
                  </div>

                  {donor.donationHistory && (
                    <div className="flex items-center text-gray-700">
                      <Droplet className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{donor.donationHistory}</span>
                    </div>
                  )}

                  {donor.medicalConditions && donor.medicalConditions !== 'None' && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800">
                        <strong>Medical:</strong> {donor.medicalConditions}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-teal-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Joined {new Date(donor.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full ${
                      donor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {donor.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorsList;
