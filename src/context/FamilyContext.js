import React, { createContext, useContext, useReducer } from 'react';

const FamilyContext = createContext();

// Sample data structure
const initialState = {
  members: [],
  memories: [],
  familyTree: {
    nodes: [
      { id: 1, name: "दिगंबरराव राजाराम पवार (Digambarrao Rajaram Pawar)", relationship: "Grandfather" },
      { id: 2, name: "कमलबाई दिगंबरराव पवार (Kamalabai Digambarrao Pawar)", relationship: "Grandmother" },
      // First child directly after grandparents
      { id: 3, name: "Meena Ashokrao Waghchaure", relationship: "Daughter" },
      { id: 4, name: "Ashokrao Wamanrao Waghchaure", relationship: "Son-in-law" },
      { id: 5, name: "Mai (Sandhya Dhyaneshwar Borde)", relationship: "Daughter" },
      { id: 6, name: "Dhyaneshwarrao Vasantrao Borde", relationship: "Son-in-law" },
      { id: 7, name: "Vandana Vijayrao Ingale", relationship: "Daughter" },
      { id: 8, name: "Vijay Ganpatrao Ingale", relationship: "Son-in-law" },
      { id: 9, name: "Manda Ashokrao Wagh", relationship: "Daughter" },
      { id: 10, name: "Ashokrao Fakirrao Wagh", relationship: "Son-in-law" },
      { id: 11, name: "Yogesh Digambarrao Pawar", relationship: "Son" },
      { id: 12, name: "Gayatri Yogeshrao Wagh", relationship: "Daughter-in-law" }
    ],
    links: [
      // Grandparents (spouse)
      { source: 1, target: 2 },
      // Meena as first child of grandparents
      { source: 1, target: 3 }, { source: 2, target: 3 },
      // Other children of grandparents
      { source: 1, target: 5 }, { source: 2, target: 5 },
      { source: 1, target: 7 }, { source: 2, target: 7 },
      { source: 1, target: 9 }, { source: 2, target: 9 },
      { source: 1, target: 11 }, { source: 2, target: 11 },
      // Spouses of children
      { source: 3, target: 4 },
      { source: 5, target: 6 },
      { source: 7, target: 8 },
      { source: 9, target: 10 },
      { source: 11, target: 12 }
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