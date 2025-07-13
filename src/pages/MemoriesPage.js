import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Camera, Plus, Calendar, Users } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';
import MemoryCard from '../components/MemoryCard';

const MemoriesPage = () => {
  const { memories, members } = useFamily();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Get unique memory types
  const memoryTypes = useMemo(() => {
    const unique = [...new Set(memories.map(memory => memory.type))];
    return unique.sort();
  }, [memories]);

  // Filter memories based on search and filters
  const filteredMemories = useMemo(() => {
    return memories.filter(memory => {
      const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          memory.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesMember = selectedMember === 'all' || memory.memberIds.includes(parseInt(selectedMember));
      const matchesType = selectedType === 'all' || memory.type === selectedType;
      
      let matchesDate = true;
      if (selectedDateRange !== 'all') {
        const memoryDate = new Date(memory.date);
        const today = new Date();
        const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        
        switch (selectedDateRange) {
          case 'last-month':
            matchesDate = memoryDate >= oneMonthAgo;
            break;
          case 'last-6-months':
            matchesDate = memoryDate >= sixMonthsAgo;
            break;
          case 'last-year':
            matchesDate = memoryDate >= oneYearAgo;
            break;
          default:
            matchesDate = true;
        }
      }
      
      return matchesSearch && matchesMember && matchesType && matchesDate;
    });
  }, [memories, searchQuery, selectedMember, selectedType, selectedDateRange]);

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
            <Camera className="h-8 w-8 text-primary-blue" />
            <h1 className="text-4xl md:text-5xl font-lora font-bold text-accent-gray">
              Family Memories
            </h1>
          </div>
          <p className="text-lg text-accent-gray max-w-2xl mx-auto">
            Relive the moments that bring us together. From family vacations to everyday 
            celebrations, every memory tells a story worth preserving.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-card shadow-card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-gray" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>

            {/* Member Filter */}
            <div>
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              >
                <option value="all">All Members</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              >
                <option value="all">All Types</option>
                {memoryTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="last-month">Last Month</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Camera className="h-8 w-8 text-primary-blue mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {memories.length}
            </h3>
            <p className="text-accent-gray">Total Memories</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Users className="h-8 w-8 text-primary-blue mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {members.length}
            </h3>
            <p className="text-accent-gray">Family Members</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Calendar className="h-8 w-8 text-primary-blue mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {new Date().getFullYear()}
            </h3>
            <p className="text-accent-gray">Current Year</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Filter className="h-8 w-8 text-primary-blue mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {filteredMemories.length}
            </h3>
            <p className="text-accent-gray">Showing Results</p>
          </div>
        </motion.div>

        {/* Upload Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="btn-primary"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Memory
          </button>
        </motion.div>

        {/* Upload Form */}
        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-card shadow-card p-6 mb-8"
          >
            <h3 className="text-xl font-lora font-semibold text-accent-gray mb-4">
              Share a New Memory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-accent-gray mb-2">
                  Memory Title
                </label>
                <input
                  type="text"
                  placeholder="Enter memory title..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-accent-gray mb-2">
                  Memory Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent">
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="text">Text Story</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-accent-gray mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe this memory..."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-accent-gray mb-2">
                  Family Members Involved
                </label>
                <div className="flex flex-wrap gap-2">
                  {members.map(member => (
                    <label key={member.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                      />
                      <span className="text-accent-gray">{member.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 flex space-x-4">
                <button className="btn-primary">
                  Upload Memory
                </button>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Memories Grid */}
        {filteredMemories.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredMemories.map((memory) => (
              <motion.div key={memory.id} variants={itemVariants}>
                <MemoryCard memory={memory} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-lora font-semibold text-accent-gray mb-2">
              No memories found
            </h3>
            <p className="text-accent-gray mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMember('all');
                setSelectedType('all');
                setSelectedDateRange('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemoriesPage; 