import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, Share2, Edit, Heart, Calendar, Users, ArrowLeft } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useFamily } from '../context/FamilyContext';
import MemoryCard from '../components/MemoryCard';

const ProfileDetailPage = () => {
  const { id } = useParams();
  const { getMemberById, getMemoriesByMemberId } = useFamily();
  const [member, setMember] = useState(null);
  const [memories, setMemories] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const memberData = getMemberById(id);
    if (memberData) {
      setMember(memberData);
      const memberMemories = getMemoriesByMemberId(id);
      setMemories(memberMemories);
    }
  }, [id, getMemberById, getMemoriesByMemberId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  if (!member) {
    return (
      <div className="min-h-screen bg-primary-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-accent-gray">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link 
            to="/profiles" 
            className="inline-flex items-center space-x-2 text-primary-blue hover:text-blue-600 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Profiles</span>
          </Link>
        </motion.div>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-card shadow-card p-8 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="polaroid-frame">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
                
                {/* Deceased Badge */}
                {member.isDeceased && (
                  <div className="absolute top-4 left-4 bg-accent-red text-white px-3 py-1 rounded-full text-sm font-medium">
                    In Memory
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-lora font-bold text-accent-gray mb-2">
                    {member.name}
                  </h1>
                  <p className="text-xl text-primary-blue font-medium mb-4">
                    {member.relationship}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="p-3 bg-primary-cream text-accent-gray rounded-full hover:bg-primary-blue hover:text-white transition-colors duration-300">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button className="p-3 bg-primary-cream text-accent-gray rounded-full hover:bg-primary-blue hover:text-white transition-colors duration-300">
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-lg font-lora font-semibold text-accent-gray mb-3">About</h3>
                <p className="text-accent-gray leading-relaxed">{member.bio}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-blue" />
                  <div>
                    <p className="text-sm text-accent-gray opacity-75">Birth Date</p>
                    <p className="text-accent-gray font-medium">
                      {formatDate(member.birthDate)} ({calculateAge(member.birthDate)} years old)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary-blue" />
                  <div>
                    <p className="text-sm text-accent-gray opacity-75">Memories</p>
                    <p className="text-accent-gray font-medium">{memories.length} shared memories</p>
                  </div>
                </div>
              </div>

              {/* Hobbies */}
              {member.hobbies && member.hobbies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-lora font-semibold text-accent-gray mb-3">Hobbies & Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="bg-primary-cream text-accent-gray px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio/Video Section */}
              {(member.audioUrl || member.videoUrl) && (
                <div className="space-y-4">
                  {member.audioUrl && (
                    <div>
                      <h3 className="text-lg font-lora font-semibold text-accent-gray mb-3">Voice Memory</h3>
                      <div className="bg-primary-cream rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                            className="p-3 bg-primary-blue text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                          >
                            {isAudioPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </button>
                          <div>
                            <p className="text-accent-gray font-medium">Listen to {member.name}'s voice</p>
                            <p className="text-sm text-accent-gray opacity-75">Personal message or story</p>
                          </div>
                        </div>
                        {isAudioPlaying && (
                          <audio
                            src={member.audioUrl}
                            controls
                            className="w-full mt-4"
                            onEnded={() => setIsAudioPlaying(false)}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  {member.videoUrl && (
                    <div>
                      <h3 className="text-lg font-lora font-semibold text-accent-gray mb-3">Video Story</h3>
                      <div className="bg-primary-cream rounded-lg p-4">
                        <ReactPlayer
                          url={member.videoUrl}
                          width="100%"
                          height="200px"
                          controls
                          playing={isVideoPlaying}
                          onPlay={() => setIsVideoPlaying(true)}
                          onPause={() => setIsVideoPlaying(false)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Linked Memories */}
        {memories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-lora font-bold text-accent-gray mb-6">
              Memories with {member.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {memories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Tribute Section for Deceased Members */}
        {member.isDeceased && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 bg-accent-gray text-white rounded-card p-8 text-center"
          >
            <Heart className="h-12 w-12 text-primary-gold mx-auto mb-4" />
            <h3 className="text-2xl font-lora font-bold mb-4">
              In Loving Memory of {member.name}
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Though they may be gone from our sight, they will never be gone from our hearts. 
              Their memory lives on through the stories we share and the love we continue to feel.
            </p>
            <button className="btn-primary bg-primary-gold text-accent-gray hover:bg-yellow-400">
              Share a Memory
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetailPage; 