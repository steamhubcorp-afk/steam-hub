import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Initialize machineId on mount
    useEffect(() => {
        let machineId = localStorage.getItem('steamhub_machine_id');
        if (!machineId) {
            machineId = crypto.randomUUID();
            localStorage.setItem('steamhub_machine_id', machineId);
        }
        // Check for existing user session if needed (optional for verified check)
    }, []);

    const openModal = () => {
        setError(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setError(null);
        setIsModalOpen(false);
    };

    const signup = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('https://7705bdd3e13c.ngrok-free.app/api/signup', { name, email, password });
            if (response.data.success) {
                // Return success so modal can show message
                return { success: true, message: response.data.message };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
            return { success: false, message: err.response?.data?.message || 'Signup failed' };
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const machineId = localStorage.getItem('steamhub_machine_id');
            const response = await axios.post('https://7705bdd3e13c.ngrok-free.app/api/verify', { email, password, machineId });

            if (response.data.success) {
                setUser({ email, ...response.data.config }); // Store user info
                closeModal();
                return { success: true };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            return { success: false, message: err.response?.data?.message || 'Login failed' };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        // Optional: Call release machine API if needed
        // localStorage.removeItem('steamhub_user'); 
    };

    const value = {
        isModalOpen,
        openModal,
        closeModal,
        user,
        loading,
        error,
        signup,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
