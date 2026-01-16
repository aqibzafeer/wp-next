'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { FiShoppingBag, FiTarget, FiTrendingUp, FiAward, FiZap, FiUsers } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function AboutPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' },
  ];

  return (
    <div className="text-gray-800 overflow-hidden">
      {/* Hero Banner */}
      <HeroSection
        title="Our Fashion Story"
        subtitle="Welcome to AG — where fashion meets passion! Since 2015, we've been creating stylish, comfortable, and high-quality clothing that makes you feel confident and look your best."
        eyebrow="ABOUT US"
        image="/products/jeans.jpg"
        minHeight="lg"
        align="left"
        ctaText="Shop Our Collections"
        ctaHref="/products"
      />

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                Our Core Values
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FiShoppingBag,
                title: 'Our Products',
                desc: 'High-quality products tailored to your needs',
              },
              {
                icon: FiTarget,
                title: 'Our Mission',
                desc: 'Empower lives through innovation and quality',
              },
              {
                icon: FiTrendingUp,
                title: 'Our Vision',
                desc: 'Global leader in innovative solutions',
              },
              {
                icon: FiAward,
                title: 'Our Values',
                desc: 'Integrity, quality, and customer satisfaction',
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-2"
                >
                  <div className="bg-indigo-100 p-4 rounded-full mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                      {value.title}
                    </span>
                  </h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image Section */}
            <div className="lg:w-1/2 relative">
              <img
                src="/banner-img.jpeg"
                alt="Sustainable garment production"
                className="rounded-xl shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-lg shadow-md border border-gray-100">
                <p className="font-medium text-indigo-600">Since 2015</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2">
              <div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                  Our Commitment
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                    Ethical Fashion Forward
                  </span>
                </h2>
                <p className="text-gray-600 mb-8">
                  At our garment store, we believe style shouldn't compromise our planet's future. Discover how we're
                  redefining fashion sustainability.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: FiZap,
                    title: 'Eco-Fabrics',
                    desc: 'We use 85% organic cotton, bamboo, and recycled polyester in our collections',
                  },
                  {
                    icon: FiUsers,
                    title: 'Artisan Crafted',
                    desc: 'Hand-finished by skilled tailors using traditional techniques',
                  },
                ].map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 hover:bg-white rounded-xl transition-colors"
                    >
                      <div className="text-3xl flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                            {item.title}
                          </span>
                        </h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:-translate-y-1">
                  Learn About Our Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📞',
                title: 'Contact Us',
                content: (
                  <>
                    <p className="text-gray-600 mt-2">
                      email:{' '}
                      <a href="mailto:info@store.com" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        info@store.com
                      </a>
                    </p>
                    <p className="text-gray-600 mt-2">
                      or call us at{' '}
                      <a href="tel:+1-800-000-0000" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        +1-800-000-0000
                      </a>
                    </p>
                  </>
                ),
              },
              {
                icon: '👥',
                title: 'Our Team',
                content: <p className="text-gray-600">Talented professionals dedicated to delivering the best experience.</p>,
              },
              {
                icon: '💬',
                title: 'Testimonials',
                content: (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-gray-600 italic">
                      "The quality and service exceeded my expectations! Highly recommended."
                    </p>
                  </div>
                ),
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:shadow-lg transition-all border border-gray-100 hover:scale-105"
              >
                <div className="bg-indigo-100 p-4 rounded-full mb-5 text-3xl">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
                    {card.title}
                  </span>
                </h3>
                {card.content}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
              Join Our Community
            </span>
          </h2>
          <p className="text-gray-600 mb-8">Get 15% off your first order and exclusive access to new collections</p>

          {subscribed && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
              Thank you for subscribing! Check your email for the discount code.
            </div>
          )}

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="grow px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:-translate-y-1"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Social Media */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">
              Follow Us
            </span>
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">Stay updated with our latest products, offers, and news.</p>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 px-5 py-3 rounded-lg flex items-center gap-2 transition-all hover:-translate-y-1"
              >
                <social.icon className="w-5 h-5" />
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
