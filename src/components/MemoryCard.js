import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Camera, Video, FileText, Calendar, Users } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';

const MemoryCard = ({ memory }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { members } = useFamily();

  // Get member names for this memory
  const memberNames = memory.memberIds
    .map(id => members.find(m => m.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2);

  const getMediaIcon = () => {
    switch (memory.type) {
      case 'photo':
        return <Camera className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Play className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className="card group cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Media Preview */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        {memory.type === 'photo' && (
          <div className="polaroid-frame">
            <img
              src={memory.mediaUrl}
              alt={memory.title}
              className="w-full h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        {memory.type === 'video' && (
          <div className="relative">
            <img
              src={memory.mediaUrl}
              alt={memory.title}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
        )}

        {/* Media Type Badge */}
        <div className="absolute top-2 left-2 bg-primary-blue text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          {getMediaIcon()}
          <span className="capitalize">{memory.type}</span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-accent-gray px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(memory.date)}</span>
        </div>
      </div>

      {/* Memory Content */}
      <div>
        <h3 className="text-lg font-lora font-semibold text-accent-gray mb-2 group-hover:text-primary-blue transition-colors duration-300 line-clamp-2">
          {memory.title}
        </h3>
        
        <p className="text-accent-gray text-sm mb-3 line-clamp-2">
          {memory.description}
        </p>

        {/* Member Tags */}
        {memberNames.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <Users className="h-4 w-4 text-primary-blue" />
            <div className="flex flex-wrap gap-1">
              {memberNames.map((name, index) => (
                <span
                  key={index}
                  className="bg-primary-cream text-accent-gray px-2 py-1 rounded-full text-xs font-medium"
                >
                  {name}
                </span>
              ))}
              {memory.memberIds.length > 2 && (
                <span className="bg-primary-cream text-accent-gray px-2 py-1 rounded-full text-xs font-medium">
                  +{memory.memberIds.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {memory.tags && memory.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {memory.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-accent-gray px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
            {memory.tags.length > 3 && (
              <span className="bg-gray-100 text-accent-gray px-2 py-1 rounded-full text-xs">
                +{memory.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-primary-blue bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="text-white text-center">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Play className="h-12 w-12 mx-auto mb-2" />
            <p className="font-medium">View Memory</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryCard; 