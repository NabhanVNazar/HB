import { useForm } from 'react-hook-form';
import { Heart, User, Mail, Phone, MapPin, Calendar, Eye, EyeOff, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


type FormData = {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  state: string;
  medicalConditions?: string;
  donationHistory?: string;
  location: string;
};

const DonorRegistration: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Prepare data for backend
      const donorData = {
        name: data.name,
        age: data.age,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        medicalConditions: data.medicalConditions || 'None',
        donationHistory: data.donationHistory || 'First time',
        status: 'pending'
      };

      console.log('Sending donor data to backend:', donorData);

      // Send to backend API
      const response = await fetch('http://localhost:5000/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Backend response:', result);

      toast.success('🎉 Registration successful! Your data has been saved to the database.');
      reset();
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('❌ Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
    'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-teal-800 mb-2">Become a Blood Donor</h1>
            <p className="text-gray-600">Join our network and help save lives with AI-powered matching</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Age *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                  <input
                    {...register('age', {
                      required: 'Age is required',
                      min: { value: 18, message: 'Must be at least 18' },
                      max: { value: 65, message: 'Must be under 65' }
                    })}
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your age"
                  />
                </div>
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Gender *</label>
                <select
                  {...register('gender', { required: 'Gender is required' })}
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Blood Group *</label>
                <select
                  {...register('bloodGroup', { required: 'Blood group is required' })}
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
                </select>
                {errors.bloodGroup && <p className="text-red-500 text-sm mt-1">{errors.bloodGroup.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                    })}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                  <input
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: { value: /^[0-9]{10}$/, message: '10 digits required' }
                    })}
                    type="tel"
                    className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter 10-digit number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-10 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                  <input
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === watch('password') || 'Passwords do not match'
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-10 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-700 mb-2">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-teal-400" />
                <input
                  {...register('address', { required: 'Address is required' })}
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your full address"
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">City *</label>
                <input
                  {...register('city', { required: 'City is required' })}
                  type="text"
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your city"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-teal-700 mb-2">State *</label>
                <select
                  {...register('state', { required: 'State is required' })}
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select state</option>
                  {states.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-700 mb-2">Medical Conditions</label>
              <textarea
                {...register('medicalConditions')}
                rows={3}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="List any medical conditions..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-700 mb-2">Donation History</label>
              <select {...register('donationHistory')} className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500">
                <option value="">Select history</option>
                <option value="first-time">First time</option>
                <option value="regular">Regular donor</option>
                <option value="frequent">Frequent donor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-teal-700 mb-2">Preferred Location *</label>
              <input
                {...register('location', { required: 'Location is required' })}
                type="text"
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                placeholder="Enter preferred location"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lemon-500 hover:bg-lemon-600 disabled:bg-gray-400 text-teal-900 font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-900"></div>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  <span>Register as Donor</span>
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;
