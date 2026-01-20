// ALL APPLICATION DATA - CENTRALIZED

import { FiShoppingBag, FiTarget, FiTrendingUp, FiAward, FiZap, FiUsers, FiPhone, FiMail, FiMapPin, FiTruck, FiLock, FiRotateCcw } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok, FaLinkedin, FaYoutube } from 'react-icons/fa';
import type { MetadataRoute } from 'next';

// HOMEPAGE DATA

// Hero Slides Data - Homepage
export const heroSlides = [
  {
    id: '1',
    title: 'Welcome to Our Store',
    subtitle: 'Discover our premium collection of clothing and fashion items',
    eyebrow: 'SHOP',
    image: '/products/jeans.jpg',
    imageAlt: 'Premium denim jeans collection',
    ctaText: 'Shop Now',
    ctaHref: '/shop',
  },
  {
    id: '2',
    title: 'Exclusive Collections',
    subtitle: 'Find the perfect outfit for every occasion',
    eyebrow: 'FEATURED',
    image: '/products/suit.jpg',
    imageAlt: 'Formal business suits collection',
    ctaText: 'Browse Suits',
    ctaHref: '/shop',
  },
  {
    id: '3',
    title: 'Traditional Wear',
    subtitle: 'Embrace elegance with our traditional collection',
    eyebrow: 'TRENDING',
    image: '/products/kamiz.jpg',
    imageAlt: 'Traditional Kamiz Shalwar collection',
    ctaText: 'Explore Now',
    ctaHref: '/shop',
  },
];

// Benefits Data - Homepage

export const benefitsData: Array<{
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo';
}> = [
  {
    id: 1,
    icon: <FiTruck />,
    title: 'Free Shipping',
    description: 'On orders over Rs 500',
    color: 'blue',
  },
  {
    id: 2,
    icon: <FiLock />,
    title: 'Secure Payment',
    description: 'Safe and encrypted transactions',
    color: 'green',
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: 'Premium Quality',
    description: 'Best materials and craftsmanship',
    color: 'yellow',
  },
  {
    id: 4,
    icon: <FiRotateCcw />,
    title: '30-Day Returns',
    description: 'Hassle-free return policy',
    color: 'purple',
  },
];

// Statistics Data - Homepage

export const statsData = [
  {
    id: 1,
    number: '10K+',
    label: 'Happy Customers',
    icon: '😊',
  },
  {
    id: 2,
    number: '500+',
    label: 'Products Available',
    icon: '👕',
  },
  {
    id: 3,
    number: '98%',
    label: 'Satisfaction Rate',
    icon: '⭐',
  },
  {
    id: 4,
    number: '24/7',
    label: 'Customer Support',
    icon: '💬',
  },
];

// Testimonials Data - Homepage

export const testimonialsData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Fashion Enthusiast',
    review: 'Excellent quality products and fast delivery. Highly recommended!',
    rating: 5,
    avatar: '👨‍💼',
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Business Professional',
    review: 'The suits are perfectly tailored and the fabric quality is outstanding.',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Regular Customer',
    review: 'Great prices, amazing selection, and wonderful customer service.',
    rating: 5,
    avatar: '👨‍🎨',
  },
];

// Core Values Data - About Page

export const coreValuesData: Array<{
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo';
}> = [
  {
    id: 1,
    icon: <FiShoppingBag />,
    title: 'Our Products',
    description: 'High-quality products tailored to your needs',
    color: 'blue',
  },
  {
    id: 2,
    icon: <FiTarget />,
    title: 'Our Mission',
    description: 'Empower lives through innovation and quality',
    color: 'green',
  },
  {
    id: 3,
    icon: <FiTrendingUp />,
    title: 'Our Vision',
    description: 'Global leader in innovative solutions',
    color: 'purple',
  },
  {
    id: 4,
    icon: <FiAward />,
    title: 'Our Values',
    description: 'Integrity, quality, and customer satisfaction',
    color: 'yellow',
  },
];

// Sustainability Data - About Page

export const sustainabilityData = [
  {
    id: 1,
    icon: FiZap,
    title: 'Eco-Fabrics',
    desc: 'We use 85% organic cotton, bamboo, and recycled polyester in our collections',
  },
  {
    id: 2,
    icon: FiUsers,
    title: 'Artisan Crafted',
    desc: 'Hand-finished by skilled tailors using traditional techniques',
  },
];

// Info Cards Data - About Page

export const infoCardsData = [
  {
    id: 1,
    icon: '📞',
    title: 'Contact Us',
    content: (
      <>
        <p className="text-gray-600 mt-2">
          email:{' '}
          <a href="mailto:aqib@azlangarments.live" className="text-indigo-600 hover:text-indigo-800 font-medium">
            aqib@azlangarments.live
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
    id: 2,
    icon: '👥',
    title: 'Our Team',
    content: <p className="text-gray-600">Talented professionals dedicated to delivering the best experience.</p>,
  },
  {
    id: 3,
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
];

// Newsletter Data - About Page

export const newsletterData = {
  title: 'Join Our Community',
  subtitle: 'Get 15% off your first order and exclusive access to new collections',
  buttonText: 'Subscribe',
};

// CONTACT PAGE DATA
// Contact Information Data - Contact Page

export const contactInfoData = [
  {
    id: 1,
    icon: FiPhone,
    title: 'Phone',
    content: '+92 202 508 9439',
    href: 'tel:+92-202-508-9439',
  },
  {
    id: 2,
    icon: FiMail,
    title: 'Email',
    content: 'aqib@azlangarments.live',
    href: 'mailto:aqib@azlangarments.live',
  },
  {
    id: 3,
    icon: FiMapPin,
    title: 'Address',
    content: 'I-10 Islamabad\nPakistan',
    href: null,
  },
];

// SHARED DATA (Used by multiple pages)
// Social Links Data - Used by About, Contact, Footer

export const socialLinks = [
  { name: 'Facebook', icon: FaFacebook, url: 'https://facebook.com' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' },
  { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com' },
];

// Not Found Page Data - 404 Page
export const notFoundData = {
  title: '404',
  subtitle: 'Page Not Found',
  description: "The page you're looking for doesn't exist.",
  buttonText: 'Go Back Home',
  buttonHref: '/',
};


// FOOTER COMPONENT DATA
// Footer Data - Footer Component

export const footerData = {
  about: {
    title: 'About Us',
    description: 'Azlan Garments is a premium fashion store dedicated to delivering high-quality garments that combine style, comfort, and durability. We believe fashion is more than just clothing—it\'s a way to express confidence, individuality, and modern lifestyle.',
  },
  quickLinks: {
    title: 'Quick Links',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/shop' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  categories: {
    title: 'Categories',
    links: [
      { name: 'Jeans', href: '/shop' },
      { name: 'Shirts', href: '/shop' },
      { name: 'Jackets', href: '/shop' },
      { name: 'Shoes', href: '/shop' },
    ],
  },
  contact: {
    title: 'Contact',
    email: 'aqib@azlangarments.live',
    phone: '+92 302 508 9439',
  },
  copyright: '© 2026 Azlan Garments. All rights reserved. (Developed by: Aqib Zafeer)',
};

// SEO/METADATA DATA
// Robots Configuration Data - robots.ts
export const robotsConfig = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/api', '/admin'],
  },
  sitemap: 'https://www.azlangarments.com/sitemap.xml',
};

// Sitemap Configuration Data - sitemap.ts
const baseUrl = 'https://www.azlangarments.com';

export const sitemapEntries: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    url: `${baseUrl}/shop`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/cart`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  },
];

// EXPORT ALL DATA FOR EASY IMPORTING

export const allData = {
  // Homepage
  heroSlides,
  benefitsData,
  statsData,
  testimonialsData,

  // About Page
  coreValuesData,
  sustainabilityData,
  infoCardsData,
  newsletterData,

  // Contact Page
  contactInfoData,

  // Shared
  socialLinks,

  // Not Found
  notFoundData,

  // Footer
  footerData,

  // SEO
  robotsConfig,
  sitemapEntries,
};