'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com' },
  ];

  return (
    <section className="w-full mx-auto bg-gray-50">
      {/* Hero Section */}
      <HeroSection
        title="Get In Touch"
        subtitle="We're here to help and answer any questions you might have."
        eyebrow="Connect With Us"
        image="/hero-section.jpeg"
        imageAlt="Contact us"
        minHeight="lg"
        align="center"
      />

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
            <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-indigo-600 to-purple-600 text-white h-full">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center lg:text-left">
                  Contact Information
                </h3>

                <div className="space-y-5 md:space-y-6">
                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/10 p-2.5 rounded-lg">
                      <FiPhone className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg md:text-xl font-semibold">Phone</h4>
                      <a
                        href="tel:+92-202-508-9439"
                        className="mt-1 text-white/90 hover:text-white hover:underline block"
                      >
                        +92 202 508 9439
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/10 p-2.5 rounded-lg">
                      <FiMail className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg md:text-xl font-semibold">Email</h4>
                      <a href="mailto:aqib@azlangarments.live" className="mt-1 text-white/90 hover:text-white hover:underline block">
                        aqib@azlangarments.live
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-white/10 p-2.5 rounded-lg">
                      <FiMapPin className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg md:text-xl font-semibold">Address</h4>
                      <p className="mt-1 text-white/90">
                        I-10 Islamabad<br />
                        Pakistan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Follow Us */}
                <div className="mt-10 md:mt-12">
                  <h4 className="text-lg md:text-xl font-semibold mb-4 text-center lg:text-left">Follow Us</h4>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 hover:bg-white/20 p-2.5 md:p-3 rounded-full transition flex-shrink-0"
                          aria-label={social.name}
                          title={social.name}
                        >
                          <IconComponent className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Form and Map) */}
          <div className="space-y-8 md:space-y-10">
            {/* Contact Form */}


            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-64 sm:h-80 md:h-96 w-full bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3587.821046891556!2d-73.9352!3d40.7580!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb8dc8ecc1%3A0x41f2e40e6dde3f0!2s123%20Fashion%20Street%2C%20New%20York!5e0!3m2!1sen!2s!4v1642234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Store Location"
                ></iframe>
              </div>
              <div className="p-6 md:p-8">
                <h4 className="text-lg md:text-xl font-semibold text-gray-800">Our Location</h4>
                <p className="text-gray-600 mt-2">123 Fashion Street, New York, NY 10001</p>
                <p className="text-sm text-gray-500 mt-2">Visit our store for the latest fashion collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
