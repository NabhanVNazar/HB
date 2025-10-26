import { FC, useState } from 'react';

interface DonorData {
  id: number;
  name: string;
  bloodType: string;
  location: string;
  status: 'active' | 'pending' | 'inactive';
  lastDonation?: string;
  contact: string;
}

const HospitalDashboard: FC = () => {
  const [activeTab, setActiveTab] = useState<'donors' | 'requests' | 'stats'>('donors');
  const [searchQuery, setSearchQuery] = useState('');

  const donors: DonorData[] = [
    {
      id: 1,
      name: "John Doe",
      bloodType: "O+",
      location: "City Hospital",
      status: "active",
      contact: "+1234567890",
      lastDonation: "2024-02-01"
    },
    {
      id: 2,
      name: "Jane Smith",
      bloodType: "A+",
      location: "General Hospital",
      status: "pending",
      contact: "+0987654321",
      lastDonation: "2024-01-15"
    },
    {
      id: 3,
      name: "Sam Wilson",
      bloodType: "B+",
      location: "Central Hospital",
      status: "inactive",
      contact: "+1122334455",
      lastDonation: "2023-12-10"
    },
    {
      id: 4,
      name: "Emily Johnson",
      bloodType: "AB+",
      location: "Eastside Hospital",
      status: "active",
      contact: "+2233445566",
      lastDonation: "2024-02-05"
    },
    {
      id: 5,
      name: "Michael Brown",
      bloodType: "O-",
      location: "Westend Hospital",
      status: "pending",
      contact: "+3344556677",
      lastDonation: "2024-01-20"
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hospital Dashboard</h1>
        <p className="text-gray-600">Manage blood donations and requests</p>
      </div>

      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('donors')}
          className={`px-4 py-2 rounded ${
            activeTab === 'donors' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          Donors
        </button>
        <button 
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded ${
            activeTab === 'requests' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          Requests
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded ${
            activeTab === 'stats' ? 'bg-primary text-white' : 'bg-gray-100'
          }`}
        >
          Statistics
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'donors' && (
          <div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search donors..."
                className="w-full p-2 border rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">Name</th>
                  <th className="p-2">Blood Type</th>
                  <th className="p-2">Location</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.filter(donor => donor.name.toLowerCase().includes(searchQuery.toLowerCase())).map(donor => (
                  <tr key={donor.id} className="border-b">
                    <td className="p-2">{donor.name}</td>
                    <td className="p-2">{donor.bloodType}</td>
                    <td className="p-2">{donor.location}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        donor.status === 'active' ? 'bg-green-100 text-green-800' :
                        donor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {donor.status}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="text-primary hover:underline">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="text-center py-8 text-gray-600">
            Blood requests will appear here
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="text-center py-8 text-gray-600">
            Statistics and charts will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
