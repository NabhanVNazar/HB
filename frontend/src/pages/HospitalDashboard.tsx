import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import {
  Home,
  Users,
  UserCheck,
  Search,
  Settings,
  Heart,
  Phone,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MessageSquare,
  Filter,
  Star
} from 'lucide-react';

interface DonorData {
  id: number;
  name: string;
  bloodType: string;
  location: string;
  status: 'active' | 'pending' | 'inactive';
  lastDonation?: string;
  contact: string;
  medicalConditions?: string;
  donationHistory?: string;
  age?: number;
  gender?: string;
  city?: string;
  state?: string;
  email?: string;
}

const HospitalDashboard: FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'donors' | 'manage' | 'find' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterBloodGroup, setFilterBloodGroup] = useState<string>('all');
  const [expandedDonor, setExpandedDonor] = useState<number | null>(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<DonorData | null>(null);
  const [aiSearchQuery, setAiSearchQuery] = useState('');
  const [aiResults, setAiResults] = useState<DonorData[]>([]);

  const donors: DonorData[] = [
    {
      id: 1,
      name: "John Doe",
      bloodType: "O+",
      location: "City Hospital",
      status: "active",
      contact: "+1234567890",
      lastDonation: "2024-02-01",
      medicalConditions: "None",
      donationHistory: "Regular donor",
      age: 28,
      gender: "Male",
      city: "Mumbai",
      state: "Maharashtra",
      email: "john.doe@email.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      bloodType: "A+",
      location: "General Hospital",
      status: "pending",
      contact: "+0987654321",
      lastDonation: "2024-01-15",
      medicalConditions: "Mild anemia",
      donationHistory: "First time",
      age: 32,
      gender: "Female",
      city: "Delhi",
      state: "Delhi",
      email: "jane.smith@email.com"
    },
    {
      id: 3,
      name: "Sam Wilson",
      bloodType: "B+",
      location: "Central Hospital",
      status: "inactive",
      contact: "+1122334455",
      lastDonation: "2023-12-10",
      medicalConditions: "None",
      donationHistory: "Regular donor",
      age: 25,
      gender: "Male",
      city: "Bangalore",
      state: "Karnataka",
      email: "sam.wilson@email.com"
    },
    {
      id: 4,
      name: "Emily Johnson",
      bloodType: "AB+",
      location: "Eastside Hospital",
      status: "active",
      contact: "+2233445566",
      lastDonation: "2024-02-05",
      medicalConditions: "None",
      donationHistory: "Regular donor",
      age: 29,
      gender: "Female",
      city: "Chennai",
      state: "Tamil Nadu",
      email: "emily.johnson@email.com"
    },
    {
      id: 5,
      name: "Michael Brown",
      bloodType: "O-",
      location: "Westend Hospital",
      status: "pending",
      contact: "+3344556677",
      lastDonation: "2024-01-20",
      medicalConditions: "None",
      donationHistory: "First time",
      age: 35,
      gender: "Male",
      city: "Kolkata",
      state: "West Bengal",
      email: "michael.brown@email.com"
    },
  ];

  const stats = {
    totalDonors: donors.length,
    pendingDonors: donors.filter(d => d.status === 'pending').length,
    approvedDonors: donors.filter(d => d.status === 'active').length,
    urgentRequests: 3
  };

  const monthlyData = [
    { month: 'Jan', donations: 45 },
    { month: 'Feb', donations: 52 },
    { month: 'Mar', donations: 38 },
    { month: 'Apr', donations: 61 },
    { month: 'May', donations: 49 },
    { month: 'Jun', donations: 55 }
  ];

  const bloodGroupData = [
    { name: 'O+', value: 35, color: '#FF6B6B' },
    { name: 'A+', value: 28, color: '#4ECDC4' },
    { name: 'B+', value: 22, color: '#45B7D1' },
    { name: 'AB+', value: 8, color: '#FFA07A' },
    { name: 'O-', value: 4, color: '#98D8C8' },
    { name: 'A-', value: 3, color: '#F7DC6F' }
  ];

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donor.city?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || donor.status === filterStatus;
    const matchesBloodGroup = filterBloodGroup === 'all' || donor.bloodType === filterBloodGroup;
    return matchesSearch && matchesStatus && matchesBloodGroup;
  });

  const handleApproveDonor = (id: number) => {
    // In a real app, this would update the backend
    console.log('Approving donor:', id);
  };

  const handleRejectDonor = (id: number) => {
    // In a real app, this would update the backend
    console.log('Rejecting donor:', id);
  };

  const handleEditDonor = (donor: DonorData) => {
    setSelectedDonor(donor);
    setShowManageModal(true);
  };

  const handleDeleteDonor = (id: number) => {
    // In a real app, this would delete from backend
    console.log('Deleting donor:', id);
  };

  const handleAISearch = () => {
    // Mock AI search - in real app, this would call an AI service
    const results = donors.filter(d => d.bloodType === aiSearchQuery && d.status === 'active')
      .map(donor => ({
        ...donor,
        aiScore: Math.floor(Math.random() * 40) + 60, // Mock score 60-100
        eta: `${Math.floor(Math.random() * 60) + 15} min`,
        reliability: Math.floor(Math.random() * 5) + 1
      }))
      .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));

    setAiResults(results);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'donors', label: 'Donors List', icon: Users },
    { id: 'manage', label: 'Manage Donors', icon: UserCheck },
    { id: 'find', label: 'Find Donor (AI)', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/90 backdrop-blur-md shadow-xl border-r border-teal-200">
        <div className="p-6 border-b border-teal-200">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h2 className="font-bold text-teal-800">BloodBond</h2>
              <p className="text-sm text-teal-600">Hospital Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                        : 'text-teal-700 hover:bg-teal-50 hover:text-teal-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-teal-200 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-800">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal-400" />
                <input
                  type="text"
                  placeholder="Search donors..."
                  className="pl-10 pr-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={() => setShowManageModal(true)}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-teal-900 px-4 py-2 rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200"
              >
                Manage Donors
              </button>

              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-teal-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-600 text-sm font-medium">Total Donors</p>
                      <p className="text-3xl font-bold text-teal-800">{stats.totalDonors}</p>
                    </div>
                    <Heart className="h-8 w-8 text-teal-500" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Pending Donors</p>
                      <p className="text-3xl font-bold text-yellow-800">{stats.pendingDonors}</p>
                    </div>
                    <Users className="h-8 w-8 text-yellow-500" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Approved Donors</p>
                      <p className="text-3xl font-bold text-green-800">{stats.approvedDonors}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-600 text-sm font-medium">Urgent Requests</p>
                      <p className="text-3xl font-bold text-red-800">{stats.urgentRequests}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </motion.div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200"
                >
                  <h3 className="text-lg font-semibold text-teal-800 mb-4">Monthly Donations</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="donations" fill="#0D9488" />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200"
                >
                  <h3 className="text-lg font-semibold text-teal-800 mb-4">Blood Group Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={bloodGroupData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {bloodGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'donors' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>

                <select
                  value={filterBloodGroup}
                  onChange={(e) => setFilterBloodGroup(e.target.value)}
                  className="px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="all">All Blood Groups</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Donors Table */}
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-teal-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-teal-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800">Name</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800">Blood Group</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800">Location</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-teal-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDonors.map((donor) => (
                        <>
                          <tr key={donor.id} className="border-t border-teal-100 hover:bg-teal-25">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <button
                                  onClick={() => setExpandedDonor(expandedDonor === donor.id ? null : donor.id)}
                                  className="text-teal-600 hover:text-teal-800"
                                >
                                  {expandedDonor === donor.id ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                </button>
                                <span className="font-medium text-teal-800">{donor.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-teal-700">{donor.bloodType}</td>
                            <td className="px-6 py-4 text-teal-700">{donor.city}, {donor.state}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                donor.status === 'active' ? 'bg-green-100 text-green-800' :
                                donor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {donor.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEditDonor(donor)}
                                  className="text-teal-600 hover:text-teal-800"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                {donor.status === 'pending' && (
                                  <>
                                    <button
                                      onClick={() => handleApproveDonor(donor.id)}
                                      className="text-green-600 hover:text-green-800"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => handleRejectDonor(donor.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <XCircle className="h-4 w-4" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                          {expandedDonor === donor.id && (
                            <tr>
                              <td colSpan={5} className="px-6 py-4 bg-teal-25">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p><strong>Age:</strong> {donor.age}</p>
                                    <p><strong>Gender:</strong> {donor.gender}</p>
                                    <p><strong>Email:</strong> {donor.email}</p>
                                    <p><strong>Phone:</strong> {donor.contact}</p>
                                  </div>
                                  <div>
                                    <p><strong>Last Donation:</strong> {donor.lastDonation}</p>
                                    <p><strong>Medical Conditions:</strong> {donor.medicalConditions}</p>
                                    <p><strong>Donation History:</strong> {donor.donationHistory}</p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'manage' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <UserCheck className="h-16 w-16 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-teal-800 mb-2">Manage Donors</h3>
              <p className="text-teal-600">Use the "Manage Donors" button in the top bar to edit donor information.</p>
            </motion.div>
          )}

          {activeTab === 'find' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200">
                <h3 className="text-lg font-semibold text-teal-800 mb-4">AI-Powered Donor Matching</h3>
                <div className="flex gap-4 mb-6">
                  <select
                    value={aiSearchQuery}
                    onChange={(e) => setAiSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <button
                    onClick={handleAISearch}
                    className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
                  >
                    Find Best Matches
                  </button>
                </div>

                {aiResults.length > 0 && (
                  <div className="space-y-4">
                    {aiResults.map((donor) => (
                      <motion.div
                        key={donor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-teal-50 to-yellow-50 rounded-lg p-4 border border-teal-200"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-teal-800">{donor.name}</h4>
                              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm font-medium">
                                {donor.bloodType}
                              </span>
                              <div className="flex items-center space-x-1">
                                {[...Array(donor.reliability)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-teal-700">
                              <div>
                                <MapPin className="h-4 w-4 inline mr-1" />
                                {donor.city}, {donor.state}
                              </div>
                              <div>
                                <Calendar className="h-4 w-4 inline mr-1" />
                                ETA: {donor.eta}
                              </div>
                              <div>
                                <Phone className="h-4 w-4 inline mr-1" />
                                {donor.contact}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span>AI Score:</span>
                                <div className="flex-1 bg-teal-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-teal-500 to-yellow-500 h-2 rounded-full"
                                    style={{ width: `${donor.aiScore}%` }}
                                  ></div>
                                </div>
                                <span className="font-semibold">{donor.aiScore}%</span>
                              </div>
                            </div>
                          </div>
                          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2">
                            <MessageSquare className="h-4 w-4" />
                            <span>Send SMS</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-teal-200">
                <h3 className="text-lg font-semibold text-teal-800 mb-6">Hospital Settings</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-2">Hospital Name</label>
                    <input
                      type="text"
                      defaultValue="City General Hospital"
                      className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="admin@citygeneral.com"
                      className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-teal-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      defaultValue="+1-555-0123"
                      className="w-full px-4 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-teal-800">Dark Mode</h4>
                      <p className="text-sm text-teal-600">Toggle between light and dark themes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-teal-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-200">
                      Save Changes
                    </button>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all duration-200">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Manage Donor Modal */}
      {showManageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">
                {selectedDonor ? 'Edit Donor' : 'Add New Donor'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-teal-700 mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={selectedDonor?.name}
                    className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-teal-700 mb-1">Blood Group</label>
                  <select
                    defaultValue={selectedDonor?.bloodType}
                    className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-teal-700 mb-1">Contact</label>
                  <input
                    type="tel"
                    defaultValue={selectedDonor?.contact}
                    className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-teal-700 mb-1">Status</label>
                  <select
                    defaultValue={selectedDonor?.status}
                    className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-teal-700 mb-1">Notes</label>
                  <textarea
                    defaultValue={selectedDonor?.medicalConditions}
                    className="w-full px-3 py-2 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowManageModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle save logic here
                    setShowManageModal(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
                >
                  Save Changes
                </button>
                {selectedDonor && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this donor?')) {
                        handleDeleteDonor(selectedDonor.id);
                        setShowManageModal(false);
                      }
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;
