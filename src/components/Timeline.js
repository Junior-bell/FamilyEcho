import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';

const Timeline = ({ events = [] }) => {
  if (!events.length) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-accent-gray">No timeline events to display</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-blue"></div>
      
      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start space-x-6"
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>

            {/* Event content */}
            <div className="flex-1 bg-white rounded-card shadow-card p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-lora font-semibold text-accent-gray">
                  {event.title}
                </h3>
                <span className="text-sm text-primary-blue font-medium">
                  {event.date}
                </span>
              </div>
              
              <p className="text-accent-gray mb-3">
                {event.description}
              </p>
              
              {event.members && event.members.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-accent-gray">Family members:</span>
                  <div className="flex space-x-1">
                    {event.members.map((member, memberIndex) => (
                      <span
                        key={memberIndex}
                        className="bg-primary-cream text-accent-gray px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {event.isMemorial && (
                <div className="flex items-center space-x-2 mt-3">
                  <Heart className="h-4 w-4 text-accent-red" />
                  <span className="text-sm text-accent-red font-medium">
                    Memorial Event
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 