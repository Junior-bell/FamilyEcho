import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Heart } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';
import ProfileCard from '../components/ProfileCard';

const ProfilesPage = () => {
  const { members } = useFamily();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRelationship, setSelectedRelationship] = useState('all');
  const [showDeceasedOnly, setShowDeceasedOnly] = useState(false);

  // Get unique relationships for filter
  const relationships = useMemo(() => {
    const unique = [...new Set(members.map(member => member.relationship))];
    return unique.sort();
  }, [members]);

  // Filter members based on search and filters
  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.relationship.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRelationship = selectedRelationship === 'all' || member.relationship === selectedRelationship;
      const matchesDeceasedFilter = !showDeceasedOnly || member.isDeceased;
      
      return matchesSearch && matchesRelationship && matchesDeceasedFilter;
    });
  }, [members, searchQuery, selectedRelationship, showDeceasedOnly]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary-cream page-padding">
      <div className="max-w-7xl mx-auto container-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-primary-blue" />
            <h1 className="text-4xl md:text-5xl font-lora font-bold text-accent-gray">
              Family Profiles
            </h1>
          </div>
          <p className="text-lg text-accent-gray max-w-2xl mx-auto">
            Discover the stories, voices, and memories of each family member. 
            Every profile is a window into the unique personality that makes our family special.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-card shadow-card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-gray" />
              <input
                type="text"
                placeholder="Search by name, relationship, or bio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>

            {/* Relationship Filter */}
            <div>
              <select
                value={selectedRelationship}
                onChange={(e) => setSelectedRelationship(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              >
                <option value="all">All Relationships</option>
                {relationships.map(relationship => (
                  <option key={relationship} value={relationship}>
                    {relationship}
                  </option>
                ))}
              </select>
            </div>

            {/* Deceased Filter */}
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDeceasedOnly}
                  onChange={(e) => setShowDeceasedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                />
                <span className="text-accent-gray">Show memorial profiles only</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Users className="h-8 w-8 text-primary-blue mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {members.length}
            </h3>
            <p className="text-accent-gray">Total Members</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Heart className="h-8 w-8 text-accent-red mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {members.filter(m => m.isDeceased).length}
            </h3>
            <p className="text-accent-gray">Memorial Profiles</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Filter className="h-8 w-8 text-primary-blue mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {filteredMembers.length}
            </h3>
            <p className="text-accent-gray">Showing Results</p>
          </div>
        </motion.div>

        {/* Profiles Grid */}
        {filteredMembers.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredMembers.map((member) => (
              <motion.div key={member.id} variants={itemVariants}>
                <ProfileCard member={member} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-lora font-semibold text-accent-gray mb-2">
              No profiles found
            </h3>
            <p className="text-accent-gray mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRelationship('all');
                setShowDeceasedOnly(false);
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-card shadow-card p-8">
            <h3 className="text-2xl font-lora font-bold text-accent-gray mb-4">
              Missing a Family Member?
            </h3>
            <p className="text-accent-gray mb-6 max-w-2xl mx-auto">
              Help us complete our family archive by adding profiles for all family members. 
              Every story matters and every voice deserves to be heard.
            </p>
            <button className="btn-primary">
              Add New Profile
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilesPage; 