import React, { createContext, useContext, useReducer } from 'react';

const FamilyContext = createContext();

// Sample data structure
const initialState = {
  members: [
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: "Mother",
      bio: "A loving mother who always puts family first. Loves gardening and cooking traditional family recipes.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      audioUrl: null,
      videoUrl: null,
      birthDate: "1965-03-15",
      hobbies: ["Gardening", "Cooking", "Reading"],
      memories: [1, 3, 5],
      isDeceased: false
    },
    {
      id: 2,
      name: "Michael Johnson",
      relationship: "Father",
      bio: "A dedicated father and husband who works hard to provide for his family. Enjoys woodworking and fishing.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      videoUrl: null,
      birthDate: "1963-07-22",
      hobbies: ["Woodworking", "Fishing", "Baseball"],
      memories: [2, 4, 6],
      isDeceased: false
    },
    {
      id: 3,
      name: "Emma Johnson",
      relationship: "Daughter",
      bio: "The youngest member of the family, full of energy and creativity. Loves art and music.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      audioUrl: null,
      videoUrl: null,
      birthDate: "2005-11-08",
      hobbies: ["Art", "Music", "Dancing"],
      memories: [7, 8, 9],
      isDeceased: false
    },
    {
      id: 4,
      name: "Grandma Rose",
      relationship: "Grandmother",
      bio: "The matriarch of the family, full of wisdom and love. Her stories connect us to our past.",
      photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=face",
      audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      videoUrl: null,
      birthDate: "1940-12-03",
      hobbies: ["Knitting", "Storytelling", "Baking"],
      memories: [10, 11, 12],
      isDeceased: true
    }
  ],
  memories: [
    {
      id: 1,
      title: "Family Vacation 2023",
      description: "Amazing trip to the mountains where we hiked, fished, and made unforgettable memories.",
      type: "photo",
      mediaUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      date: "2023-07-15",
      memberIds: [1, 2, 3],
      tags: ["vacation", "mountains", "hiking"]
    },
    {
      id: 2,
      title: "Dad's Woodworking Project",
      description: "Michael built a beautiful dining table for the family. His craftsmanship is incredible.",
      type: "video",
      mediaUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      date: "2023-05-20",
      memberIds: [2],
      tags: ["woodworking", "craftsmanship", "family"]
    },
    {
      id: 3,
      title: "Mom's Garden",
      description: "Sarah's beautiful garden in full bloom. She spends hours tending to her flowers.",
      type: "photo",
      mediaUrl: "https://images.unsplash.com/photo-1416879595882-338989a2e8c0?w=600&h=400&fit=crop",
      date: "2023-06-10",
      memberIds: [1],
      tags: ["garden", "flowers", "nature"]
    },
    {
      id: 4,
      title: "Emma's Art Show",
      description: "Emma's first art exhibition at school. We're so proud of her creativity.",
      type: "photo",
      mediaUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
      date: "2023-04-15",
      memberIds: [3],
      tags: ["art", "school", "achievement"]
    },
    {
      id: 5,
      title: "Family Dinner Tradition",
      description: "Every Sunday we gather around the table for a traditional family dinner.",
      type: "photo",
      mediaUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      date: "2023-08-20",
      memberIds: [1, 2, 3],
      tags: ["dinner", "tradition", "family"]
    },
    {
      id: 6,
      title: "Fishing Trip",
      description: "Father and daughter bonding over their shared love of fishing.",
      type: "photo",
      mediaUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
      date: "2023-09-05",
      memberIds: [2, 3],
      tags: ["fishing", "bonding", "outdoors"]
    }
  ],
  familyTree: {
    nodes: [
      { id: 1, name: "Sarah Johnson", relationship: "Mother", generation: 2 },
      { id: 2, name: "Michael Johnson", relationship: "Father", generation: 2 },
      { id: 3, name: "Emma Johnson", relationship: "Daughter", generation: 3 },
      { id: 4, name: "Grandma Rose", relationship: "Grandmother", generation: 1 }
    ],
    links: [
      { source: 4, target: 1 },
      { source: 1, target: 3 },
      { source: 2, target: 3 }
    ]
  },
  loading: false,
  error: null
};

const familyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };
    case 'UPDATE_MEMBER':
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id ? action.payload : member
        )
      };
    case 'ADD_MEMORY':
      return { ...state, memories: [...state.memories, action.payload] };
    case 'UPDATE_MEMORY':
      return {
        ...state,
        memories: state.memories.map(memory =>
          memory.id === action.payload.id ? action.payload : memory
        )
      };
    case 'SET_MEMBERS':
      return { ...state, members: action.payload };
    case 'SET_MEMORIES':
      return { ...state, memories: action.payload };
    default:
      return state;
  }
};

export const FamilyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(familyReducer, initialState);

  // Simulate API calls
  const addMember = async (memberData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newMember = {
        ...memberData,
        id: Math.max(...state.members.map(m => m.id)) + 1,
        memories: []
      };
      dispatch({ type: 'ADD_MEMBER', payload: newMember });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addMemory = async (memoryData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newMemory = {
        ...memoryData,
        id: Math.max(...state.memories.map(m => m.id)) + 1
      };
      dispatch({ type: 'ADD_MEMORY', payload: newMemory });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getMemberById = (id) => {
    return state.members.find(member => member.id === parseInt(id));
  };

  const getMemoriesByMemberId = (memberId) => {
    return state.memories.filter(memory => 
      memory.memberIds.includes(parseInt(memberId))
    );
  };

  const searchMembers = (query) => {
    return state.members.filter(member =>
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.relationship.toLowerCase().includes(query.toLowerCase())
    );
  };

  const searchMemories = (query) => {
    return state.memories.filter(memory =>
      memory.title.toLowerCase().includes(query.toLowerCase()) ||
      memory.description.toLowerCase().includes(query.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const value = {
    ...state,
    addMember,
    addMemory,
    getMemberById,
    getMemoriesByMemberId,
    searchMembers,
    searchMemories,
    dispatch
  };

  return (
    <FamilyContext.Provider value={value}>
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (!context) {
    throw new Error('useFamily must be used within a FamilyProvider');
  }
  return context;
}; 