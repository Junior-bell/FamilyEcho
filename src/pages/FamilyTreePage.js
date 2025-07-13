import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ZoomIn, ZoomOut, RotateCcw, Users, Heart } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';

const FamilyTreePage = () => {
  const { familyTree, members } = useFamily();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [zoom, setZoom] = useState(1);

  // Simple tree visualization (in a real app, you'd use D3.js for more complex trees)
  const renderSimpleTree = () => {
    const generations = {};
    
    // Group members by generation
    familyTree.nodes.forEach(node => {
      if (!generations[node.generation]) {
        generations[node.generation] = [];
      }
      generations[node.generation].push(node);
    });

    return (
      <div className="flex flex-col items-center space-y-8">
        {Object.keys(generations).sort().map(generation => (
          <div key={generation} className="flex flex-wrap justify-center gap-8">
            {generations[generation].map(node => {
              const member = members.find(m => m.id === node.id);
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div
                    className={`w-24 h-24 rounded-full border-4 cursor-pointer transition-all duration-300 ${
                      selectedMember?.id === node.id
                        ? 'border-primary-gold shadow-lg scale-110'
                        : 'border-primary-blue hover:border-primary-gold'
                    } ${member?.isDeceased ? 'opacity-75' : ''}`}
                    onClick={() => setSelectedMember(member)}
                  >
                    <img
                      src={member?.photo || 'https://via.placeholder.com/96'}
                      alt={node.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    {member?.isDeceased && (
                      <Heart className="absolute -top-2 -right-2 h-6 w-6 text-accent-red" />
                    )}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium text-accent-gray">{node.name}</p>
                    <p className="text-xs text-primary-blue">{node.relationship}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => setZoom(1);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Users className="h-8 w-8 text-primary-blue" />
            <h1 className="text-4xl md:text-5xl font-lora font-bold text-accent-gray">
              Family Tree
            </h1>
          </div>
          <p className="text-lg text-accent-gray max-w-2xl mx-auto">
            Explore the connections that bind our family together. Click on any member 
            to learn more about their story and see their place in our family history.
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-card shadow-card p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-gray" />
              <input
                type="text"
                placeholder="Search family members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
              />
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleZoomOut}
                className="p-2 bg-primary-cream text-accent-gray rounded-lg hover:bg-primary-blue hover:text-white transition-colors duration-300"
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="text-accent-gray font-medium">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 bg-primary-cream text-accent-gray rounded-lg hover:bg-primary-blue hover:text-white transition-colors duration-300"
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 bg-primary-cream text-accent-gray rounded-lg hover:bg-primary-blue hover:text-white transition-colors duration-300"
                title="Reset View"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
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
            <p className="text-accent-gray">Family Members</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Heart className="h-8 w-8 text-accent-red mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {members.filter(m => m.isDeceased).length}
            </h3>
            <p className="text-accent-gray">Memorial Profiles</p>
          </div>
          <div className="bg-white rounded-card shadow-card p-6 text-center">
            <Users className="h-8 w-8 text-primary-blue mx-auto mb-2" />
            <h3 className="text-2xl font-lora font-bold text-accent-gray">
              {Math.max(...familyTree.nodes.map(n => n.generation))}
            </h3>
            <p className="text-accent-gray">Generations</p>
          </div>
        </motion.div>

        {/* Family Tree Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-card shadow-card p-8 mb-8 overflow-auto"
        >
          <div
            style={{ transform: `scale(${zoom})` }}
            className="transition-transform duration-300 origin-center"
          >
            {renderSimpleTree()}
          </div>
        </motion.div>

        {/* Selected Member Details */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-card shadow-card p-6"
          >
            <div className="flex items-start space-x-6">
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-lora font-bold text-accent-gray mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-primary-blue font-medium mb-3">
                  {selectedMember.relationship}
                </p>
                <p className="text-accent-gray mb-4">
                  {selectedMember.bio}
                </p>
                {selectedMember.hobbies && selectedMember.hobbies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="bg-primary-cream text-accent-gray px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-accent-gray hover:text-primary-blue transition-colors duration-300"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {searchQuery && filteredMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-card shadow-card p-6"
          >
            <h3 className="text-xl font-lora font-semibold text-accent-gray mb-4">
              Search Results for "{searchQuery}"
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map(member => (
                <div
                  key={member.id}
                  className="flex items-center space-x-3 p-3 bg-primary-cream rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => setSelectedMember(member)}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-accent-gray">{member.name}</p>
                    <p className="text-sm text-primary-blue">{member.relationship}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FamilyTreePage; 