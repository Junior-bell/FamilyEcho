import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Heart, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'family@familyecho.com',
      link: 'mailto:family@familyecho.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '(555) 123-4567',
      link: 'tel:+1-555-123-4567'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Family Street, Memory Lane, ML 12345',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-primary-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MessageCircle className="h-8 w-8 text-primary-blue" />
            <h1 className="text-4xl md:text-5xl font-lora font-bold text-accent-gray">
              Contact Us
            </h1>
          </div>
          <p className="text-lg text-accent-gray max-w-2xl mx-auto">
            Have questions about our family archive? Want to contribute memories or 
            help preserve our family legacy? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-card shadow-card p-8"
          >
            <h2 className="text-2xl font-lora font-bold text-accent-gray mb-6">
              Send us a Message
            </h2>
            
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6"
              >
                Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-accent-gray mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-gray mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-gray mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-gray mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-lora font-bold text-accent-gray">
                Get in Touch
              </h2>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-card shadow-card p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-cream rounded-lg">
                      <info.icon className="h-6 w-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-lora font-semibold text-accent-gray mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-primary-blue hover:text-blue-600 transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-accent-gray">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Family Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-accent-gray text-white rounded-card p-8 text-center"
            >
              <Heart className="h-12 w-12 text-primary-gold mx-auto mb-4" />
              <h3 className="text-xl font-lora font-bold mb-4">
                Join Our Family Legacy
              </h3>
              <p className="text-gray-300 mb-6">
                Every family has stories worth telling. Whether you're a family member 
                wanting to contribute memories or someone interested in preserving 
                family history, we welcome your connection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary bg-primary-gold text-accent-gray hover:bg-yellow-400">
                  Share a Memory
                </button>
                <button className="btn-secondary border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-accent-gray">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white rounded-card shadow-card p-6"
            >
              <h3 className="text-lg font-lora font-semibold text-accent-gray mb-4">
                Response Time
              </h3>
              <div className="space-y-2 text-accent-gray">
                <p>We typically respond within 24-48 hours</p>
                <p>Family members get priority response</p>
                <p>Emergency contact: Available 24/7 for family matters</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-card shadow-card p-8"
        >
          <h2 className="text-2xl font-lora font-bold text-accent-gray mb-6 text-center">
            Why Contact Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-lg font-lora font-semibold text-accent-gray mb-2">
                Share Memories
              </h3>
              <p className="text-accent-gray">
                Contribute photos, stories, and memories to our family archive
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-lg font-lora font-semibold text-accent-gray mb-2">
                Get Help
              </h3>
              <p className="text-accent-gray">
                Need assistance with the website or have technical questions?
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="text-lg font-lora font-semibold text-accent-gray mb-2">
                Stay Connected
              </h3>
              <p className="text-accent-gray">
                Join our family newsletter for updates and new memories
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 