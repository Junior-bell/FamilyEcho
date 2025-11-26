import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Heart, Calendar, Music, Image as ImageIcon, Plus } from 'lucide-react';
import { useFamily } from '../context/FamilyContext';

const AddMemberForm = ({ isOpen, onClose, initialData = null }) => {
    const { addMember, updateMember } = useFamily();
    const [formData, setFormData] = useState({
        name: '',
        relationship: '',
        bio: '',
        photo: 'https://via.placeholder.com/300x300?text=Profile+Photo',
        audioUrl: '',
        isDeceased: false,
        birthDate: '',
        deathDate: '',
        hobbies: []
    });
    const [hobbyInput, setHobbyInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                relationship: initialData.relationship || '',
                bio: initialData.bio || '',
                photo: initialData.photo || 'https://via.placeholder.com/300x300?text=Profile+Photo',
                audioUrl: initialData.audioUrl || '',
                isDeceased: initialData.isDeceased || false,
                birthDate: initialData.birthDate || '',
                deathDate: initialData.deathDate || '',
                hobbies: initialData.hobbies || []
            });
        } else {
            setFormData({
                name: '',
                relationship: '',
                bio: '',
                photo: 'https://via.placeholder.com/300x300?text=Profile+Photo',
                audioUrl: '',
                isDeceased: false,
                birthDate: '',
                deathDate: '',
                hobbies: []
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddHobby = () => {
        if (hobbyInput.trim() && !formData.hobbies.includes(hobbyInput.trim())) {
            setFormData(prev => ({
                ...prev,
                hobbies: [...prev.hobbies, hobbyInput.trim()]
            }));
            setHobbyInput('');
        }
    };

    const handleRemoveHobby = (hobbyToRemove) => {
        setFormData(prev => ({
            ...prev,
            hobbies: prev.hobbies.filter(hobby => hobby !== hobbyToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Validation
        if (!formData.name.trim()) {
            setError('Name is required');
            setIsSubmitting(false);
            return;
        }
        if (!formData.relationship.trim()) {
            setError('Relationship is required');
            setIsSubmitting(false);
            return;
        }

        try {
            if (initialData) {
                await updateMember(initialData.id, formData);
            } else {
                await addMember(formData);
            }
            setSuccess(true);

            // Reset form after 1.5 seconds and close
            setTimeout(() => {
                if (!initialData) {
                    setFormData({
                        name: '',
                        relationship: '',
                        bio: '',
                        photo: 'https://via.placeholder.com/300x300?text=Profile+Photo',
                        audioUrl: '',
                        isDeceased: false,
                        birthDate: '',
                        deathDate: '',
                        hobbies: []
                    });
                }
                setSuccess(false);
                onClose();
            }, 1500);
        } catch (err) {
            setError(initialData ? 'Failed to update member. Please try again.' : 'Failed to add member. Please try again.');
            console.error('Error saving member:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-card shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <User className="h-6 w-6 text-primary-blue" />
                            <h2 className="text-2xl font-lora font-bold text-accent-gray">
                                {initialData ? 'Edit Family Member' : 'Add New Family Member'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-accent-gray hover:text-primary-blue transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Success Message */}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
                            >
                                {initialData ? '✓ Family member updated successfully!' : '✓ Family member added successfully!'}
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Name */}
                        <div>
                            <label className="block text-accent-gray font-medium mb-2">
                                Name <span className="text-accent-red">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="Enter full name"
                                required
                            />
                        </div>

                        {/* Relationship */}
                        <div>
                            <label className="block text-accent-gray font-medium mb-2">
                                Relationship <span className="text-accent-red">*</span>
                            </label>
                            <input
                                type="text"
                                name="relationship"
                                value={formData.relationship}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="e.g., Father, Mother, Grandfather"
                                required
                            />
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-accent-gray font-medium mb-2">
                                Biography
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent resize-none"
                                placeholder="Share their story, personality, and what makes them special..."
                            />
                        </div>

                        {/* Photo URL */}
                        <div>
                            <label className="block text-accent-gray font-medium mb-2 flex items-center space-x-2">
                                <ImageIcon className="h-4 w-4" />
                                <span>Photo URL</span>
                            </label>
                            <input
                                type="url"
                                name="photo"
                                value={formData.photo}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="https://example.com/photo.jpg"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Enter a URL to a profile photo or leave the default placeholder
                            </p>
                        </div>

                        {/* Audio URL */}
                        <div>
                            <label className="block text-accent-gray font-medium mb-2 flex items-center space-x-2">
                                <Music className="h-4 w-4" />
                                <span>Audio Recording URL</span>
                            </label>
                            <input
                                type="url"
                                name="audioUrl"
                                value={formData.audioUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                placeholder="https://example.com/audio.mp3"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Optional: Add a voice recording to bring their profile to life
                            </p>
                        </div>

                        {/* Birth Date */}
                        <div>
                            <label className="block text-accent-gray font-medium mb-2 flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>Birth Date</span>
                            </label>
                            <input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                            />
                        </div>

                        {/* Is Deceased Checkbox */}
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="isDeceased"
                                checked={formData.isDeceased}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-primary-blue focus:ring-primary-blue h-5 w-5"
                            />
                            <label className="text-accent-gray font-medium flex items-center space-x-2">
                                <Heart className="h-4 w-4 text-accent-red" />
                                <span>Memorial Profile (Deceased)</span>
                            </label>
                        </div>

                        {/* Death Date (only show if deceased) */}
                        {formData.isDeceased && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <label className="block text-accent-gray font-medium mb-2 flex items-center space-x-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Death Date</span>
                                </label>
                                <input
                                    type="date"
                                    name="deathDate"
                                    value={formData.deathDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                />
                            </motion.div>
                        )}

                        {/* Hobbies */}
                        <div>
                            <label className="block text-accent-gray font-medium mb-2">
                                Hobbies & Interests
                            </label>
                            <div className="flex space-x-2 mb-3">
                                <input
                                    type="text"
                                    value={hobbyInput}
                                    onChange={(e) => setHobbyInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHobby())}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                                    placeholder="Add a hobby or interest"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddHobby}
                                    className="btn-primary flex items-center space-x-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Add</span>
                                </button>
                            </div>

                            {/* Hobbies List */}
                            {formData.hobbies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.hobbies.map((hobby, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-primary-blue text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                                        >
                                            <span>{hobby}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveHobby(hobby)}
                                                className="hover:text-accent-red transition-colors"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </motion.span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Member' : 'Add Family Member')}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AddMemberForm;
