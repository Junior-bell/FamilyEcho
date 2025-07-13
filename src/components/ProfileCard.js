import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, User } from 'lucide-react';

const ProfileCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="card group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/profiles/${member.id}`}>
        {/* Profile Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <div className="polaroid-frame">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Audio Indicator */}
          {member.audioUrl && (
            <motion.div
              className="absolute top-2 right-2 bg-primary-blue text-white p-2 rounded-full shadow-lg"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Play className="h-4 w-4" />
            </motion.div>
          )}

          {/* Deceased Indicator */}
          {member.isDeceased && (
            <div className="absolute top-2 left-2 bg-accent-red text-white px-2 py-1 rounded-full text-xs font-medium">
              In Memory
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <h3 className="text-xl font-lora font-semibold text-accent-gray mb-2 group-hover:text-primary-blue transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-primary-blue font-medium mb-3">
            {member.relationship}
          </p>
          
          {/* Bio Preview */}
          <p className="text-accent-gray text-sm line-clamp-3 mb-4">
            {member.bio}
          </p>

          {/* Hobbies */}
          {member.hobbies && member.hobbies.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {member.hobbies.slice(0, 3).map((hobby, index) => (
                <span
                  key={index}
                  className="bg-primary-cream text-accent-gray px-2 py-1 rounded-full text-xs font-medium"
                >
                  {hobby}
                </span>
              ))}
              {member.hobbies.length > 3 && (
                <span className="bg-primary-cream text-accent-gray px-2 py-1 rounded-full text-xs font-medium">
                  +{member.hobbies.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Action Button */}
          <motion.div
            className="flex items-center justify-center space-x-2 text-primary-blue font-medium"
            animate={isHovered ? { x: 5 } : { x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span>View Profile</span>
            <User className="h-4 w-4" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProfileCard; 