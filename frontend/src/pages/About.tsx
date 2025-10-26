import { Heart, Users, Award, Target, Shield, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Lives Saved', value: '50,000+', icon: Heart },
    { label: 'Active Donors', value: '25,000+', icon: Users },
    { label: 'Partner Hospitals', value: '150+', icon: Award },
    { label: 'Years of Service', value: '10+', icon: Target },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All blood donations undergo rigorous screening and testing to ensure the highest safety standards.',
    },
    {
      icon: Heart,
      title: 'Life-Saving Impact',
      description: 'Every donation can save up to three lives. Your contribution makes a real difference.',
    },
    {
      icon: Globe,
      title: 'Community Focused',
      description: 'Building stronger communities through compassion, generosity, and collective action.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="mx-auto h-16 w-16 text-teal-600 mb-8" />
          <h1 className="text-4xl md:text-6xl font-bold text-teal-900 mb-6">
            About BloodLink
          </h1>
          <p className="text-xl text-teal-700 mb-8">
            Connecting donors with those in need, one drop at a time. We're on a mission to
            ensure no one dies waiting for blood.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="mx-auto h-12 w-12 text-teal-600 mb-4" />
                <div className="text-3xl font-bold text-teal-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-teal-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-900 mb-4">Our Mission</h2>
            <p className="text-xl text-teal-700">
              To create a world where no one dies waiting for blood by connecting willing donors
              with hospitals and patients in need through technology and compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <value.icon className="mx-auto h-12 w-12 text-teal-600 mb-4" />
                <h3 className="text-xl font-semibold text-teal-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-teal-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-900 mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto text-teal-700">
            <p className="mb-6">
              BloodLink was founded in 2014 by a group of medical professionals and technology
              enthusiasts who witnessed firsthand the challenges of blood shortage in emergency situations.
            </p>
            <p className="mb-6">
              What started as a small local initiative has grown into a nationwide network connecting
              thousands of donors with hundreds of hospitals. Our platform uses cutting-edge technology
              to match donors with recipients quickly and efficiently.
            </p>
            <p>
              Today, BloodLink continues to innovate and expand, ensuring that every person who needs
              blood can access it when they need it most. We're not just saving lives – we're building
              a community of heroes, one donation at a time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Whether you're a donor, hospital, or supporter, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors">
              Become a Donor
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 rounded-lg font-semibold transition-colors">
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
