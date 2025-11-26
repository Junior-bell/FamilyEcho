import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Export the raw context for any direct imports
export const FamilyContext = createContext();

// API base URL
const API_BASE_URL = 'http://localhost:8081/api';

// Initial state with empty data (will be populated from backend)
const initialState = {
  members: [],
  memories: [],
  relationships: [],
  familyTree: {
    nodes: [],
    links: []
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
        members: state.members.map((member) =>
          member.id === action.payload.id ? action.payload : member
        )
      };
    case 'ADD_MEMORY':
      return { ...state, memories: [...state.memories, action.payload] };
    case 'UPDATE_MEMORY':
      return {
        ...state,
        memories: state.memories.map((memory) =>
          memory.id === action.payload.id ? action.payload : memory
        )
      };
    case 'SET_MEMBERS':
      return { ...state, members: action.payload };
    case 'SET_MEMORIES':
      return { ...state, memories: action.payload };
    case 'DELETE_MEMBER':
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload)
      };
    case 'DELETE_MEMORY':
      return {
        ...state,
        memories: state.memories.filter((memory) => memory.id !== action.payload)
      };
    case 'SET_RELATIONSHIPS':
      return { ...state, relationships: action.payload };
    case 'ADD_RELATIONSHIP':
      return { ...state, relationships: [...state.relationships, action.payload] };
    case 'UPDATE_RELATIONSHIP':
      return {
        ...state,
        relationships: state.relationships.map((rel) =>
          rel.id === action.payload.id ? action.payload : rel
        )
      };
    case 'DELETE_RELATIONSHIP':
      return {
        ...state,
        relationships: state.relationships.filter((rel) => rel.id !== action.payload)
      };
    default:
      return state;
  }
};

export const FamilyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(familyReducer, initialState);

  // Fetch members from backend on mount
  useEffect(() => {
    const fetchMembers = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch(`${API_BASE_URL}/members`);
        if (!response.ok) throw new Error('Failed to fetch members');
        const data = await response.json();
        dispatch({ type: 'SET_MEMBERS', payload: data });
      } catch (error) {
        console.error('Error fetching members:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    const fetchMemories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/memories`);
        if (!response.ok) throw new Error('Failed to fetch memories');
        const data = await response.json();
        dispatch({ type: 'SET_MEMORIES', payload: data });
      } catch (error) {
        console.error('Error fetching memories:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    const fetchRelationships = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/relationships`);
        if (!response.ok) throw new Error('Failed to fetch relationships');
        const data = await response.json();
        dispatch({ type: 'SET_RELATIONSHIPS', payload: data });
      } catch (error) {
        console.error('Error fetching relationships:', error);
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };

    fetchMembers();
    fetchMemories();
    fetchRelationships();
  }, []);

  // API calls
  const addMember = async (memberData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) throw new Error('Failed to add member');
      const newMember = await response.json();
      dispatch({ type: 'ADD_MEMBER', payload: newMember });
    } catch (error) {
      console.error('Error adding member:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateMember = async (id, memberData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });
      if (!response.ok) throw new Error('Failed to update member');
      const updatedMember = await response.json();
      dispatch({ type: 'UPDATE_MEMBER', payload: updatedMember });
    } catch (error) {
      console.error('Error updating member:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteMember = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete member');
      dispatch({ type: 'DELETE_MEMBER', payload: id });
    } catch (error) {
      console.error('Error deleting member:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addMemory = async (memoryData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memoryData),
      });
      if (!response.ok) throw new Error('Failed to add memory');
      const newMemory = await response.json();
      dispatch({ type: 'ADD_MEMORY', payload: newMemory });
    } catch (error) {
      console.error('Error adding memory:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateMemory = async (id, memoryData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/memories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memoryData),
      });
      if (!response.ok) throw new Error('Failed to update memory');
      const updatedMemory = await response.json();
      dispatch({ type: 'UPDATE_MEMORY', payload: updatedMemory });
    } catch (error) {
      console.error('Error updating memory:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteMemory = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/memories/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete memory');
      dispatch({ type: 'DELETE_MEMORY', payload: id });
    } catch (error) {
      console.error('Error deleting memory:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Relationship methods
  const addRelationship = async (relationshipData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/relationships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(relationshipData),
      });
      if (!response.ok) throw new Error('Failed to add relationship');
      const newRelationship = await response.json();
      dispatch({ type: 'ADD_RELATIONSHIP', payload: newRelationship });
    } catch (error) {
      console.error('Error adding relationship:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateRelationship = async (id, relationshipData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/relationships/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(relationshipData),
      });
      if (!response.ok) throw new Error('Failed to update relationship');
      const updatedRelationship = await response.json();
      dispatch({ type: 'UPDATE_RELATIONSHIP', payload: updatedRelationship });
    } catch (error) {
      console.error('Error updating relationship:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteRelationship = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/relationships/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete relationship');
      dispatch({ type: 'DELETE_RELATIONSHIP', payload: id });
    } catch (error) {
      console.error('Error deleting relationship:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getMemberById = (id) => state.members.find((member) => member.id === parseInt(id));
  const getMemoriesByMemberId = (memberId) =>
    state.memories.filter((memory) => memory.memberIds && memory.memberIds.includes(parseInt(memberId)));

  const searchMembers = (query) =>
    state.members.filter(
      (member) =>
        member.name.toLowerCase().includes(query.toLowerCase()) ||
        member.relationship.toLowerCase().includes(query.toLowerCase())
    );

  const searchMemories = (query) =>
    state.memories.filter(
      (memory) =>
        memory.title.toLowerCase().includes(query.toLowerCase()) ||
        memory.description.toLowerCase().includes(query.toLowerCase()) ||
        (memory.tags && memory.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())))
    );

  const getRelationshipsByMember = (memberId) =>
    state.relationships.filter(
      (rel) => rel.member1Id === memberId || rel.member2Id === memberId
    );

  const value = {
    ...state,
    addMember,
    updateMember,
    deleteMember,
    addMemory,
    updateMemory,
    deleteMemory,
    addRelationship,
    updateRelationship,
    deleteRelationship,
    getMemberById,
    getMemoriesByMemberId,
    getRelationshipsByMember,
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