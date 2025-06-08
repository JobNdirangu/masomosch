import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 

    // Initialize state from localStorage
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [user, setUser] = useState(() =>JSON.parse(localStorage.getItem('user') || 'null'))


    // logout function//using a callback
    const logout = useCallback(() => {
        localStorage.clear();
        setToken('');
        setUser(null);
        navigate('/login'); 
    }, [navigate]);


    // check if the token is expired
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (isExpired) {
                    // console.log("Token expired, logging out.");
                    logout();
                }
            } catch (error) {
                // console.log("Invalid token format.");
                logout();
            }
        }
    }, [token, logout]);

  return (
    // the setToken and SetUser are needed for login to alert the change of state
    <AuthContext.Provider value={{ token, user, logout,setToken,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext,AuthProvider}
