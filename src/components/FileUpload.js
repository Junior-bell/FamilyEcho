import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({
    onFileSelect,
    acceptedTypes = "image/*",
    maxSizeMB = 10,
    label = "Upload File",
    uploadType = "photo" // photo, audio, or media
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = async (file) => {
        setError(null);

        // Validate file size
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onFileSelect(data.fileUrl, file);
            } catch (err) {
                setError('Upload failed. Please try again.');
                console.error('Upload error:', err);
            } finally {
                setUploading(false);
            }
        };

        const clearFile = () => {
            setPreview(null);
            setError(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            onFileSelect(null, null);
        };

        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-accent-gray mb-2">
                    {label}
                </label>

                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-all duration-200
          ${isDragging ? 'border-primary-blue bg-blue-50' : 'border-gray-300 hover:border-primary-blue'}
          ${error ? 'border-red-500' : ''}
        `}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedTypes}
                        onChange={handleFileInput}
                        className="hidden"
                    />

                    <AnimatePresence mode="wait">
                        {uploading ? (
                            <motion.div
                                key="uploading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <Loader className="h-12 w-12 text-primary-blue animate-spin mb-2" />
                                <p className="text-sm text-accent-gray">Uploading...</p>
                            </motion.div>
                        ) : preview ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative"
                            >
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-48 mx-auto rounded-lg"
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearFile();
                                    }}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="upload"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                                <p className="text-sm text-accent-gray mb-1">
                                    Drag and drop or click to upload
                                </p>
                                <p className="text-xs text-gray-500">
                                    Max size: {maxSizeMB}MB
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-2"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        );
    };

    export default FileUpload;
