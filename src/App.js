import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FamilyProvider } from './context/FamilyContext';

// Replace static imports for pages with lazy imports
const HomePage = lazy(() => import('./pages/HomePage'));
const ProfilesPage = lazy(() => import('./pages/ProfilesPage'));
const ProfileDetailPage = lazy(() => import('./pages/ProfileDetailPage'));
const MemoriesPage = lazy(() => import('./pages/MemoriesPage'));
const FamilyTreePage = lazy(() => import('./pages/FamilyTreePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  return (
    <FamilyProvider>
      <div className="min-h-screen bg-primary-cream flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="flex justify-center items-center h-full">Loading...</div>}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HomePage />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/profiles" 
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProfilesPage />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/profiles/:id" 
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProfileDetailPage />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/memories" 
                  element={
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MemoriesPage />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/family-tree" 
                  element={
                    <motion.div
                      initial={{ opacity: 0, rotateY: -15 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FamilyTreePage />
                    </motion.div>
                  } 
                />
                <Route 
                  path="/contact" 
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ContactPage />
                    </motion.div>
                  } 
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        <Footer />
      </div>
    </FamilyProvider>
  );
}

export default App; 