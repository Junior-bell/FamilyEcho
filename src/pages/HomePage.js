import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Users, Camera, TreePine } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';
import ProfileCard from '../components/ProfileCard';
import MemoryCard from '../components/MemoryCard';

const HomePage = () => {
  const { members, memories } = useFamily();

  // Get featured profiles (first 3 members)
  const featuredProfiles = members.slice(0, 3);
  
  // Get recent memories (last 4 memories)
  const recentMemories = memories.slice(-4).reverse();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-lora font-bold mb-6 text-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to Family Echo
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A digital archive to celebrate and preserve family memories, profiles, and voices. 
              Make your family alive online with interactive, emotional, and accessible content.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/family-tree" className="btn-primary text-lg px-8 py-4">
                Explore Family Tree
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/profiles" className="btn-secondary text-lg px-8 py-4">
                View All Profiles
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart className="h-12 w-12 text-white" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 opacity-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Users className="h-12 w-12 text-white" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={itemVariants} className="card">
              <Users className="h-12 w-12 text-primary-blue mx-auto mb-4" />
              <h3 className="text-2xl font-lora font-bold text-accent-gray mb-2">
                {members.length}
              </h3>
              <p className="text-accent-gray">Family Members</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card">
              <Camera className="h-12 w-12 text-primary-blue mx-auto mb-4" />
              <h3 className="text-2xl font-lora font-bold text-accent-gray mb-2">
                {memories.length}
              </h3>
              <p className="text-accent-gray">Precious Memories</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card">
              <TreePine className="h-12 w-12 text-primary-blue mx-auto mb-4" />
              <h3 className="text-2xl font-lora font-bold text-accent-gray mb-2">
                {members.filter(m => m.isDeceased).length}
              </h3>
              <p className="text-accent-gray">Legacy Profiles</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Profiles Section */}
      <section className="py-16 bg-primary-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-accent-gray mb-4">
              Featured Family Members
            </h2>
            <p className="text-lg text-accent-gray max-w-2xl mx-auto">
              Meet the wonderful people who make our family special. Each profile contains 
              stories, memories, and the unique voice that makes them who they are.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProfiles.map((member, index) => (
              <motion.div key={member.id} variants={itemVariants}>
                <ProfileCard member={member} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/profiles" className="btn-primary">
              View All Profiles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Recent Memories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-accent-gray mb-4">
              Recent Memories
            </h2>
            <p className="text-lg text-accent-gray max-w-2xl mx-auto">
              Relive the moments that bring us together. From family vacations to everyday 
              celebrations, every memory tells a story.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {recentMemories.map((memory, index) => (
              <motion.div key={memory.id} variants={itemVariants}>
                <MemoryCard memory={memory} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/memories" className="btn-secondary">
              Explore All Memories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-accent-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-lora font-bold mb-6">
              Start Preserving Your Family's Legacy
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Every family has stories worth telling. Join us in creating a digital archive 
              that will be cherished for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary bg-primary-gold text-accent-gray hover:bg-yellow-400">
                Get Started Today
              </Link>
              <Link to="/family-tree" className="btn-secondary border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-accent-gray">
                Explore Our Family Tree
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 